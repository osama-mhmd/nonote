"use server";

import { generateEmailVerificationCode } from "./verification-code";
import { userTable } from "../schemas";
import db from "..";
import sendMail from "./send-mail";

export async function newVerify(email: string) {
  const { verificationCode, expiresAt } = generateEmailVerificationCode();
  await db
    .update(userTable)
    .set({ emailVerified: `${expiresAt}=${verificationCode}` });
  await sendMail(
    email,
    "Please verify your email",
    `This is your verification code: ${verificationCode}`,
  );
}
