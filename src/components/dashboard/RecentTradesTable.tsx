import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { History, ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface Trade {
  time: string;
  ticker: string;
  action: "BUY YES" | "BUY NO" | "SELL YES" | "SELL NO" | "SOLD";
  count: number;
  price: number;
  pnl?: number;
}

interface RecentTradesTableProps {
  trades: Trade[];
}

export function RecentTradesTable({ trades }: RecentTradesTableProps) {
  const getActionBadge = (action: Trade["action"]) => {
    if (action.includes("BUY")) {
      return <Badge variant="buy">{action}</Badge>;
    }
    return <Badge variant="sell">{action}</Badge>;
  };

  return (
    <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Recent Trades</h3>
        </div>
      </div>
      
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Time</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Ticker</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Action</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Qty</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Price</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {trades.map((trade, index) => (
              <tr 
                key={`${trade.ticker}-${trade.time}-${index}`}
                className="table-row-hover"
              >
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">{trade.time}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono font-medium">{trade.ticker}</span>
                </td>
                <td className="px-4 py-3">
                  {getActionBadge(trade.action)}
                </td>
                <td className="px-4 py-3 text-right font-mono">{trade.count}</td>
                <td className="px-4 py-3 text-right font-mono">{trade.price}¢</td>
                <td className="px-4 py-3 text-right">
                  {trade.pnl !== undefined ? (
                    <div className={cn(
                      "flex items-center justify-end gap-1 font-mono font-medium",
                      trade.pnl >= 0 ? "text-success" : "text-destructive"
                    )}>
                      {trade.pnl >= 0 ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      ${Math.abs(trade.pnl)}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
