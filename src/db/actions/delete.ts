"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateRequest } from "../auth";
import { lucia } from "../lucia";
import { eq } from "drizzle-orm";
import db from "..";
import { userTable } from "../schemas";

export async function deleteUser() {
  const { user, session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  await db
    .delete(userTable)
    .where(eq(userTable.userName, user.username.toLowerCase()));

  redirect("/auth/login");
}
