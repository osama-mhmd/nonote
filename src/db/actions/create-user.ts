"use server";

import db from "../.";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../lucia";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { userTable } from "../schemas";
import { RegisterFields } from "@/app/auth/register/schema";

export default async function signup(data: RegisterFields) {
  const userName = data.user_name;

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

  const password = data.password;
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
    .catch((err: any) => {
      // TODO: solve issue
      /* -->
      Error: getaddrinfo EAI_AGAIN aws-0-eu-central-1.pooler.supabase.com
          at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:120:26)
          at GetAddrInfoReqWrap.callbackTrampoline (node:internal/async_hooks:130:17) {
        errno: -3001,
        code: 'EAI_AGAIN',
        syscall: 'getaddrinfo',
        hostname: 'aws-0-eu-central-1.pooler.supabase.com'
      }
      */
      console.log(err);
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
