"use server";

import db from "..";
import { validateRequest } from "../auth";
import { usersPermissions } from "../schemas";
import { and, eq } from "drizzle-orm";

export type Permission = "owner" | "view" | "comment" | "edit" | "no-access";

export default async function permission(
  workspaceId: string,
): Promise<Permission | "not-found"> {
  const { user } = await validateRequest();

  if (!user) return "no-access";

  const workspaces = await db
    .select()
    .from(usersPermissions)
    .where(
      and(
        eq(usersPermissions.workpsace_id, workspaceId),
        eq(usersPermissions.user_id, user.id),
      ),
    );

  const workspace = workspaces[0];

  // if there are no workspace, so we have three options
  // 1. no workspace with this id -> possible
  // 2. no user with this id -> not possible
  // 3. no relation between them -> higher percentage to happen
  // NOTE: WE ARE USING NO-ACCESS AS AN INDICATE FOR BANNING SOMEONE
  if (!workspace) return "not-found";
  // and in the frontend, we are going to know if there are a workspace or not
  // if there are no workspaces, so return "not-found"
  // if there are a workspace, so check the visibility and then return ...

  return workspace.permission as Permission;
}
