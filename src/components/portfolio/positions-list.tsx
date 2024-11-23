import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatPercentage } from "@/lib/utils/PriceUtil"
import { Position } from "@/lib/entity/portfolio";
import { cn } from "@/lib/utils/utils";

interface PositionsListProps {
    positions: Position[];
}

export function PositionsList({ positions }: PositionsListProps) {
    if (positions.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No open positions
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Avg Price</TableHead>
                        <TableHead>Current Price</TableHead>
                        <TableHead>Market Value</TableHead>
                        <TableHead>P&L</TableHead>
                        <TableHead>P&L %</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {positions.map((position) => (
                        <TableRow key={position.symbol}>
                            <TableCell className="font-medium">{position.symbol}</TableCell>
                            <TableCell>{position.qty}</TableCell>
                            <TableCell>{formatCurrency(position.avgEntryPrice)}</TableCell>
                            <TableCell>{formatCurrency(position.currentPrice)}</TableCell>
                            <TableCell>{formatCurrency(position.marketValue)}</TableCell>
                            <TableCell className={cn(
                                position.unrealizedPnL >= 0 ? "text-green-500" : "text-red-500"
                            )}>
                                {formatCurrency(position.unrealizedPnL)}
                            </TableCell>
                            <TableCell className={cn(
                                position.unrealizedPnLPercentage >= 0 ? "text-green-500" : "text-red-500"
                            )}>
                                {formatPercentage(position.unrealizedPnLPercentage)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}