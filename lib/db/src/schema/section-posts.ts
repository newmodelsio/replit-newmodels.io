import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import {
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
} from "drizzle-orm/pg-core";
import { postsTable } from "./posts";
import { sectionsTable } from "./sections";

export const sectionPostsTable = pgTable(
  "section_posts",
  {
    sectionId: integer("section_id")
      .notNull()
      .references(() => sectionsTable.id, { onDelete: "cascade" }),
    postId: integer("post_id")
      .notNull()
      .references(() => postsTable.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    sourceData: jsonb("source_data")
      .$type<Record<string, unknown>>()
      .notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.sectionId, table.position] }),
    index("section_posts_post_id_idx").on(table.postId),
  ],
);

export const insertSectionPostSchema = createInsertSchema(sectionPostsTable);

export type InsertSectionPost = z.infer<typeof insertSectionPostSchema>;
export type SectionPost = typeof sectionPostsTable.$inferSelect;