"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { X } from "lucide-react";
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
  stater,
  workspaceId,
}: {
  stater: (arg0: boolean) => void;
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
    <div className="absolute px-3 top-0 left-0 w-full h-full bg-black/50 z-[25] flex items-center justify-center">
      <div className="bg-white rounded-md p-4 w-full max-w-2xl">
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 justify-between">
            <h2 className="my-0">Settings</h2>
            <button
              onClick={() => stater(false)}
              className="text-xl cursor-pointer"
            >
              <X width={20} height={20} />
            </button>
          </div>
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
                    await changeVisibility(
                      `${visibility}-${val}` as Visibility,
                    );
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
        </div>
      </div>
    </div>
  );
}
