import { describe, expect, it } from "vitest";
import db from "@/db";
import { userTable } from "@/db/schemas";

describe("Testing users table", () => {
  it("should return a list of users", async () => {
    const users = await db.select().from(userTable);
    expect(users);
  });
});
