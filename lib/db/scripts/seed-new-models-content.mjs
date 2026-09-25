import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const { Pool } = pg;
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set before seeding New Models content.");
}

const [pageJson, searchJson] = await Promise.all([
  readFile(
    path.join(repoRoot, "artifacts/new-models/src/data/content.json"),
    "utf8",
  ),
  readFile(path.join(repoRoot, "artifacts/new-models/src/data/search.json"), "utf8"),
]);

const content = {
  ...JSON.parse(pageJson),
  search: JSON.parse(searchJson),
};
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const columnKeys = ["columnA", "columnB", "columnC"];
const settingEntries = [
  ["new-models:featured", content.featured],
  ["new-models:about", content.about],
  ["new-models:links", content.links],
  ["new-models:footer", content.footer],
  ["new-models:search-nav", content.search.nav],
];

const sectionEntries = columnKeys.flatMap((columnKey) => {
  const column = content[columnKey];
  if (!Array.isArray(column)) {
    throw new Error(`Expected ${columnKey} to be an array.`);
  }

  return column.map((section, position) => {
    if (!section || typeof section !== "object" || Array.isArray(section)) {
      throw new Error(`Expected ${columnKey}[${position}] to be an object.`);
    }
    if (section.posts !== undefined && !Array.isArray(section.posts)) {
      throw new Error(`Expected ${columnKey}[${position}].posts to be an array.`);
    }

    const { posts = [], ...sourceData } = section;
    return {
      columnKey,
      position,
      sourceId: nonEmptyString(section.id),
      sourceData,
      hasPosts: Object.hasOwn(section, "posts"),
      posts,
    };
  });
});

const archiveEntries = content.search.archive;
if (!Array.isArray(archiveEntries)) {
  throw new Error("Expected search.archive to be an array.");
}

const archiveIdCounts = countIds(archiveEntries);
const sectionIdCounts = countIds(sectionEntries.map((section) => section.sourceData));

function nonEmptyString(value) {
  return typeof value === "string" && value.trim() ? value : null;
}

function countIds(records) {
  const counts = new Map();
  for (const record of records) {
    const id = nonEmptyString(record?.id);
    if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return counts;
}

function parseFullDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString().slice(0, 10) === value ? value : null;
}

function postSourceKey(record, fallbackKey) {
  const sourceId = nonEmptyString(record?.id);
  if (!sourceId) return fallbackKey;

  // Repeated archive IDs are ambiguous. Preserve each occurrence rather than
  // merging distinct archive entries; otherwise IDs can connect placements.
  if ((archiveIdCounts.get(sourceId) ?? 0) > 1) return fallbackKey;

  return `new-models:post:legacy-id:${sourceId}`;
}

function postValues(record, sourceKey, archivePosition = null) {
  const publishedLabel =
    typeof record.published === "string" ? record.published : null;

  return [
    sourceKey,
    nonEmptyString(record.id),
    typeof record.title === "string" ? record.title : "",
    typeof record.text === "string" ? record.text : "",
    publishedLabel,
    parseFullDate(publishedLabel),
    typeof record.link === "string" ? record.link : "",
    typeof record.url === "string" ? record.url : "",
    typeof record.type === "string" ? record.type : "",
    typeof record.slug === "string" ? record.slug : "",
    JSON.stringify(record.tags ?? []),
    archivePosition,
    JSON.stringify(record),
  ];
}

const postEntries = [];
for (const section of sectionEntries) {
  const sectionId = nonEmptyString(section.sourceData.id);
  const sectionSourceKey =
    sectionId && sectionIdCounts.get(sectionId) === 1
      ? `new-models:section:legacy-id:${sectionId}`
      : `new-models:section:occurrence:${section.columnKey}:${section.position}`;
  section.sourceKey = sectionSourceKey;

  for (let position = 0; position < section.posts.length; position += 1) {
    const record = section.posts[position];
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      throw new Error(
        `Expected ${section.columnKey}[${section.position}].posts[${position}] to be an object.`,
      );
    }

    postEntries.push({
      record,
      section,
      position,
      sourceKey: postSourceKey(
        record,
        `new-models:post:occurrence:section:${section.sourceKey}:${position}`,
      ),
    });
  }
}

for (let position = 0; position < archiveEntries.length; position += 1) {
  const record = archiveEntries[position];
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new Error(`Expected search.archive[${position}] to be an object.`);
  }

  postEntries.push({
    record,
    archivePosition: position,
    sourceKey: postSourceKey(
      record,
      `new-models:post:occurrence:archive:${position}`,
    ),
  });
}

