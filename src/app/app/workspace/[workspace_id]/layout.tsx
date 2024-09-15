import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-start gap-6">
      <Sidebar />
      <section className="flex-1">{children}</section>
    </div>
  );
}
