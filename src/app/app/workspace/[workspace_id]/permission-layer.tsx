import { Button } from "@/components/ui/button";
import permission, { Permission } from "@/db/workpace-actions/permission";
import Link from "next/link";

function NoAccess() {
  return (
    <div className="text-center mt-24">
      <h3>You have no access for this workspace 😞</h3>
      <Button className="me-2 mb-2" variant="outline" asChild>
        <Link href="/app">Back to App</Link>
      </Button>
      <Button asChild>
        <Link href="/app/workspace/create">Create workspace</Link>
      </Button>
    </div>
  );
}

export default async function permissionLayer(
  workspace_id: string,
  callback: (permission: Permission) => Promise<JSX.Element | string>,
): Promise<JSX.Element | string> {
  let userPermission = await permission(workspace_id);

  if (userPermission == "no-access") {
    return <NoAccess />;
  }

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

  return callback(userPermission);
}
