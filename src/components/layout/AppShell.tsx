import { type ReactNode } from "react";
import { SidebarProvider } from "@/contexts/SidebarProvider";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppShellContentProps {
  children: ReactNode;
  role?: "patient" | "doctor";
}

function AppShellContent({ children, role = "patient" }: AppShellContentProps) {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role={role} />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isOpen ? "lg:ml-64" : "lg:ml-16"
        )}
      >
        <Header />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

interface AppShellProps {
  children: ReactNode;
  role?: "patient" | "doctor";
}

export default function AppShell({ children, role = "patient" }: AppShellProps) {
  return (
    <SidebarProvider>
      <AppShellContent role={role}>{children}</AppShellContent>
    </SidebarProvider>
  );
}
