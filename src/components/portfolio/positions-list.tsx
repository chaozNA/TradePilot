import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Position } from "@/lib/types/portfolio";
import { formatCurrency, formatPercentage } from "@/lib/utils/utils";
import { cn } from "@/lib/utils/utils";

interface PositionsListProps {
  positions: Position[];
}

export function PositionsList({ positions }: PositionsListProps) {
  if (positions.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 dark:text-gray-400">
        No open positions
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-200 bg-white/50 shadow-sm backdrop-blur-sm transition-colors hover:bg-white/70 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-900/70">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-100/50 dark:border-gray-700 dark:bg-gray-800/50">
              <TableHead className="w-[100px] px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Symbol
              </TableHead>
              <TableHead className="w-[100px] px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Quantity
              </TableHead>
              <TableHead className="w-[120px] px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Avg Price
              </TableHead>
              <TableHead className="w-[120px] px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Current Price
              </TableHead>
              <TableHead className="w-[120px] px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                Market Value
              </TableHead>
              <TableHead className="w-[120px] px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                P&L
              </TableHead>
              <TableHead className="w-[100px] px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                P&L %
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positions.map((position) => (
              <TableRow
                key={position.symbol}
                className="border-b border-gray-200 transition-colors hover:bg-gray-50/50 dark:border-gray-700 dark:hover:bg-gray-800/50"
              >
                <TableCell className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                  {position.symbol}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {position.qty}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {formatCurrency(position.avgEntryPrice)}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {formatCurrency(position.currentPrice)}
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-700 dark:text-gray-300">
                  {formatCurrency(position.marketValue)}
                </TableCell>
                <TableCell
                  className={cn(
                    position.unrealizedPnL >= 0
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400",
                    "px-4 py-2 font-semibold",
                  )}
                >
                  {formatCurrency(position.unrealizedPnL)}
                </TableCell>
                <TableCell
                  className={cn(
                    position.unrealizedPnLPercentage >= 0
                      ? "text-green-500 dark:text-green-400"
                      : "text-red-500 dark:text-red-400",
                    "px-4 py-2 font-semibold",
                  )}
                >
                  {formatPercentage(position.unrealizedPnLPercentage)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
