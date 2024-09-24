"use server";

import { eq } from "drizzle-orm";
import db from "..";
import { userTable } from "../schemas";

export async function getUserByUsername(username: string) {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userName, username));

  return users[0];
}
