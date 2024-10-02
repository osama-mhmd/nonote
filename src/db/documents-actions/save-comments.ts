"use server";

import { eq } from "drizzle-orm";
import db from "..";
import { workspaceDocuments } from "../schemas";
import permission from "../workpace-actions/permission";

// TODO: THIS IS VERY DANGEROUS, THE USER WITH THE ACCESS
// OF COMMENT CAN OVERWRITE THE COMMENTS OF THE DOCUMENT AND EVEN DELETE THEM
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
    .where(eq(workspaceDocuments.id, document_id))
    .catch((err) => {
      console.log(err);
      return false;
    });

  return true;
}
