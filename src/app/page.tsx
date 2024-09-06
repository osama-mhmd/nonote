import { Button } from "@/components/ui/button";
import Link from "next/link";
import { merienda } from "./layout";
import { validateRequest } from "@/db/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nonote | Homepage",
  description:
    "Everyday you see a new note taking app appears, but they all don't fit you. Don't worry, this app will fit you",
};

export default async function Home() {
  const { session } = await validateRequest();

  return (
    <main className="flex flex-col mt-6">
      <div className="container flex flex-col gap-4">
        <h1 className={"text-5xl sm:text-7xl mb-0 " + merienda}>
          {/* TODO: some effects (eg. realistic highlight) */}
          Nonote: <span className="text-primary">free, open source</span>, for
          developers note taking app
        </h1>
        <p className="text-muted-foreground max-w-prose mt-2">
          Everyday you see a new note taking app appears, but they all don{"'"}t
          fit you. Don{"'"}t worry, this app will fit you
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {!session && (
            <>
              <Button variant="outline" asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Create account</Link>
              </Button>
            </>
          )}
          {session && (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
