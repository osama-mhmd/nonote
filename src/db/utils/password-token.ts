"use server";

import { TimeSpan, createDate, isWithinExpirationDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import db from "..";
import { resetPasswordTokens } from "../schemas";
import { eq } from "drizzle-orm";
import { sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import { generateIdFromEntropySize } from "lucia";

export async function createResetPasswordToken(
  userId: string,
): Promise<string> {
  await db
    .delete(resetPasswordTokens)
    .where(eq(resetPasswordTokens.user_id, userId));
  const code = generateRandomString(8, alphabet("0-9"));

  const tokenId = generateIdFromEntropySize(25); // 40 character
  const tokenHash = encodeHex(await sha256(new TextEncoder().encode(tokenId)));

  await db.insert(resetPasswordTokens).values({
    token_code: code,
    token_hash: tokenHash,
    user_id: userId,
    expires_at: createDate(new TimeSpan(2, "h")),
  });

  return code;
}

import Result from "../../types/result";

export async function verifyResetPasswordTokenCode(
  inputCode: string,
  userId: string,
): Promise<Result> {
  const resetPasswordToken = await db
    .select()
    .from(resetPasswordTokens)
    .where(eq(resetPasswordTokens.user_id, userId));

  if (!resetPasswordToken) return Result.InvalidCode;

  const expiresAtDate = new Date(resetPasswordToken[0].expires_at);

  if (inputCode !== resetPasswordToken[0].token_code) return Result.InvalidCode;

  if (!isWithinExpirationDate(expiresAtDate)) return Result.ExpiredCode;

  return Result.Success;
}

export async function getTokenHash(
  tokenCode: string,
): Promise<"invalid-code" | string> {
  const resetPasswordToken = await db
    .select()
    .from(resetPasswordTokens)
    .where(eq(resetPasswordTokens.token_code, tokenCode));

  if (!resetPasswordToken) return "invalid-code";

  return resetPasswordToken[0].token_hash;
}

export async function verifyTokenHash(tokenHash: string): Promise<boolean> {
  const resetPasswordToken = await db
    .select()
    .from(resetPasswordTokens)
    .where(eq(resetPasswordTokens.token_hash, tokenHash));

  if (!resetPasswordToken.length) return false;

  return true;
}
