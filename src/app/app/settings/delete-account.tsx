"use client";

import { Button } from "@/components/ui/button";
import { Trash, Trash2 } from "lucide-react";
import { deleteUser } from "@/db/actions/delete";
import { useState } from "react";

export default function DeleteAccount() {
  const [isLoading, setLoadingState] = useState(false);

  const onclick = async () => {
    setLoadingState(true);

    await deleteUser();
  };

  return (
    <Button
      variant="destructive"
      loading={isLoading}
      onClick={async () => await onclick()}
    >
      Delete Account <Trash2 strokeWidth={1.5} className="ms-2" />
    </Button>
  );
}
