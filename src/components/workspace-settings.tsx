"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import changeWorkspaceVisibility from "@/db/workpace-actions/change-visibility";
import { useToast } from "@/lib/use-toast";

type Access = "view" | "comment" | "edit";
export type Visibility =
  | "private"
  | "public-comment"
  | "public-view"
  | "public-edit";

export default function WorkspaceSettings({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [visibility, setVisibility] = useState<"public" | "private">("private");
  const [access, setAccess] = useState<Access>("view");
  const { toast } = useToast();

  async function changeVisibility(visibility: Visibility) {
    const result = await changeWorkspaceVisibility(visibility, workspaceId);

    if (result)
      toast({
        description: "Visibility changed successfully",
        variant: "success",
        duration: 3000,
      });

    if (!result)
      toast({
        description: "You are not the owner",
        variant: "destructive",
        duration: 3000,
      });
  }

  return (
    <div>
      <h3 className="my-0 mb-2">Visibility</h3>
      <RadioGroup
        defaultValue={visibility}
        className="gap-0"
        onValueChange={async (val: "public" | "private") => {
          setVisibility(val as "public" | "private");
          if (val == "private") await changeVisibility("private");
          else await changeVisibility(`${val}-${access}`);
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="public" id="public" />
          <label htmlFor="public">Public</label>
          <Select
            defaultValue={access}
            onValueChange={async (val) => {
              setAccess(val as Access);
              await changeVisibility(`${visibility}-${val}` as Visibility);
            }}
            disabled={visibility !== "public"}
          >
            <SelectTrigger className="w-[180px] focus:ring-0 focus:ring-transparent">
              <SelectValue placeholder="Everyone access" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Access</SelectLabel>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="comment">Comment</SelectItem>
                <SelectItem value="edit">Edit</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="private" id="private" />
          <label htmlFor="private">Private</label>
        </div>
      </RadioGroup>
    </div>
  );
}
