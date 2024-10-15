"use client";

import { Button } from "@/components/ui/button";
import saveRecord from "@/db/actions/habits/save-record";
import { toast } from "sonner";

export default function SaveRecord({ habitId }: { habitId: string }) {
  const makeRecord = async (id: string) => {
    const result = await saveRecord(id);

    if (result) toast.success("Record saved");
    else toast.error("Something went wrong");
  };

  return <Button onClick={() => makeRecord(habitId)}>Save Record</Button>;
}
