import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Filter, Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const positions = [
  { ticker: "TEMP-NYC-90", side: "YES", count: 50, avgPrice: 35, currentPrice: 42, unrealizedPnl: 35.00, category: "Weather" },
  { ticker: "UNRATE-4.5", side: "NO", count: 30, avgPrice: 25, currentPrice: 28, unrealizedPnl: 9.00, category: "Economy" },
  { ticker: "FED-HOLD", side: "YES", count: 100, avgPrice: 70, currentPrice: 72, unrealizedPnl: 20.00, category: "Finance" },
  { ticker: "BTC-50K", side: "YES", count: 25, avgPrice: 45, currentPrice: 52, unrealizedPnl: 17.50, category: "Crypto" },
  { ticker: "RAIN-LA", side: "NO", count: 75, avgPrice: 30, currentPrice: 25, unrealizedPnl: -37.50, category: "Weather" },
];

export default function Positions() {
  const totalUnrealizedPnl = positions.reduce((sum, p) => sum + p.unrealizedPnl, 0);
  const positionsWithProfit = positions.filter(p => p.unrealizedPnl > 0).length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            <span className="gradient-text">Open Positions</span>
          </h1>
          <p className="text-muted-foreground">Manage and monitor your active market positions</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="glass" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Total Positions</span>
          <div className="text-3xl font-bold font-mono mt-2">{positions.length}</div>
        </div>
        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Profitable Positions</span>
          <div className="text-3xl font-bold font-mono text-success mt-2">{positionsWithProfit}</div>
        </div>
        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Total Unrealized P&L</span>
          <div className={cn(
            "text-3xl font-bold font-mono mt-2",
            totalUnrealizedPnl >= 0 ? "text-success" : "text-destructive"
          )}>
            {totalUnrealizedPnl >= 0 ? "+" : ""}\${totalUnrealizedPnl.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search positions..."
            className="w-full bg-secondary/50 border border-border/50 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Positions Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-secondary/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Ticker</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Side</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Quantity</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Avg Price</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Current Price</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Unrealized P&L</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {positions.map((position, index) => {
                const isPnlPositive = position.unrealizedPnl > 0;
                const priceChange = ((position.currentPrice - position.avgPrice) / position.avgPrice * 100).toFixed(1);
                return (
                  <tr key={position.ticker} className="table-row-hover">
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-foreground">{position.ticker}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary">{position.category}</Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant={position.side === "YES" ? "buy" : "sell"}>
                        {position.side}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-mono">{position.count}</td>
                    <td className="px-6 py-4 text-right font-mono text-muted-foreground">{position.avgPrice}¢</td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-mono">{position.currentPrice}¢</div>
                      <div className={cn(
                        "text-xs",
                        Number(priceChange) >= 0 ? "text-success" : "text-destructive"
                      )}>
                        {Number(priceChange) >= 0 ? "+" : ""}{priceChange}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={cn(
                        "flex items-center justify-end gap-1 font-mono font-semibold",
                        isPnlPositive ? "text-success" : "text-destructive"
                      )}>
                        {isPnlPositive ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        ${Math.abs(position.unrealizedPnl).toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button variant="ghost" size="sm">Close</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
