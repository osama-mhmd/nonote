"use server";

import db from "../.";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../lucia";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { userTable } from "../schemas";

export default async function signup(formData: FormData) {
  const userName = formData.get("user_name") as string;

  if (
    typeof userName !== "string" ||
    userName.length < 3 ||
    userName.length > 31 ||
    !/^[a-z0-9_-]+$/.test(userName)
  ) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return {
      error: "Invalid password",
    };
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10); // 16 characters long

  const email = formData.get("email") as string;

  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");
  const fullName = `${firstName} ${lastName}`;

  await db
    .insert(userTable)
    .values({
      id: userId,
      fullName,
      userName,
      email,
      hashedPassword: passwordHash,
      plan: "basic",
    })
    .catch((err) => {
      redirect("/auth/register?error=" + err.constraint_name);
    });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  redirect("/dashboard");
}
