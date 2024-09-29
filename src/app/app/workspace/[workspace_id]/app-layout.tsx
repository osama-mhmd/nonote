import Sidebar from "@/components/sidebar";
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
    <div className="flex flex-start gap-6">
      <Sidebar permission={permission} workspace={workspace} />
      <section className="flex-1">{children}</section>
    </div>
  );
}
