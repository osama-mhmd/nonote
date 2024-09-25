"use server";

import db from "..";
import { workspaceDocuments } from "../schemas";
import { and, eq } from "drizzle-orm";
import permission from "../workpace-actions/permission";

export type Document = {
  id: string;
  workspace_id: string;
  content: string | null;
  title: string | null;
  parent_id: string;
  comments?: string | null;
};

export async function getDocument(
  workpsace_id: string,
  document_id: string,
): Promise<Document | null> {
  const userPermission = await permission(workpsace_id);

  if (userPermission !== "owner") return null;

  const documents = await db
    .select()
    .from(workspaceDocuments)
    .where(eq(workspaceDocuments.id, document_id));

  return documents[0];
}

// the document with parent=""
export async function getRootDocument(
  workpsace_id: string,
): Promise<Document | null> {
  const userPermission = await permission(workpsace_id);

  if (userPermission !== "owner") return null;

  const documents = await db
    .select()
    .from(workspaceDocuments)
    .where(
      and(
        eq(workspaceDocuments.parent_id, ""),
        eq(workspaceDocuments.workspace_id, workpsace_id),
      ),
    );

  return documents[0];
}
