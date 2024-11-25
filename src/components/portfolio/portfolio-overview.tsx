import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils/utils";
import { Portfolio } from "@/lib/types/portfolio";

interface PortfolioOverviewProps {
  portfolio: Portfolio | null; // Update to accept null
}

export function PortfolioOverview({ portfolio }: PortfolioOverviewProps) {
  if (!portfolio) return null; // Add null check

  const { equity, buyingPower, dayPnL, totalPnL } = portfolio;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Portfolio Value"
        value={equity}
        subtitle="Total Equity"
      />
      <MetricCard
        title="Buying Power"
        value={buyingPower}
        subtitle="Available to Trade"
      />
      <MetricCard
        title="Day P&L"
        value={formatCurrency(dayPnL)}
        subtitle="Today's Gain/Loss"
        trend={dayPnL >= 0 ? "up" : "down"}
      />
      <MetricCard
        title="Total P&L"
        value={formatCurrency(totalPnL)}
        subtitle="Overall Gain/Loss"
        trend={totalPnL >= 0 ? "up" : "down"}
      />
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: "up" | "down";
}

function MetricCard({ title, value, subtitle, trend }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {trend &&
          (trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          ))}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
