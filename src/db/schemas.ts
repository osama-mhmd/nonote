import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
  owner: text("owner")
    .references(() => userTable.id)
    .notNull(),
  name: text("name").notNull(),
  visibility: text("visibility").notNull(), // "public"  | "private"
  // [domain]/workspace/[workspace_id] => owner/permissions->edit
  // [domain]/workspace/public/[workspace_id] => visibility, then permissions->comment,view
  permissions: json("permissions").default({
    edit: text("editors")
      .references(() => userTable.id)
      .array(),
    comment: text("commentors")
      .references(() => userTable.id)
      .array(),
    view: text("viewers")
      .references(() => userTable.id)
      .array(), // if visibility is public, then view by default is everyone
  }),
});
