import Sidebar from "@/components/sidebar";
import { Permission } from "@/db/workpace-actions/permission";
import { ReactNode } from "react";

export default function AppLayout({
  children,
  workspace_id,
  permission,
}: {
  children: ReactNode;
  workspace_id: string;
  permission: Permission;
}) {
  return (
    <div className="flex flex-start gap-6">
      <Sidebar permission={permission} workspaceId={workspace_id} />
      <section className="flex-1">{children}</section>
    </div>
  );
}
