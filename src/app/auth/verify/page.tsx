import { validateRequest } from "@/db/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { isWithinExpirationDate } from "oslo";
import VerifyForm from "./verify-form";
import { newVerify } from "@/db/utils/new-verify";

export const metadata: Metadata = {
  title: "Nonote | Verify your email",
};

export default async function Verify() {
  const Text = ({ message = "" }) => (
    <p className="flex items-center info gap-2">
      {message == "" && <span className="spinner"></span>}
      {message}
    </p>
  );

  let message = "";

  const { user, session } = await validateRequest();

  if (!session || !user) redirect("/auth/login");

  if (user.isVerified) redirect("/app");

  const emailSentMessage = `We have sent an email to "${user.email}". Please check out your inbox... Please note that the verification email may take a few minutes to arrive.`;

  if (user.emailVerified == "false") {
    message = emailSentMessage;
    await newVerify(user.email);
  } else {
    const [expiresAt, code] = user.emailVerified.split("=");

    if (isWithinExpirationDate(new Date(expiresAt))) {
      // TODO: this way should be changed
      // might be changed for something like whatsapp where you can resend the code every 30 second
      message = "We have already sent an email";
    } else {
      // send another email
      message = emailSentMessage;
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
