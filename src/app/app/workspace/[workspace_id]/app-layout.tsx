import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function AppLayout({
  children,
  workspace_id,
}: {
  children: ReactNode;
  workspace_id: string;
}) {
  return (
    <div className="flex flex-start gap-6">
      <Sidebar workspaceId={workspace_id} />
      <section className="flex-1">{children}</section>
    </div>
  );
}
