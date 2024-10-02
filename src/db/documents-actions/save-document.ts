"use server";

import db from "..";
import { workspaceDocuments } from "../schemas";
import { eq } from "drizzle-orm";
import permission from "../workpace-actions/permission";

/**
 * @returns status as a boolean
 */

export async function saveDocument(
  document_id: string,
  workpsace_id: string,
  content: string,
  title?: string,
): Promise<boolean> {
  const userPermission = await permission(workpsace_id);

  if (userPermission !== "owner" && userPermission !== "edit") return false;

  // if not provided the content, then it will update only the title
  // AS WE ARE USING TITLE EDITOR AND CONTENT EDITOR
  if (!title) {
    await db
      .update(workspaceDocuments)
      .set({ content })
      .where(eq(workspaceDocuments.id, document_id));

    return true;
  }

  if (!content) {
    await db
      .update(workspaceDocuments)
      .set({ title })
      .where(eq(workspaceDocuments.id, document_id))
      .catch((err) => {
        console.log(err);
        return false;
      });

    return true;
  }

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
