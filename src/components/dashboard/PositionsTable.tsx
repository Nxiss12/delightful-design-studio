import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface Position {
  ticker: string;
  side: "YES" | "NO";
  count: number;
  avgPrice: number;
  currentPrice: number;
  unrealizedPnl: number;
}

interface PositionsTableProps {
  positions: Position[];
  compact?: boolean;
}

export function PositionsTable({ positions, compact = false }: PositionsTableProps) {
  return (
    <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Open Positions</h3>
          <Badge variant="active" className="ml-auto">{positions.length} Active</Badge>
        </div>
      </div>
      
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Ticker</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Side</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Qty</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Avg Price</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Current</th>
              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {positions.map((position, index) => {
              const isPnlPositive = position.unrealizedPnl > 0;
              return (
                <tr 
                  key={position.ticker}
                  className="table-row-hover"
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono font-medium text-foreground">{position.ticker}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={position.side === "YES" ? "buy" : "sell"}>
                      {position.side}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-mono">{position.count}</td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground">{position.avgPrice}¢</td>
                  <td className="px-4 py-3 text-right font-mono">{position.currentPrice}¢</td>
                  <td className="px-4 py-3 text-right">
                    <div className={cn(
                      "flex items-center justify-end gap-1 font-mono font-medium",
                      isPnlPositive ? "text-success" : "text-destructive"
                    )}>
                      {isPnlPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      ${Math.abs(position.unrealizedPnl).toFixed(2)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
