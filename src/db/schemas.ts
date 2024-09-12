import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  userName: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashed_password").notNull(),
  emailVerified: text("emailVerified").notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const workspaceTable = pgTable("workspaces", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  // "public-comment" | "public-edit" | "public-view" | "private"
  visibility: text("visibility").notNull(),
  viewed_by: text("viewed_by").array().notNull().default([]),
  created_at: timestamp("created_at").notNull().defaultNow(),
  last_updated_at: timestamp("last_updated_at").notNull().defaultNow(),
});

export const usersPermissions = pgTable("users_permissions", {
  user_id: text("user_id").notNull(),
  workpsace_id: text("workpsace_id").notNull(),
  permission: text("permission").notNull(),
});
