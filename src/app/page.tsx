import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col mt-6">
      <div className="container flex flex-col gap-4">
        <h1 className="text-5xl sm:text-7xl mb-0">
          Nonote: free, open source, for developers note taking app
        </h1>
        <p className="text-muted-foreground max-w-prose mt-2">
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
