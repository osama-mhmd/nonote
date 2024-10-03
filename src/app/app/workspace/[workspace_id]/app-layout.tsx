import Sidebar from "./sidebar";
import { getWorkspace } from "@/db/workpace-actions/get-workspaces";
import { Permission } from "@/db/workpace-actions/permission";
import { ReactNode } from "react";

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
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-48"></div>
        {children}
      </section>
    </div>
  );
}
