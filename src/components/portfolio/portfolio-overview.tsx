import { MetricCard } from "@/components/portfolio/metric-card";
import { Portfolio } from "@/lib/types/portfolio";
import { motion } from "framer-motion";
import { PiggyBank, Wallet, DollarSign, TrendingUp } from "lucide-react";

interface PortfolioOverviewProps {
  portfolio: Portfolio | null; // Accepts null
}

export function PortfolioOverview({ portfolio }: PortfolioOverviewProps) {
  if (!portfolio) return null;

  const { equity, buyingPower, dayPnL, totalPnL } = portfolio;

  const metrics = [
    {
      title: "Portfolio Value",
      value: `$${equity.toLocaleString()}`,
      subtitle: "Total Equity",
      icon: <PiggyBank className="h-5 w-5" />,
    },
    {
      title: "Buying Power",
      value: `$${buyingPower.toLocaleString()}`,
      subtitle: "Available to Trade",
      icon: <Wallet className="h-5 w-5" />,
    },
    {
      title: "Day P&L",
      value: dayPnL >= 0 ? `+$${dayPnL}` : `-$${Math.abs(dayPnL)}`,
      subtitle: "Today's Gain/Loss",
      trend: dayPnL >= 0 ? "up" : "down",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Total P&L",
      value: totalPnL >= 0 ? `+$${totalPnL}` : `-$${Math.abs(totalPnL)}`,
      subtitle: "Overall Gain/Loss",
      trend: totalPnL >= 0 ? "up" : "down",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];
  return (
    <motion.div
      className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {metrics.map((metric) => (
        <div key={metric.title} className="h-full">
          <MetricCard
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            trend={metric.trend as "up" | "down" | undefined}
            icon={metric.icon}
          />
        </div>
      ))}
    </motion.div>
  );
}
