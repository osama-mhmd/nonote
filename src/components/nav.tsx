"use client";

import { Button } from "./ui/button";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav() {
  const pathname = usePathname();

  const shouldNotRender = pathname == "/dashboard";

  return shouldNotRender ? null : (
    <nav className="shadow-md py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-medium">
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
            <Button asChild>
              <Link href="/api/auth/signin">Create account</Link>
            </Button>
            {/* )} */}
          </li>
        </ul>
      </div>
    </nav>
  );
}
