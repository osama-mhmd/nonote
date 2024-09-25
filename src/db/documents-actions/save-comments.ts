"use server";

import { eq } from "drizzle-orm";
import db from "..";
import { workspaceDocuments } from "../schemas";
import permission from "../workpace-actions/permission";

export async function saveDocumentComments(
  comments: string,
  workspace_id: string,
  document_id: string,
) {
  const userPermission = await permission(workspace_id);

  if (
    userPermission !== "owner" &&
    userPermission !== "edit" &&
    userPermission !== "comment"
  )
    return false;

  await db
    .update(workspaceDocuments)
    .set({ comments })
    .where(eq(workspaceDocuments.id, document_id));

  return true;
}
