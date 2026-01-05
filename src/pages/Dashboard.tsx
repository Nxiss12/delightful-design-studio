import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { PositionsTable, Position } from "@/components/dashboard/PositionsTable";
import { RecentTradesTable, Trade } from "@/components/dashboard/RecentTradesTable";
import { SignalsCard, Signal } from "@/components/dashboard/SignalsCard";
import { PortfolioChart } from "@/components/dashboard/PortfolioChart";
import { DollarSign, TrendingUp, Wallet, PiggyBank, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockPositions: Position[] = [
  { ticker: "TEMP-NYC-90", side: "YES", count: 50, avgPrice: 35, currentPrice: 42, unrealizedPnl: 35.00 },
  { ticker: "UNRATE-4.5", side: "NO", count: 30, avgPrice: 25, currentPrice: 28, unrealizedPnl: 9.00 },
  { ticker: "FED-HOLD", side: "YES", count: 100, avgPrice: 70, currentPrice: 72, unrealizedPnl: 20.00 },
];

const mockTrades: Trade[] = [
  { time: "10:32", ticker: "TEMP-NYC-90", action: "BUY YES", count: 25, price: 34 },
  { time: "09:15", ticker: "FED-HOLD", action: "BUY YES", count: 50, price: 71 },
  { time: "Yesterday", ticker: "CPI-3.5", action: "SOLD", count: 40, price: 100, pnl: 45 },
];

const mockSignals: Signal[] = [
  {
    id: "1",
    name: "BTC-50K",
    type: "BUY",
    confidence: 75,
    reasoning: "LLM bullish on crypto news. Market sentiment indicators showing positive momentum.",
    active: true,
  },
  {
    id: "2",
    name: "RAIN-LA",
    type: "SELL",
    confidence: 82,
    reasoning: "Weather shows low precipitation probability. Historical data suggests dry conditions.",
    active: true,
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            <span className="gradient-text">Trading Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Real-time portfolio monitoring and trading signals</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="warning" className="gap-1.5">
            <AlertTriangle className="w-3 h-3" />
            DRY RUN MODE
          </Badge>
          <Button variant="glass" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Value"
          value="$10,250.00"
          change={2.5}
          icon={DollarSign}
          variant="primary"
          delay={0}
        />
        <StatCard
          title="Today's P&L"
          value="$125.50"
          change={1.3}
          icon={TrendingUp}
          variant="success"
          delay={50}
        />
        <StatCard
          title="Total P&L"
          value="$250.00"
          change={2.5}
          icon={PiggyBank}
          variant="success"
          delay={100}
        />
        <StatCard
          title="Cash Available"
          value="$8,500.00"
          icon={Wallet}
          variant="default"
          delay={150}
        />
      </div>

      {/* Chart */}
      <div className="mb-8">
        <PortfolioChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Tables */}
        <div className="xl:col-span-2 space-y-6">
          <PositionsTable positions={mockPositions} />
          <RecentTradesTable trades={mockTrades} />
        </div>

        {/* Right Column - Signals */}
        <div>
          <SignalsCard signals={mockSignals} />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-muted-foreground">
        <span>Last updated: 2026-01-05 03:10:30</span>
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span>Trading involves risk. Past performance does not guarantee future results.</span>
        </div>
      </div>
    </DashboardLayout>
  );
}
