import { Inter, Merienda } from "next/font/google";

import "@/styles/globals.css";

import type { Metadata } from "next";

import Nav from "@/components/nav";

const interFont = Inter({ subsets: ["latin"] });
const meriendaFont = Merienda({ subsets: ["latin"] });

export const merienda = meriendaFont.className;

export const metadata: Metadata = {
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
      <body className={interFont.className}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
