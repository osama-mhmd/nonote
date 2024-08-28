"use client";

import Link from "next/link";
import { Button } from "./ui/button";

import { usePathname } from "next/navigation";

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
            <Button asChild>
              <Link href="/auth/register">Create account</Link>
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
