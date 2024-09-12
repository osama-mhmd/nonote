import { getWorkspace } from "@/db/workpace-actions/get-workspaces";
import permission from "@/db/workpace-actions/permission";

export default async function Space({
  params,
}: {
  params: { workspace_id: string };
}) {
  const userPermission = await permission(params.workspace_id);

  if (userPermission == "not-found")
    return (
      <h3 className="text-center">
        Sorry, this workspace doesn{"'"}t exist 😞
      </h3>
    );

  if (userPermission == "no-access")
    return (
      <h3 className="text-center">You have no access for this workspace 😞</h3>
    );

  const workspace = await getWorkspace(params.workspace_id);

  return (
    <section className="mt-6 sm:mt-12">
      <div className="container">
        <p>Your permission is: {userPermission as string}</p>
        <p>id: {workspace.id}</p>
        <p>name: {workspace.name}</p>
      </div>
    </section>
  );
}
