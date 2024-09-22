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
import DeleteAccount from "./delete-account";
import {
  Dialog,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
        <div className="px-6 mt-4 pb-6 py-2 border-2 border-red-400 rounded-lg flex flex-col gap-3">
          <h3>Danger Zone</h3>
          <div className="danger-zone-action-slot">
            Are you sure to sign out?
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Sign out</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="text-red-600">
                  <DialogTitle className="mt-0">Danger Action</DialogTitle>
                </DialogHeader>
                <p>Are you sure to sign out?</p>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <SignOut />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="danger-zone-action-slot">
            You cannot undo deleting your account!
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="text-red-600">
                  <DialogTitle className="mt-0">Danger Action</DialogTitle>
                </DialogHeader>
                <p>If you deleted your account, you cannot get it back!</p>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <DeleteAccount />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
