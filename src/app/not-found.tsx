import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h3 className="mb-4">Sorry, the page doesn{"'"}t exist</h3>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
}
