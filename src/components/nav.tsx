"use client";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GithubIcon from "./icons/github";
import { List } from "lucide-react";
import { merienda } from "@/app/layout";

export default function Nav() {
  const pathname = usePathname();

  const shouldNotRender = pathname == "/dashboard";

  return shouldNotRender ? null : (
    <nav className="py-4 my-2 mx-4">
      <div className="container border bg-primary/5 rounded-full py-2 px-6 flex items-center justify-between">
        <Link href="/" className={"font-bold " + merienda}>
          Nonote
        </Link>
        {/* TODO: navbar on small screens */}
        <ul className="[&>li]:hidden [&>li]:sm:block flex gap-3 py-2 sm:py-0 items-center px-0 list-none">
          <List className="block sm:hidden cursor-pointer" />
          <li>
            <Button asChild variant="link">
              <Link href="/auth/register">Create account</Link>
            </Button>
            {/* )} */}
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
        </ul>
      </div>
    </nav>
  );
}
