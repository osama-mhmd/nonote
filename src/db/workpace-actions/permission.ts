"use server";

import db from "..";
import { validateRequest } from "../auth";
import { workspaceTable } from "../schemas";
import { eq } from "drizzle-orm";

type Err = {
  message: string;
};

type WorkspacePermissions = {
  edit: string[] | null | "everyone";
  comment: string[] | null | "everyone";
  view: string[] | null | "everyone";
};

type Permission = "owner" | "view" | "comment" | "edit" | "no-access";

export default async function permission(
  workspaceId: string,
): Promise<Err | Permission> {
  const { user } = await validateRequest();

  if (!user)
    return {
      message: "unauthorized",
    };

  const workspaces = await db
    .select()
    .from(workspaceTable)
    .where(eq(workspaceTable.id, workspaceId));

  const workspace = workspaces[0];

  if (!workspace)
    return {
      message: "not-found",
    };

  if (workspace.owner == user.id) return "owner";

  if (!workspace.permissions) return "no-access";

  const perms = workspace.permissions as WorkspacePermissions;

  if (perms.edit && (perms.edit.includes(user.id) || perms.edit == "everyone"))
    return "edit";

  if (
    perms.comment &&
    (perms.comment.includes(user.id) || perms.comment == "everyone")
  )
    return "comment";

  if (perms.view && perms.view.includes(user.id)) return "view";

  if (workspace.visibility == "public") return "view";

  return "no-access";
}
