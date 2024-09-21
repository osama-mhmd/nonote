"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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
      className="w-[20ch]"
      variant="destructive"
      loading={isLoading}
      onClick={async () => await onclick()}
    >
      Delete Account <Trash className="ms-2" />
    </Button>
  );
}
