"use client";

import { Button } from "../components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GithubIcon from "../components/icons/github";
import { ArrowRight, List } from "lucide-react";
import { merienda } from "@/lib/fonts";
import { Session } from "lucia";
import { ThemeToggle } from "@/components/change-theme";

export default function Nav({ session }: { session: Session | null }) {
  const pathname = usePathname();

  const shouldNotRender = /^\/app\/?(.*)$/.test(pathname);

  return shouldNotRender ? null : (
    <nav className="main-nav">
      <div className="container py-2 px-6 flex items-center justify-between">
        <Link href="/" className={"font-bold " + merienda}>
          Nonote
        </Link>
        {/* TODO: navbar on small screens */}
        <ul className="[&>li]:hidden [&>li]:sm:block flex gap-3 py-2 sm:py-0 items-center px-0 list-none">
          <List className="block sm:hidden cursor-pointer" />
          <li>
            {session && (
              <Button asChild variant="link">
                <Link href="/app" className="flex items-center gap-1">
                  App <ArrowRight width={15} />
                </Link>
              </Button>
            )}
            {!session && (
              <Button asChild variant="link">
                <Link href="/auth/register">Create account</Link>
              </Button>
            )}
          </li>
          <li>
            <Button asChild variant="link">
              <Link
                href="https://github.com/osama-mhmd/nonote"
                className="flex gap-1"
                target="_blank"
              >
                <GithubIcon /> View source code
              </Link>
            </Button>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
