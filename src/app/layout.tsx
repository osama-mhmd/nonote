import { inter } from "@/lib/fonts";
import Nav from "@/app/nav";
import { validateRequest } from "@/db/auth";
import { Metadata } from "next";
import { Toaster } from "sonner";

import "@/styles/globals.css";
import { ThemeProvider } from "./theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter}>
        <ThemeProvider
          attribute="class"
          disableTransitionOnChange
          defaultTheme="system"
          enableSystem
        >
          <Nav session={session} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
