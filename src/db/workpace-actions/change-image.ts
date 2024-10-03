"use server";

import db from "..";
import { workspaceTable } from "../schemas";
import { eq } from "drizzle-orm";
import permission from "./permission";

export default async function changeWorkspaceImage(
  image: string,
  workspaceId: string,
): Promise<boolean> {
  const userPermissions = await permission(workspaceId);

  if (userPermissions !== "owner") return false;

  await db
    .update(workspaceTable)
    .set({ image })
    .where(eq(workspaceTable.id, workspaceId));

  return true;
}
