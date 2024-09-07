"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../lucia";
import { redirect } from "next/navigation";
import db from "..";
import { userTable } from "../schemas";
import { eq } from "drizzle-orm";
import { LoginFields } from "@/app/auth/login/page";

type Err = {
  message: string;
};

// TODO: rename things correctly or in the same way for all
export async function login(data: LoginFields): Promise<Err | never> {
  const username = data.user_name;
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      message: "Invalid username",
    };
  }
  const password = data.password;
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      message: "Invalid password",
    };
  }

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userName, username.toLowerCase()));

  const user = existingUser[0];

  if (!user) {
    return {
      message: "Incorrect username or password",
    };
  }

  const validPassword = await verify(user.hashedPassword, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return {
      message: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/dashboard");
}
