import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, Filter, Download, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

const trades = [
  { id: 1, time: "10:32 AM", date: "Today", ticker: "TEMP-NYC-90", action: "BUY YES", count: 25, price: 34, pnl: null, status: "filled" },
  { id: 2, time: "09:15 AM", date: "Today", ticker: "FED-HOLD", action: "BUY YES", count: 50, price: 71, pnl: null, status: "filled" },
  { id: 3, time: "04:22 PM", date: "Yesterday", ticker: "CPI-3.5", action: "SOLD", count: 40, price: 100, pnl: 45, status: "filled" },
  { id: 4, time: "02:15 PM", date: "Yesterday", ticker: "BTC-50K", action: "BUY YES", count: 25, price: 45, pnl: null, status: "filled" },
  { id: 5, time: "11:30 AM", date: "Jan 3", ticker: "RAIN-LA", action: "BUY NO", count: 75, price: 30, pnl: null, status: "filled" },
  { id: 6, time: "09:00 AM", date: "Jan 3", ticker: "TEMP-NYC-90", action: "BUY YES", count: 25, price: 36, pnl: null, status: "filled" },
  { id: 7, time: "03:45 PM", date: "Jan 2", ticker: "UNRATE-4.5", action: "SOLD", count: 50, price: 85, pnl: 28, status: "filled" },
  { id: 8, time: "01:20 PM", date: "Jan 2", ticker: "FED-HOLD", action: "BUY YES", count: 50, price: 69, pnl: null, status: "filled" },
];

export default function Trades() {
  const totalTrades = trades.length;
  const totalPnl = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const buyTrades = trades.filter(t => t.action.includes("BUY")).length;
  const sellTrades = trades.filter(t => t.action.includes("SOLD") || t.action.includes("SELL")).length;

  const getActionBadge = (action: string) => {
    if (action.includes("BUY")) {
      return <Badge variant="buy">{action}</Badge>;
    }
    return <Badge variant="sell">{action}</Badge>;
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            <span className="gradient-text">Trade History</span>
          </h1>
          <p className="text-muted-foreground">Complete record of all your executed trades</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" size="sm" className="gap-2">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <History className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Total Trades</span>
          </div>
          <div className="text-3xl font-bold font-mono">{totalTrades}</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Buy Orders</span>
          </div>
          <div className="text-3xl font-bold font-mono text-success">{buyTrades}</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <ArrowDownRight className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">Sell Orders</span>
          </div>
          <div className="text-3xl font-bold font-mono text-destructive">{sellTrades}</div>
        </div>
        <div className="stat-card">
          <span className="text-sm text-muted-foreground">Realized P&L</span>
          <div className={cn(
            "text-3xl font-bold font-mono mt-2",
            totalPnl >= 0 ? "text-success" : "text-destructive"
          )}>
            +${totalPnl.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Trades Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">All Trades</h3>
          </div>
          <span className="text-sm text-muted-foreground">{trades.length} transactions</span>
        </div>
        
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30 bg-secondary/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Date/Time</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Ticker</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Action</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Quantity</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Price</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Total</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">P&L</th>
                <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {trades.map((trade) => (
                <tr key={trade.id} className="table-row-hover">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium">{trade.date}</div>
                    <div className="text-xs text-muted-foreground">{trade.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold">{trade.ticker}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getActionBadge(trade.action)}
                  </td>
                  <td className="px-6 py-4 text-right font-mono">{trade.count}</td>
                  <td className="px-6 py-4 text-right font-mono">{trade.price}¢</td>
                  <td className="px-6 py-4 text-right font-mono">
                    ${((trade.count * trade.price) / 100).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {trade.pnl !== null ? (
                      <span className={cn(
                        "font-mono font-semibold",
                        trade.pnl >= 0 ? "text-success" : "text-destructive"
                      )}>
                        {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant="success" className="text-xs">
                      {trade.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
