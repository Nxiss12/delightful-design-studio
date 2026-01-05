import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  TrendingUp, 
  History, 
  Zap, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Positions", url: "/positions", icon: TrendingUp },
  { title: "Trade History", url: "/trades", icon: History },
  { title: "Signals", url: "/signals", icon: Zap },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  botStatus: "running" | "paused" | "stopped";
  strategy: string;
  uptime: string;
  onStatusChange: (status: "running" | "paused" | "stopped") => void;
}

export function AppSidebar({ botStatus, strategy, uptime, onStatusChange }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const statusColors = {
    running: "status-dot-active",
    paused: "status-dot-warning",
    stopped: "status-dot-danger",
  };

  const statusLabels = {
    running: "Running",
    paused: "Paused",
    stopped: "Stopped",
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">TradeBot</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-sidebar-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Bot Status Card */}
      {!collapsed && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="glass-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Bot Status</span>
              <div className="flex items-center gap-2">
                <span className={statusColors[botStatus]} />
                <span className="text-sm font-medium">{statusLabels[botStatus]}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Strategy</span>
                <span className="font-medium text-primary">{strategy}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uptime</span>
                <span className="font-mono text-xs">{uptime}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {botStatus === "running" ? (
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => onStatusChange("paused")}
                >
                  Pause
                </Button>
              ) : (
                <Button 
                  variant="success" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => onStatusChange("running")}
                >
                  Resume
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Bot Status */}
      {collapsed && (
        <div className="p-2 border-b border-sidebar-border flex justify-center">
          <div className={cn("w-3 h-3 rounded-full", statusColors[botStatus])} />
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary border-l-2 border-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200",
                isActive && "scale-110"
              )} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.title}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Activity className="w-3 h-3" />
            <span>Live Data Connected</span>
          </div>
        </div>
      )}
    </aside>
  );
}
