import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [botStatus, setBotStatus] = useState<"running" | "paused" | "stopped">("running");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar 
        botStatus={botStatus}
        strategy="ValueStrategy"
        uptime="24h 32m"
        onStatusChange={setBotStatus}
      />
      <main
        className={cn(
          "transition-all duration-300 min-h-screen",
          "ml-64" // Default sidebar width
        )}
      >
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
