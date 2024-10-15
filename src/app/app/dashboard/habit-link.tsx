"use client";

import Link from "next/link";

export default function HabitLink({ name, id }: { name: string; id: string }) {
  return (
    <Link
      className="text-xl tracking-tight dark:text-blue-100"
      href={`/app/dashboard/habits/${id}`}
      onClick={(e) => e.stopPropagation()}
    >
      {name}
    </Link>
  );
}
