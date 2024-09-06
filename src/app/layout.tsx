import { inter } from "./families";
import Nav from "@/components/nav";

import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
