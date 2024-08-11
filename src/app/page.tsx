import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col pt-28">
      <div className="container flex flex-col items-center text-center gap-4">
        <h1 className="text-4xl sm:text-6xl font-bold">My project</h1>
        <p className="text-muted-foreground max-w-prose">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, laborum
          tempore, sint magni ex repellendus inventore doloribus laboriosam
          cupiditate, vero porro incidunt nulla voluptas laudantium tenetur
          dolore dolores nobis quod.
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
