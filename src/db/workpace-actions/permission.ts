"use server";

import db from "..";
import { validateRequest } from "../auth";
import { usersPermissions } from "../schemas";
import { and, eq } from "drizzle-orm";

export type Permission = "owner" | "view" | "comment" | "edit" | "no-access";

export default async function permission(
  workspaceId: string,
): Promise<Permission> {
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

  if (!workspace) return "no-access";

  return workspace.permission as Permission;
}
