"use server";

import db from "..";
import { validateRequest } from "../auth";
import { usersPermissions, workspaceTable } from "../schemas";
import { eq, inArray } from "drizzle-orm";

export type Workspace = {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  visibility: string;
  viewed_by: string[];
  created_at: Date;
  last_updated_at: Date;
};

export type UsersPermissions = {
  user_id: string;
  workspace_id: string;
  permission: string;
};

export async function getWorkspacesPerUser(): Promise<
  Omit<UsersPermissions, "user_id">[]
> {
  const { user } = await validateRequest();

  if (!user) throw new Error("not authorized");

  const workspaces = await db
    .select({
      workspace_id: usersPermissions.workpsace_id,
      permission: usersPermissions.permission,
    })
    .from(usersPermissions)
    .where(eq(usersPermissions.user_id, user.id));

  return workspaces;
}

export async function getWorkspace(id: string): Promise<Workspace> {
  const { user } = await validateRequest();

  if (!user) throw new Error("not authorized");

  const workspaces = await db
    .select()
    .from(workspaceTable)
    .where(eq(workspaceTable.id, id));

  return workspaces[0];
}

export async function getWorkspaces(ids: string[]): Promise<Workspace[]> {
  const { user } = await validateRequest();

  if (!user) throw new Error("not authorized");

  const workspaces = await db
    .select()
    .from(workspaceTable)
    .where(inArray(workspaceTable.id, ids));

  return workspaces;
}
