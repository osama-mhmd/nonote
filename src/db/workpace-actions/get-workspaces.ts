"use server";

import db from "..";
import { validateRequest } from "../auth";
import { workspaceTable } from "../schemas";
import { eq } from "drizzle-orm";

export type Workspace = {
  id: string;
  name: string;
  owner: string;
  visibility: string;
  permissions?:
    | unknown
    | {
        edit: string[];
        comment: string[];
        view: string[];
      };
};

// TODO: will be owner, edit, comment, view
type Permission = "owner";

export default async function permission(
  permission: Permission = "owner",
): Promise<Workspace[]> {
  const { user } = await validateRequest();

  if (!user) throw new Error("not authorized");

  const workspaces = await db
    .select()
    .from(workspaceTable)
    .where(eq(workspaceTable[permission], user.id));

  return workspaces;
}
