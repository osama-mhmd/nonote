import { Button } from "@/components/ui/button";
import { getWorkspace } from "@/db/workpace-actions/get-workspaces";
import permission, { Permission } from "@/db/workpace-actions/permission";
import Link from "next/link";

export default async function permissionLayer(
  workspace_id: string,
  callback: (permission: Permission) => Promise<JSX.Element>,
): Promise<JSX.Element> {
  let userPermission = await permission(workspace_id);
  const workspace = await getWorkspace(workspace_id);

  if (userPermission == "not-found") {
    return (
      <div className="text-center mt-24">
        <h3>Sorry, this workspace doesn{"'"}t exist 😞</h3>
        <Button className="me-2 mb-2" variant="outline" asChild>
          <Link href="/app">Back to App</Link>
        </Button>
        <Button asChild>
          <Link href="/app/workspace/create">Create workspace</Link>
        </Button>
      </div>
    );
  }

  if (userPermission == "no-access") {
    // checking for visibility
    const visibility = workspace.visibility.split("public-");
    if (visibility.length == 1) {
      // this means that workspace.visibility is equal to "private"
      return (
        <h3 className="text-center">
          You have no access for this workspace 😞
        </h3>
      );
    } else {
      // this means that workspace.visibility is equal is "public-(edit|view|comment)"
      userPermission = visibility[1] as Permission;
    }
  }

  return callback(userPermission);
}
