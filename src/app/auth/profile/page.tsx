import { validateRequest } from "@/db/auth";
import SignOut from "./sign-out";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nonote | Profile",
};

export default async function Profile() {
  const { user, session } = await validateRequest();

  if (!session) redirect("/auth/login")

  return (
    <section className="mt-20">
      <div className="container">
        <p className="rounded-md bg-muted my-3 p-3 flex items-center gap-1">
          Username: {user.username}
        </p>
        <p className="rounded-md bg-muted my-3 p-3 flex items-center gap-1">
          Name: {user.fullname}
        </p>
        <p className="rounded-md bg-muted my-2 p-3 flex items-center gap-1">
          Email: {user.email}
        </p>
        <div className="text-center pt-4">
          <SignOut />
        </div>
      </div>
    </section>
  );
}
