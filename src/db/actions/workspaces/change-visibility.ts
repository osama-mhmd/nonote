"use server";

import { Visibility } from "@/app/app/workspace/[workspace_id]/workspace-settings";
import db from "../..";
import { workspaceTable } from "../../schemas";
import { eq } from "drizzle-orm";
import permission from "./permission";

export default async function changeWorkspaceVisibility(
  visibility: Visibility,
  workspaceId: string,
): Promise<boolean> {
  const userPermissions = await permission(workspaceId);

  if (userPermissions !== "owner") return false;

  await db
    .update(workspaceTable)
    .set({ visibility })
    .where(eq(workspaceTable.id, workspaceId));

  return true;
}
