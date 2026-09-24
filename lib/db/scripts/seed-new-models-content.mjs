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

try {
  await pool.query(
    `INSERT INTO site_content (id, content)
     VALUES ($1, $2::jsonb)
     ON CONFLICT (id) DO UPDATE
     SET content = EXCLUDED.content, updated_at = NOW()`,
    ["new-models-home", JSON.stringify(content)],
  );
  process.stdout.write("New Models page and archive content seeded.\n");
} finally {
  await pool.end();
}