import { Inter, Merienda } from "next/font/google";
import Nav from "@/components/nav";

import "@/styles/globals.css";

const interFont = Inter({ subsets: ["latin"] });
const meriendaFont = Merienda({ subsets: ["latin"] });

export const merienda = meriendaFont.className;

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
