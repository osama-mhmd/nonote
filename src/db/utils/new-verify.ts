"use server";

import { generateEmailVerificationCode } from "./verification-code";
import { userTable } from "../schemas";
import db from "..";
import sendMail from "./send-mail";
import { eq } from "drizzle-orm";
import { validateRequest } from "../auth";

export async function newVerify(email: string) {
  const { user } = await validateRequest();

  if (!user)
    return {
      message: "unauthorized",
    };

  const { verificationCode, expiresAt } = generateEmailVerificationCode();
  await db
    .update(userTable)
    .set({ emailVerified: `${expiresAt}=${verificationCode}` })
    .where(eq(userTable.id, user.id));

  await sendMail(
    email,
    "Please verify your email",
    `This is your verification code: ${verificationCode}`,
  );
}
