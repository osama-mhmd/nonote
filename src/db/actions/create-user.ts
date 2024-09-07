"use server";

import db from "../.";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../lucia";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { userTable } from "../schemas";
import { RegisterFields } from "@/app/auth/register/schema";

type Err = {
  message: string;
};

export default async function signup(
  data: RegisterFields,
): Promise<Err | never> {
  const userName = data.user_name;

  if (
    typeof userName !== "string" ||
    userName.length < 3 ||
    userName.length > 31 ||
    !/^[a-z0-9_-]+$/.test(userName)
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

  const passwordHash = await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10);

  const email = data.email;

  const first_name = data.first_name;
  const last_name = data.last_name;

  const fullName = `${first_name} ${last_name}`;

  const user = await db
    .insert(userTable)
    .values({
      id: userId,
      fullName,
      userName,
      email,
      hashedPassword: passwordHash,
      plan: "basic",
    })
    .catch((err: any) => {
      return {
        message: err.constraint_name || "timeout",
      };
    });

  if ((user as Err).message) {
    return {
      message: (user as Err).message,
    };
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect("/dashboard");
}
