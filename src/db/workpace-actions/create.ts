"use server";

import { generateIdFromEntropySize } from "lucia";
import db from "..";
import { validateRequest } from "../auth";
import { usersPermissions, workspaceTable } from "../schemas";
import { redirect } from "next/navigation";
import createDocument from "../documents-actions/create";

export type Err = {
  message: string;
};

export default async function createWorkspace(data: any): Promise<Err | never> {
  const { user } = await validateRequest();

  if (!user)
    return {
      message: "unauthorized",
    };

  const workspaceId = generateIdFromEntropySize(10);

  const workspace = await db
    .insert(workspaceTable)
    .values({
      id: workspaceId,
      name: data.name ?? "workspace",
      description: data.description,
      visibility: "private",
    })
    .catch((err) => {
      return {
        message: err.constraint_name,
      };
    });

  if ((workspace as Err).message)
    return {
      message: (workspace as Err).message,
    };

  await db.insert(usersPermissions).values({
    workpsace_id: workspaceId,
    user_id: user.id,
    permission: "owner",
  });

  const result = await createDocument(workspaceId);

  if (!result.ok)
    return {
      message: "document-not-created",
    };

  redirect(`/app/workspace/${workspaceId}`);
}
