import { Button } from "@/components/ui/button";
import {
  getWorkspaces,
  getWorkspacesPerUser,
} from "@/db/workpace-actions/get-workspaces";
import { PlusCircle, Settings } from "lucide-react";
import Link from "next/link";

export default async function App() {
  let Workspaces;

  const workpsacesIds = await getWorkspacesPerUser();

  const ids = workpsacesIds.map((workspace) => workspace.workspace_id);

  const workspaces = await getWorkspaces(ids);

  if (workspaces.length == 0) {
    Workspaces = (
      <div className="text-center">
        <h3 className="text-2xl">No workspaces yet 😞</h3>
        <Button asChild>
          <Link href="/app/workspace/create">Create your first one 💪</Link>
        </Button>
      </div>
    );
  } else {
    Workspaces = (
      <div>
        <h3>Workspaces</h3>
        <div className="flex flex-col *:h-16 gap-2 mb-2">
          {workspaces.map((workspace, index) => {
            return (
              <Link
                href={`/app/workspace/${workspace.id}`}
                key={index}
                className="px-4 rounded-md bg-muted border border-border"
              >
                <h3 className="text-lg">{workspace.name}</h3>
                {/* <p>
                  Permission:{" "}
                  {
                    workpsacesIds.filter(
                      (item) => item.workspace_id == workspace.id
                    )[0].permission
                  }
                </p> */}
              </Link>
            );
          })}
        </div>
        <Link
          href="/app/workspace/create"
          className="flex h-16 justify-center items-center px-4 rounded-md bg-muted border border-border"
        >
          <PlusCircle />
        </Link>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div className="container">
        <div className="flex justify-end">
          <Link href="/app/settings">
            <Settings />
          </Link>
        </div>
        {Workspaces}
      </div>
    </section>
  );
}
