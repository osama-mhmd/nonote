import { Inter } from "next/font/google";
import "@/styles/globals.css";

import type { Metadata } from "next";

import Nav from "@/components/nav";
import SessionProvider from "@/components/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nonote | Homepage",
  description:
    "Everyday you see a new note taking app appears, but they all don't fit you. Don't worry, this app will fit you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Nav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
