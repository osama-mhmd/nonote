// "use client";

// import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { createUser } from "@/db/adapter";

export default function Home() {
  // useEffect(() => {
  //   async function doInAsync() {
  //     await createUser();
  //   }
  //   doInAsync();
  // });
  return (
    <main className="flex flex-col mt-20">
      <div className="container flex flex-col items-center text-center gap-4">
        <h1 className="">Nonote</h1>
        <p className="text-muted-foreground max-w-prose">
          Everyday you see a new note taking app appears, but they all don{"'"}t
          fit you. Don{"'"}t worry, this app will fit you
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Create account</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
