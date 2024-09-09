import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { isWithinExpirationDate } from "oslo";
import type { User } from "lucia";

export function generateEmailVerificationCode(): {
  verificationCode: string;
  expiresAt: string;
} {
  const verificationCode = generateRandomString(8, alphabet("0-9"));
  const expiresAtDate = createDate(new TimeSpan(15, "m")); // 15 minutes
  const expiresAt = expiresAtDate.toJSON();

  return {
    verificationCode,
    expiresAt,
  };
}

export function verifyVerificationCode(user: User, inputCode: string): boolean {
  const [expiresAt, code] = user.emailVerified.split("=");

  const expiresAtDate = new Date(expiresAt);

  if (inputCode !== code) {
    return false;
  }

  if (!isWithinExpirationDate(expiresAtDate)) {
    return false;
  }

  return true;
}
