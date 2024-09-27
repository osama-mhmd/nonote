import { describe, expect, it } from "vitest";
import db from "@/db";
import { userTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

describe("Testing users table", () => {
  it("should return a list of users", async () => {
    const users = await db.select().from(userTable);
    expect(users);
  });
  it("should insert a user", async () => {
    const process = await db.insert(userTable).values({
      email: "test@gmail.com",
      fullName: "Test",
      id: "test-id",
      userName: "test-id",
      emailVerified: "false",
      hashedPassword: "this is hashed",
    });
    expect(process);
  });
  it("should print the user", async () => {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, "test-id"));
    expect(user);
  });
  it("should delete a user", async () => {
    const process = await db
      .delete(userTable)
      .where(eq(userTable.id, "test-id"));
    expect(process);
  });
});
