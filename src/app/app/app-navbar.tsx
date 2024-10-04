"use client";

import { merienda } from "@/lib/fonts";
import { ChartPie, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppNavbar() {
  const pathname = usePathname();

  let shouldNotRender = /^\/app\/workspace\/?(.*)$/.test(pathname);
  if (pathname == "/app/workspace/create") shouldNotRender = false;

  return shouldNotRender ? null : (
    <nav className="py-4 bg-muted">
      <div className="container py-2 px-6 flex items-center justify-between">
        <Link href="/app" className={"font-bold " + merienda}>
          Nonote App
        </Link>
        <ul className="flex gap-3 py-2 sm:py-0 items-center px-0 list-none">
          <li>
            <Link href="/app/settings">
              <UserCircle />
            </Link>
          </li>
          <li>
            <Link href="/app/statistics">
              <ChartPie />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
