"use server";

import db from "../..";
import { validateRequest } from "../../auth";
import { usersPermissions } from "../../schemas";
import { and, eq } from "drizzle-orm";
import { getWorkspace } from "./get-workspaces";

export type Permission = "owner" | "view" | "comment" | "edit" | "no-access";

export default async function permission(
  workspaceId: string,
): Promise<Permission | "not-found"> {
  const { user } = await validateRequest();

  if (!user) return "no-access";

  const userPermissions = await db
    .select()
    .from(usersPermissions)
    .where(
      and(
        eq(usersPermissions.workpsace_id, workspaceId),
        eq(usersPermissions.user_id, user.id),
      ),
    );

  const userPermission = userPermissions[0];

  if (userPermission) return userPermission.permission as Permission;

  const workspace = await getWorkspace(workspaceId);

  if (!workspace) return "not-found";

  const workspaceVisibility = workspace.visibility;

  if (workspaceVisibility == "private") return "no-access";
  else return workspaceVisibility.split("-")[1] as Permission;
}
