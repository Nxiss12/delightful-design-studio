import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  Brain, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const signals = [
  {
    id: "1",
    name: "BTC-50K",
    type: "BUY",
    confidence: 75,
    reasoning: "LLM bullish on crypto news. Market sentiment indicators showing positive momentum. Technical analysis suggests potential breakout above key resistance levels.",
    source: "AI Analysis",
    timestamp: "10 min ago",
    status: "active",
  },
  {
    id: "2",
    name: "RAIN-LA",
    type: "SELL",
    confidence: 82,
    reasoning: "Weather shows low precipitation probability. Historical data suggests dry conditions. Multiple weather models in agreement.",
    source: "Weather Model",
    timestamp: "25 min ago",
    status: "active",
  },
  {
    id: "3",
    name: "FED-HOLD",
    type: "BUY",
    confidence: 68,
    reasoning: "Economic indicators suggest Fed will maintain current rates. Inflation data coming in as expected. Market pricing aligns with hold scenario.",
    source: "Economic Analysis",
    timestamp: "1 hour ago",
    status: "active",
  },
  {
    id: "4",
    name: "TEMP-NYC-90",
    type: "BUY",
    confidence: 91,
    reasoning: "Multiple weather models predict temperature spike. Historical patterns support this prediction. High conviction trade.",
    source: "Weather Model",
    timestamp: "2 hours ago",
    status: "executed",
  },
  {
    id: "5",
    name: "UNRATE-4.5",
    type: "SELL",
    confidence: 45,
    reasoning: "Mixed signals from labor market indicators. Uncertainty remains high. Lower confidence due to conflicting data.",
    source: "Economic Analysis",
    timestamp: "3 hours ago",
    status: "expired",
  },
];

export default function Signals() {
  const activeSignals = signals.filter(s => s.status === "active").length;
  const executedSignals = signals.filter(s => s.status === "executed").length;
  const avgConfidence = Math.round(signals.reduce((sum, s) => sum + s.confidence, 0) / signals.length);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Zap className="w-4 h-4 text-primary" />;
      case "executed":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "expired":
        return <XCircle className="w-4 h-4 text-muted-foreground" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="active">Active</Badge>;
      case "executed":
        return <Badge variant="success">Executed</Badge>;
      case "expired":
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            <span className="gradient-text">Trading Signals</span>
          </h1>
          <p className="text-muted-foreground">AI-powered market signals and trade recommendations</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="glass" size="sm" className="gap-2">
            <Brain className="w-4 h-4" />
            Configure AI
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Active Signals</span>
          </div>
          <div className="text-3xl font-bold font-mono text-primary">{activeSignals}</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-sm text-muted-foreground">Executed Today</span>
          </div>
          <div className="text-3xl font-bold font-mono text-success">{executedSignals}</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-warning" />
            <span className="text-sm text-muted-foreground">Avg Confidence</span>
          </div>
          <div className="text-3xl font-bold font-mono">{avgConfidence}%</div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI Models</span>
          </div>
          <div className="text-3xl font-bold font-mono">3</div>
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {signals.map((signal) => (
          <div 
            key={signal.id}
            className={cn(
              "glass-card p-6 transition-all duration-300 hover:border-primary/30",
              signal.status !== "active" && "opacity-70"
            )}
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* Signal Indicator */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                signal.type === "BUY" ? "bg-success/10" : "bg-destructive/10"
              )}>
                {signal.type === "BUY" ? (
                  <TrendingUp className={cn("w-6 h-6", signal.type === "BUY" ? "text-success" : "text-destructive")} />
                ) : (
                  <TrendingDown className="w-6 h-6 text-destructive" />
                )}
              </div>

              {/* Signal Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xl font-bold">{signal.name}</span>
                  <Badge variant={signal.type === "BUY" ? "buy" : "sell"} className="text-sm">
                    {signal.type}
                  </Badge>
                  {getStatusBadge(signal.status)}
                </div>

                <p className="text-muted-foreground mb-4">{signal.reasoning}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  {/* Confidence Bar */}
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Confidence:</span>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          signal.confidence >= 75 ? "bg-success" : signal.confidence >= 50 ? "bg-warning" : "bg-destructive"
                        )}
                        style={{ width: `${signal.confidence}%` }}
                      />
                    </div>
                    <span className={cn(
                      "font-mono font-semibold",
                      signal.confidence >= 75 ? "text-success" : signal.confidence >= 50 ? "text-warning" : "text-destructive"
                    )}>
                      {signal.confidence}%
                    </span>
                  </div>

                  {/* Source */}
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{signal.source}</span>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{signal.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              {signal.status === "active" && (
                <div className="flex gap-2 lg:flex-col">
                  <Button variant="success" size="sm" className="gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Execute
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
