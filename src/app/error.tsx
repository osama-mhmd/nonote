"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  console.log(error);
  return (
    <section className="pt-20 text-center">
      <div>
        <h3 className="mb-4">Sorry, something went wrong</h3>
        <p className="text-red-800 mb-4 text-lg">{error.message}</p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
}
