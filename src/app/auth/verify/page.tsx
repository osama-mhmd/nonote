import db from "@/db";
import { validateRequest } from "@/db/auth";
import { userTable } from "@/db/schemas";
import sendMail from "@/db/utils/send-mail";
import { generateEmailVerificationCode } from "@/db/utils/verification-code";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";
import { ReactNode } from "react";
import VerifyForm from "./verify-form";
import { newVerify } from "@/db/utils/new-verify";

export const metadat: Metadata = {
  title: "Nonote | Verify your email",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const Text = ({ message = "" }) => (
    <p className="flex items-center gap-2">
      {message == "" && <span className="spinner"></span>}
      {message}
    </p>
  );

  let message = "";

  const { user, session } = await validateRequest();

  if (!session || !user) redirect("/auth/login");

  if (user.isVerified) redirect("/dashboard");

  if (user.emailVerified == "false") {
    message = `We have sent an email to "${user.email}". Please check out your inbox`;
    await newVerify(user.email);
  } else {
    const [expiresAt, code] = user.emailVerified.split("=");

    if (isWithinExpirationDate(new Date(expiresAt))) {
      // TODO: this way should be changed
      // might be changed for something like whatsapp where you can resend the code every 30 second
      message = "We have already sent an email";
    } else {
      // send another email
      message = "We have sent another email";
      await newVerify(user.email);
    }
  }

  return (
    <section className="mt-6 sm:mt-12">
      <div className="container flex items-center justify-center">
        <VerifyForm text={<Text message={message} />} />
      </div>
    </section>
  );
}
