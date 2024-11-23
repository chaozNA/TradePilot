import React, { FC, useState } from 'react';
import OptionQuoteDto from "@/lib/entity/OptionQuoteDto";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/utils';

interface OptionChainTableProps {
    options: OptionQuoteDto[];
}

const OptionChainTable: FC<OptionChainTableProps> = ({ options }) => {
    const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());

    // Group options by expiration date
    const groupedOptions = options.reduce((acc, option) => {
        const expirationDate = new Date(option.expirationDate);
        const expirationDateString = format(expirationDate, 'EEE MMM dd yyyy');
        if (!acc[expirationDateString]) {
            acc[expirationDateString] = [];
        }
        acc[expirationDateString].push(option);
        return acc;
    }, {} as Record<string, OptionQuoteDto[]>);

    // Sort expiration dates
    const sortedExpirationDates = Object.keys(groupedOptions)
        .map(date => new Date(date))
        .sort((a, b) => a.getTime() - b.getTime())
        .map(date => format(date, 'EEE MMM dd yyyy'));

    const toggleDate = (date: string) => {
        const newExpandedDates = new Set(expandedDates);
        if (expandedDates.has(date)) {
            newExpandedDates.delete(date);
        } else {
            newExpandedDates.add(date);
        }
        setExpandedDates(newExpandedDates);
    };

    if (sortedExpirationDates.length === 0) {
        return (
            <div className="w-full max-w-[600px] mx-auto">
                <p className="text-center text-muted-foreground py-8">
                    No options available to display.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[600px] mx-auto">
            <div className="space-y-2">
                {sortedExpirationDates.map((expirationDateString) => {
                    const dateOptions = groupedOptions[expirationDateString];
                    const isExpanded = expandedDates.has(expirationDateString);

                    // Group options by strike price
                    const groupedByStrike = dateOptions.reduce((acc, option) => {
                        if (!acc[option.strikePrice]) {
                            acc[option.strikePrice] = { call: null, put: null };
                        }
                        if (option.type === 'CALL') {
                            acc[option.strikePrice].call = option;
                        } else {
                            acc[option.strikePrice].put = option;
                        }
                        return acc;
                    }, {} as Record<number, { call: OptionQuoteDto | null; put: OptionQuoteDto | null; }>);

                    const strikePrices = Object.keys(groupedByStrike)
                        .map(Number)
                        .sort((a, b) => a - b);

                    return (
                        <div key={expirationDateString} className="border rounded-lg bg-card">
                            <button
                                onClick={() => toggleDate(expirationDateString)}
                                className="w-full px-4 py-2 flex items-center gap-2 hover:bg-muted/50 transition-colors"
                            >
                                {isExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                                <span className="text-sm font-medium">
                                    Expiration Date: {expirationDateString}
                                </span>
                            </button>

                            <div className={cn(
                                "overflow-hidden transition-all",
                                isExpanded ? "max-h-[1000px]" : "max-h-0"
                            )}>
                                <div className="px-4 pb-4">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[200px] text-left">Call Options</TableHead>
                                                <TableHead className="w-[100px] text-center">Strike</TableHead>
                                                <TableHead className="w-[200px] text-right">Put Options</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {strikePrices.map((strikePrice) => {
                                                const { call, put } = groupedByStrike[strikePrice];
                                                return (
                                                    <TableRow key={strikePrice}>
                                                        <TableCell className="w-[200px]">
                                                            {call && (
                                                                <div className="text-left">
                                                                    <div className="font-medium text-sm">
                                                                        {call.symbol}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {`B: $${call.bidPrice.toFixed(2)} A: $${call.askPrice?.toFixed(2)}`}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-center font-medium w-[100px]">
                                                            ${strikePrice.toFixed(2)}
                                                        </TableCell>
                                                        <TableCell className="w-[200px]">
                                                            {put && (
                                                                <div className="text-right">
                                                                    <div className="font-medium text-sm">
                                                                        {put.symbol}
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {`B: $${put.bidPrice?.toFixed(2)} A: $${put.askPrice?.toFixed(2)}`}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OptionChainTable;