import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col pt-28">
      <div className="container flex flex-col items-center text-center gap-4">
        <h1 className="text-4xl sm:text-6xl font-bold">Nonote</h1>
        <p className="text-muted-foreground max-w-prose">
          Everyday you see a new note taking app appears, but they all don{"'"}t
          fit you. Don{"'"}t worry, this app will fit you
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Create account</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
