import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { workspace_id: string };
}) {
  return (
    <div className="flex flex-start gap-6">
      <Sidebar />
      <section className="flex-1">{children}</section>
    </div>
  );
}
