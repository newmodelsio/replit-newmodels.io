import { createInsertSchema } from "drizzle-zod";
import { boolean, integer, jsonb, pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const sectionsTable = pgTable(
  "sections",
  {
    id: serial("id").primaryKey(),
    sourceKey: text("source_key").notNull(),
    sourceId: text("source_id"),
    columnKey: text("column_key").notNull(),
    position: integer("position").notNull(),
    sourceData: jsonb("source_data")
      .$type<Record<string, unknown>>()
      .notNull(),
    hasPosts: boolean("has_posts").notNull().default(true),
  },
  (table) => [
    uniqueIndex("sections_source_key_uidx").on(table.sourceKey),
    uniqueIndex("sections_column_position_uidx").on(
      table.columnKey,
      table.position,
    ),
  ],
);

export const insertSectionSchema = createInsertSchema(sectionsTable).omit({
  id: true,
});

export type InsertSection = z.infer<typeof insertSectionSchema>;
export type Section = typeof sectionsTable.$inferSelect;