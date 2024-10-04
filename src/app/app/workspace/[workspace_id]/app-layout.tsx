import Sidebar from "./sidebar";
import { getWorkspace } from "@/db/actions/workspaces/get-workspaces";
import { Permission } from "@/db/actions/workspaces/permission";
import { ReactNode } from "react";
import Banner from "./banner";

export default async function AppLayout({
  children,
  workspace_id,
  permission,
}: {
  children: ReactNode;
  workspace_id: string;
  permission: Permission;
}) {
  const workspace = await getWorkspace(workspace_id);

  return (
    <div className="flex flex-start">
      <Sidebar permission={permission} workspace={workspace} />
      <section className="flex-1">
        <Banner workspace={workspace} permission={permission} />
        {children}
      </section>
    </div>
  );
}
