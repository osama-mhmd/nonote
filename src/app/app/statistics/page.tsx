import GithubIcon from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Statistics() {
  return (
    <section className="mt-16">
      <div className="container text-center">
        <h3 className="text-2xl">Statistics</h3>
        <p className="text-muted-foreground flex items-center flex-col gap-2 -translate-y-2">
          <i>Track your progress, stay tuned</i>
          <Button className="flex items-center gap-1" asChild>
            <Link href="https://github.com/osama-mhmd/nonote" target="_blank">
              Contribute <GithubIcon />
            </Link>
          </Button>
        </p>
      </div>
    </section>
  );
}
