import { Router, type IRouter } from "express";
import { asc, eq, isNotNull } from "drizzle-orm";
import {
  db,
  postsTable,
  sectionPostsTable,
  sectionsTable,
  siteContentTable,
  siteSettingsTable,
} from "@workspace/db";
import { GetNewModelsContentResponse } from "@workspace/api-zod";

const router: IRouter = Router();
const columnKeys = ["columnA", "columnB", "columnC"] as const;
const settingsKeys = [
  "new-models:featured",
  "new-models:about",
  "new-models:links",
  "new-models:footer",
  "new-models:search-nav",
] as const;

router.get("/new-models/content", async (req, res): Promise<void> => {
  try {
    const [settingsRows, sectionRows, sectionPostRows, archiveRows] =
      await Promise.all([
        db
          .select({
            key: siteSettingsTable.key,
            value: siteSettingsTable.value,
          })
          .from(siteSettingsTable),
        db
          .select()
          .from(sectionsTable)
          .orderBy(asc(sectionsTable.columnKey), asc(sectionsTable.position)),
        db
          .select({
            sectionId: sectionPostsTable.sectionId,
            position: sectionPostsTable.position,
            sourceData: sectionPostsTable.sourceData,
          })
          .from(sectionPostsTable)
          .orderBy(
            asc(sectionPostsTable.sectionId),
            asc(sectionPostsTable.position),
          ),
        db
          .select({ sourceData: postsTable.sourceData })
          .from(postsTable)
          .where(isNotNull(postsTable.archivePosition))
          .orderBy(asc(postsTable.archivePosition)),
      ]);

    const settings = new Map(settingsRows.map(({ key, value }) => [key, value]));
    const hasAllSettings = settingsKeys.every((key) => settings.has(key));
    if (!hasAllSettings) {
      const [legacyRecord] = await db
        .select({ content: siteContentTable.content })
        .from(siteContentTable)
        .where(eq(siteContentTable.id, "new-models-home"))
        .limit(1);

      if (legacyRecord) {
        const legacyContent =
          GetNewModelsContentResponse.safeParse(legacyRecord.content);
        if (legacyContent.success) {
          req.log.debug(
            "Serving the legacy New Models snapshot until normalized data is initialized",
          );
          res.json(legacyContent.data);
          return;
        }
      }

      res
        .status(503)
        .json({ error: "New Models content has not been initialized." });
      return;
    }

    const postsBySection = new Map<number, Record<string, unknown>[]>();
    for (const sectionPost of sectionPostRows) {
      const current = postsBySection.get(sectionPost.sectionId) ?? [];
      current.push(sectionPost.sourceData);
      postsBySection.set(sectionPost.sectionId, current);
    }

    const sectionsByColumn = Object.fromEntries(
      columnKeys.map((columnKey) => [
        columnKey,
        sectionRows
          .filter((section) => section.columnKey === columnKey)
          .map((section) => {
            const data = { ...section.sourceData };
            if (section.hasPosts) {
              data.posts = postsBySection.get(section.id) ?? [];
            }
            return data;
          }),
      ]),
    );

    const content = {
      featured: settings.get("new-models:featured"),
      about: settings.get("new-models:about"),
      links: settings.get("new-models:links"),
      footer: settings.get("new-models:footer"),
      ...sectionsByColumn,
      search: {
        nav: settings.get("new-models:search-nav"),
        archive: archiveRows.map((row) => row.sourceData),
      },
    };

    const parsed = GetNewModelsContentResponse.safeParse(content);
    if (!parsed.success) {
      req.log.error(
        { error: parsed.error.message },
        "Normalized New Models content does not match the API contract",
      );
      res.status(503).json({ error: "New Models content is unavailable." });
      return;
    }

    res.json(parsed.data);
  } catch (error) {
    req.log.error({ error }, "Failed to read New Models content");
    res.status(503).json({ error: "New Models content is unavailable." });
  }
});

export default router;