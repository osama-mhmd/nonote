import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const habitsTable = pgTable("habits", {
  id: text("id").notNull(),
  user_id: text("user_id").notNull(),
  name: text("name").notNull(),
  quote: text("quote").notNull(),
  start_date: timestamp("created_at").notNull(),
  // type: text("type").notNull(), // "times" | "duration"
  frequency: text("frequency").notNull(), // "daily" | "weakly" | "monthly"
});

export const habitsRecordsTable = pgTable("habits_records", {
  habit_id: text("habit_id").notNull(),
  date: timestamp("date").notNull(),
});
