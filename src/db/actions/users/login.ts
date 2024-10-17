"use server";

import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../../lucia";
import db from "../..";
import { userTable } from "../../schemas";
import { eq } from "drizzle-orm";
import { LoginFields } from "@/app/auth/login/page";

export interface Result {
  ok: boolean;
  message: string;
  code?: string;
}

export async function login(data: LoginFields): Promise<Result> {
  const defaultReturn = {
    ok: false,
    message: "Invalid username or password",
  };

  const username = data.user_name;
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return {
      ...defaultReturn,
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
      ...defaultReturn,
      message: "Invalid password",
    };
  }

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userName, username.toLowerCase()));

  const user = existingUser[0];

  if (!user) return defaultReturn;

  const validPassword = await verify(user.hashedPassword, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  if (!validPassword) return defaultReturn;

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return {
    ok: true,
    message: "Loged successfully",
  };
}
