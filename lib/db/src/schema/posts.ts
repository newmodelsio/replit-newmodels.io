import { createInsertSchema } from "drizzle-zod";
import { sql } from "drizzle-orm";
import {
  date,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const postsTable = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    sourceKey: text("source_key").notNull(),
    sourceId: text("source_id"),
    title: text("title").notNull().default(""),
    text: text("text").notNull().default(""),
    publishedLabel: text("published_label"),
    publishedOn: date("published_on", { mode: "string" }),
    link: text("link").notNull().default(""),
    url: text("url").notNull().default(""),
    type: text("type").notNull().default(""),
    slug: text("slug").notNull().default(""),
    tags: jsonb("tags").$type<unknown>().notNull().default(sql`'[]'::jsonb`),
    archivePosition: integer("archive_position"),
    sourceData: jsonb("source_data")
      .$type<Record<string, unknown>>()
      .notNull(),
  },
  (table) => [
    uniqueIndex("posts_source_key_uidx").on(table.sourceKey),
    uniqueIndex("posts_archive_position_uidx")
      .on(table.archivePosition)
      .where(sql`${table.archivePosition} IS NOT NULL`),
    index("posts_published_on_idx").on(table.publishedOn),
    index("posts_source_id_idx").on(table.sourceId),
  ],
);

export const insertPostSchema = createInsertSchema(postsTable).omit({
  id: true,
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof postsTable.$inferSelect;