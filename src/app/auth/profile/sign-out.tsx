"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { logout } from "@/db/actions/logout";

export default function SignOut() {
  return (
    <Button variant="destructive" onClick={async () => await logout()}>
      Sign out <LogOut className="ms-2" />
    </Button>
  );
}
