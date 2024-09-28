import { inter } from "./families";
import Nav from "@/components/nav";
import { validateRequest } from "@/db/auth";
import { Metadata } from "next";
import { Toaster } from "sonner";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Nonote | Homepage",
  description:
    "Everyday you see a new note taking app appears, but they all don't fit you. Don't worry, this app will fit you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await validateRequest();

  return (
    <html lang="en">
      <body className={inter}>
        <Nav session={session} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
