import { validateRequest } from "@/db/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Nonote | App",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const { user, session } = await validateRequest();

  if (!session || !user) redirect("/auth/login");

  if (!user.isVerified) redirect("/auth/verify");

  return children;
}
