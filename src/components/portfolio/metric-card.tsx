import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: "up" | "down";
  icon?: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon,
}: MetricCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="h-full"
    >
      <Card className="flex h-[120px] flex-col rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm transition-colors hover:bg-white/70 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-900/70">
        <CardHeader className="flex items-center space-y-0 p-0">
          <div className="flex items-center gap-2">
            {icon && (
              <div className="text-gray-500 dark:text-gray-400">{icon}</div>
            )}
            <div className="flex items-center gap-1.5">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {title}
              </CardTitle>
              {trend && (
                <div
                  className={`${trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
                >
                  {trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                </div>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-grow flex-col justify-center p-0 text-center">
          <div className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {value}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
