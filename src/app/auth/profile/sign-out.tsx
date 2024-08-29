"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <Button variant="destructive">
      Sign out <LogOut className="ms-2" />
    </Button>
  );
}
