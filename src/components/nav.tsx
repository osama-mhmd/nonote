"use client";

import { Button } from "./ui/button";

import { usePathname } from "next/navigation";
import Link from "next/link";
import GithubIcon from "./icons/github";

export default function Nav() {
  const pathname = usePathname();

  const shouldNotRender = pathname == "/dashboard";

  return shouldNotRender ? null : (
    <nav className="py-4 my-2">
      <div className="container border rounded-full py-2 px-6 flex items-center justify-between">
        <Link href="/" className="font-bold">
          Nonote
        </Link>
        <ul className="flex gap-3 items-center px-0 list-none">
          <li>
            {/* {session && (
              <Button asChild variant="secondary">
                <Link href="/auth/profile">{session.user?.name}</Link>
              </Button>
            )} */}
            {/* {!session && ( */}
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
