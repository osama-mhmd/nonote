import { validateRequest } from "@/db/auth";
import SignOut from "./sign-out";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { CircleAlert, CircleCheck } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nonote | Profile",
};

export default async function Profile() {
  const { user, session } = await validateRequest();

  if (!session) redirect("/auth/login");

  return (
    <section className="mt-20">
      <div className="container">
        <div className="rounded-md bg-muted my-3 p-3 flex items-center gap-1">
          Username: {user.username}
        </div>
        <div className="rounded-md bg-muted my-3 p-3 flex items-center gap-1">
          Name: {user.fullname}
        </div>
        <div className="rounded-md bg-muted my-2 p-3 flex items-center gap-1">
          Email:{" "}
          {user.isVerified ? (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger>
                  <CircleCheck fill="hsl(var(--primary))" stroke="white" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Your account is verified</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip open={true} delayDuration={300}>
                <TooltipTrigger>
                  <CircleAlert fill="hsl(var(--destructive))" stroke="white" />
                </TooltipTrigger>
                <TooltipContent>
                  <Link href="/auth/verify" className="underline text-blue-600">
                    Please verify your account
                  </Link>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}{" "}
          {user.email}
        </div>
        <div className="text-center pt-4">
          <SignOut />
        </div>
      </div>
    </section>
  );
}
