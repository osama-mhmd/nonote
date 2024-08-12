import Link from "next/link";
import { Button } from "./ui/button";

export default function Nav() {
  return (
    <nav className="shadow-md py-4">
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-medium">
          Nonote
        </Link>
        <ul className="flex gap-3 items-center">
          <li>
            <Button variant="ghost">
              <Link href="/pricing">Pricing</Link>
            </Button>
          </li>
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
