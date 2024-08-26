import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Nonote | Profile",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
