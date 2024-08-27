"use server";

import { lucia } from "../lucia";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import mongoose from "mongoose";
import { uri } from "../adapter";
import userSchema from "../user.schema";
import { isValidEmail } from "@/lib/utils";

export default async function createUser(formData: FormData) {
  const email = formData.get("email");
  if (!email || typeof email !== "string" || !isValidEmail(email)) {
    return new Response("Invalid email", {
      status: 400,
    });
  }
  const password = formData.get("password");
  if (!password || typeof password !== "string" || password.length < 6) {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  const passwordHash = await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  const userId = generateIdFromEntropySize(10); // 16 characters long

  await mongoose.connect(uri);

  const User = mongoose.model("User", userSchema);

  const username = formData.get("username");

  await User.create({
    id: userId,
    username,
    email,
    hashedPassword: passwordHash,
    plan: "basic",
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": sessionCookie.serialize(),
    },
  });
}
