"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import changeWorkspaceVisibility from "@/db/workpace-actions/change-visibility";
import { toast } from "sonner";
import { Workspace } from "@/db/workpace-actions/get-workspaces";

type Access = "view" | "comment" | "edit";
export type Visibility =
  | "private"
  | "public-comment"
  | "public-view"
  | "public-edit";

export default function WorkspaceSettings({
  workspace,
}: {
  workspace: Workspace;
}) {
  const [visibility, setVisibility] = useState<"public" | "private">(
    workspace.visibility.split("-")[0] as "public" | "private",
  );
  const [access, setAccess] = useState<Access>(
    (workspace.visibility.split("-")[1] as Access) ?? "view",
  );

  async function changeVisibility(visibility: Visibility) {
    const result = await changeWorkspaceVisibility(visibility, workspace.id);

    if (result) toast.success("Visibility changed successfully");

    if (!result) toast.error("You are not the owner");
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