try {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const [key, value] of settingEntries) {
      await client.query(
        `INSERT INTO site_settings (key, value)
         VALUES ($1, $2::jsonb)
         ON CONFLICT (key) DO UPDATE
         SET value = EXCLUDED.value, updated_at = NOW()`,
        [key, JSON.stringify(value)],
      );
    }

    // Keep the old read-only snapshot current as a safe fallback while the
    // production database transitions through Publish to the new tables.
    await client.query(
      `INSERT INTO site_content (id, content)
       VALUES ($1, $2::jsonb)
       ON CONFLICT (id) DO UPDATE
       SET content = EXCLUDED.content, updated_at = NOW()`,
      ["new-models-home", JSON.stringify(content)],
    );

    // Move existing section positions out of the live range before applying
    // the current order, avoiding unique-index conflicts during reordering.
    await client.query(
      `UPDATE sections
       SET position = position - 1000000
       WHERE source_key LIKE 'new-models:section:%'`,
    );

    const sourceSectionKeys = [];
    const sectionIds = new Map();
    for (const section of sectionEntries) {
      const { sourceKey, sourceId, columnKey, position, sourceData, hasPosts } =
        section;
      sourceSectionKeys.push(sourceKey);
      const result = await client.query(
        `INSERT INTO sections
           (source_key, source_id, column_key, position, source_data, has_posts)
         VALUES ($1, $2, $3, $4, $5::jsonb, $6)
         ON CONFLICT (source_key) DO UPDATE SET
           source_id = EXCLUDED.source_id,
           column_key = EXCLUDED.column_key,
           position = EXCLUDED.position,
           source_data = EXCLUDED.source_data,
           has_posts = EXCLUDED.has_posts
         RETURNING id`,
        [
          sourceKey,
          sourceId,
          columnKey,
          position,
          JSON.stringify(sourceData),
          hasPosts,
        ],
      );
      sectionIds.set(sourceKey, result.rows[0].id);
    }

    // Reconcile only New Models-owned section rows and their memberships.
    await client.query(
      `DELETE FROM section_posts
       USING sections
       WHERE section_posts.section_id = sections.id
         AND sections.source_key LIKE 'new-models:section:%'`,
    );
    if (sourceSectionKeys.length > 0) {
      await client.query(
        `DELETE FROM sections
         WHERE source_key LIKE 'new-models:section:%'
           AND NOT (source_key = ANY($1::text[]))`,
        [sourceSectionKeys],
      );
    }

    // Clear archive ordering before assigning current positions, so imports
    // can safely reorder entries under the unique archive-position index.
    await client.query(
      `UPDATE posts
       SET archive_position = NULL
       WHERE source_key LIKE 'new-models:post:%'
         AND archive_position IS NOT NULL`,
    );

    const postIds = new Map();
    for (const entry of postEntries) {
      const { record, sourceKey, archivePosition = null } = entry;
      const values = postValues(record, sourceKey, archivePosition);
      const result = await client.query(
        `INSERT INTO posts
           (source_key, source_id, title, text, published_label, published_on,
            link, url, type, slug, tags, archive_position, source_data)
         VALUES
           ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13::jsonb)
         ON CONFLICT (source_key) DO UPDATE SET
           source_id = EXCLUDED.source_id,
           title = EXCLUDED.title,
           text = EXCLUDED.text,
           published_label = EXCLUDED.published_label,
           published_on = EXCLUDED.published_on,
           link = EXCLUDED.link,
           url = EXCLUDED.url,
           type = EXCLUDED.type,
           slug = EXCLUDED.slug,
           tags = EXCLUDED.tags,
           archive_position = COALESCE(EXCLUDED.archive_position, posts.archive_position),
           source_data = EXCLUDED.source_data
         RETURNING id`,
        values,
      );
      postIds.set(sourceKey, result.rows[0].id);
    }

    for (const entry of postEntries) {
      if (!entry.section) continue;
      const sectionId = sectionIds.get(entry.section.sourceKey);
      const postId = postIds.get(entry.sourceKey);
      if (!sectionId || !postId) {
        throw new Error(
          `Unable to resolve section/post relationship for ${entry.sourceKey}.`,
        );
      }

      await client.query(
        `INSERT INTO section_posts (section_id, post_id, position, source_data)
         VALUES ($1, $2, $3, $4::jsonb)`,
        [
          sectionId,
          postId,
          entry.position,
          JSON.stringify(entry.record),
        ],
      );
    }

    await client.query("COMMIT");
    process.stdout.write(
      `New Models content seeded: ${sectionEntries.length} sections, ${postEntries.length} post records, ${archiveEntries.length} archive entries.\n`,
    );
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
} finally {
  await pool.end();
}