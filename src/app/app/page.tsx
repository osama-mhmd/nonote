import { Button } from "@/components/ui/button";
import getWorkspaces from "@/db/workpace-actions/get-workspaces";
import Link from "next/link";

export default async function App() {
  let Workspaces;

  const workspaces = await getWorkspaces();

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
        {workspaces.map((workspace, index) => {
          return (
            // TODO: make it
            <div key={index}>{workspace.name}</div>
          );
        })}
      </div>
    );
  }

  return (
    <section className="mt-8">
      <div className="container">{Workspaces}</div>
    </section>
  );
}
