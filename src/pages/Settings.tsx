import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  Bot, 
  Shield, 
  Bell, 
  Wallet,
  Key,
  ToggleLeft,
  Sliders,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Settings() {
  const [dryRun, setDryRun] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoTrade, setAutoTrade] = useState(false);

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={cn(
        "relative w-12 h-6 rounded-full transition-colors duration-200",
        enabled ? "bg-primary" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 w-4 h-4 rounded-full bg-background transition-transform duration-200",
          enabled && "translate-x-6"
        )}
      />
    </button>
  );

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            <span className="gradient-text">Settings</span>
          </h1>
          <p className="text-muted-foreground">Configure your trading bot preferences and security</p>
        </div>
        <Button variant="glow">Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trading Mode */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold">Trading Mode</h3>
              <p className="text-sm text-muted-foreground">Control how the bot executes trades</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-warning" />
                <div>
                  <div className="font-medium">Dry Run Mode</div>
                  <div className="text-sm text-muted-foreground">Simulate trades without real money</div>
                </div>
              </div>
              <ToggleSwitch enabled={dryRun} onToggle={() => setDryRun(!dryRun)} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Auto-Trade Signals</div>
                  <div className="text-sm text-muted-foreground">Automatically execute high-confidence signals</div>
                </div>
              </div>
              <ToggleSwitch enabled={autoTrade} onToggle={() => setAutoTrade(!autoTrade)} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage your alert preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <div className="font-medium">Push Notifications</div>
                <div className="text-sm text-muted-foreground">Get alerts for new signals</div>
              </div>
              <ToggleSwitch enabled={notifications} onToggle={() => setNotifications(!notifications)} />
            </div>
          </div>
        </div>

        {/* Strategy Settings */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold">Strategy Configuration</h3>
              <p className="text-sm text-muted-foreground">Adjust your trading strategy parameters</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Active Strategy</span>
                <Badge variant="active">ValueStrategy</Badge>
              </div>
              <p className="text-sm text-muted-foreground">Conservative value-based trading approach</p>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Min Confidence Threshold</span>
                <span className="font-mono text-primary">65%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div className="h-full bg-primary rounded-full" style={{ width: "65%" }} />
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Max Position Size</span>
                <span className="font-mono">$500.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* API & Security */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold">API & Security</h3>
              <p className="text-sm text-muted-foreground">Manage your API keys and security settings</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Kalshi API Key</div>
                  <div className="font-mono text-sm text-muted-foreground mt-1">••••••••••••••••</div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">Connected</span>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Update API Key
            </Button>
          </div>
        </div>

        {/* Account */}
        <div className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Account Overview</h3>
              <p className="text-sm text-muted-foreground">Your trading account details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="text-sm text-muted-foreground mb-1">Account Balance</div>
              <div className="text-2xl font-bold font-mono">$10,250.00</div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="text-sm text-muted-foreground mb-1">Available Cash</div>
              <div className="text-2xl font-bold font-mono">$8,500.00</div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/30">
              <div className="text-sm text-muted-foreground mb-1">In Positions</div>
              <div className="text-2xl font-bold font-mono">$1,750.00</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
