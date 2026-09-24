import { createInsertSchema } from "drizzle-zod";
import { jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const siteContentTable = pgTable("site_content", {
  id: text("id").primaryKey(),
  content: jsonb("content").$type<Record<string, unknown>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertSiteContentSchema = createInsertSchema(siteContentTable).omit({
  updatedAt: true,
});

export type InsertSiteContent = typeof siteContentTable.$inferInsert;
export type SiteContent = typeof siteContentTable.$inferSelect;