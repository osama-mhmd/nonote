"use server";

import db from "../..";
import { workspaceDocuments } from "../../schemas";
import { eq } from "drizzle-orm";
import permission from "../workspaces/permission";

/**
 * @returns status as a boolean
 */

export async function saveDocument(
  document_id: string,
  workpsace_id: string,
  content: string,
  title: string,
): Promise<boolean> {
  const userPermission = await permission(workpsace_id);

  if (userPermission !== "owner" && userPermission !== "edit") return false;

  await db
    .update(workspaceDocuments)
    .set({ content, title })
    .where(eq(workspaceDocuments.id, document_id))
    .catch((err) => {
      console.log(err);
      return false;
    });

  return true;
}
