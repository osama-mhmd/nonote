"use server";

import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "Gmail",
  auth: {
    user: "nonote.app.verify@gmail.com",
    pass: process.env.MAIL_PASS,
  },
});

export default async function sendMail(
  to: string,
  subject: string,
  text: string,
) {
  const mailOptions = {
    from: "nonote.app.verify@gmail.com",
    to,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}
