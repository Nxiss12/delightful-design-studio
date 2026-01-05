import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, TrendingDown, Sparkles } from "lucide-react";

export interface Signal {
  id: string;
  name: string;
  type: "BUY" | "SELL";
  confidence: number;
  reasoning: string;
  active: boolean;
}

interface SignalsCardProps {
  signals: Signal[];
}

export function SignalsCard({ signals }: SignalsCardProps) {
  return (
    <div className="glass-card overflow-hidden animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Zap className="w-5 h-5 text-primary" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-pulse-glow" />
          </div>
          <h3 className="font-semibold">Active Signals</h3>
          <Badge variant="active" className="ml-auto">{signals.filter(s => s.active).length} Live</Badge>
        </div>
      </div>
      
      <div className="divide-y divide-border/20">
        {signals.map((signal) => (
          <div 
            key={signal.id}
            className={cn(
              "p-4 transition-colors duration-200 hover:bg-secondary/30",
              !signal.active && "opacity-60"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-3 h-3 rounded-full mt-1 flex-shrink-0",
                signal.active ? (signal.type === "BUY" ? "bg-success glow-success" : "bg-destructive glow-danger") : "bg-muted"
              )} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono font-semibold">{signal.name}</span>
                  <Badge variant={signal.type === "BUY" ? "buy" : "sell"} className="text-xs">
                    {signal.type === "BUY" ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {signal.type}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-sm text-muted-foreground">Confidence:</span>
                  <div className="flex-1 max-w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        signal.confidence >= 75 ? "bg-success" : signal.confidence >= 50 ? "bg-warning" : "bg-destructive"
                      )}
                      style={{ width: `${signal.confidence}%` }}
                    />
                  </div>
                  <span className={cn(
                    "text-sm font-mono font-medium",
                    signal.confidence >= 75 ? "text-success" : signal.confidence >= 50 ? "text-warning" : "text-destructive"
                  )}>
                    {signal.confidence}%
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {signal.reasoning}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
