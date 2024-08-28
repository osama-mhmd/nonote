import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
      <div>
        <div className="inline-flex size-16 items-center justify-center">
          <span className="grid size-10 place-content-center rounded-lg bg-gray-200 text-xs text-gray-600">
            L
          </span>
        </div>

        <div className="border-t border-gray-100">
          <div className="px-2">
            <div className="py-4 flex justify-center">
              <Button variant="ghost" asChild>
                <Link href="#">
                  <Home />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
