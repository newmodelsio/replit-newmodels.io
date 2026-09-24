import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, siteContentTable } from "@workspace/db";
import { GetNewModelsContentResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/new-models/content", async (req, res): Promise<void> => {
  try {
    const [record] = await db
      .select({ content: siteContentTable.content })
      .from(siteContentTable)
      .where(eq(siteContentTable.id, "new-models-home"))
      .limit(1);

    if (!record) {
      res.status(503).json({ error: "New Models content has not been initialized." });
      return;
    }

    const parsed = GetNewModelsContentResponse.safeParse(record.content);
    if (!parsed.success) {
      req.log.error(
        { error: parsed.error.message },
        "Stored New Models content does not match the API contract",
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