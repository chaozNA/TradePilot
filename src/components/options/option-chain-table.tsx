import React, { FC, useState } from "react";
import OptionQuoteDto from "@/lib/entity/OptionQuoteDto";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { TradeModal } from "../trade/trade-modal";
import { DateGroupedOptions, GroupedOptions } from "./option-types";
import { ExpirationDateGroup } from "./expiration-date-group";

interface OptionChainTableProps {
  options: OptionQuoteDto[];
}

const OptionChainTable: FC<OptionChainTableProps> = ({ options }) => {
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const [selectedOption, setSelectedOption] = useState<
    OptionQuoteDto | undefined
  >();

  const groupedOptions: DateGroupedOptions = options.reduce((acc, option) => {
    const expirationDateString = format(
      new Date(option.expirationDate),
      "EEE MMM dd yyyy",
    );
    if (!acc[expirationDateString]) {
      acc[expirationDateString] = [];
    }
    acc[expirationDateString].push(option);
    return acc;
  }, {} as DateGroupedOptions);

  const sortedExpirationDates: string[] = Object.keys(groupedOptions)
    .map((date) => new Date(date))
    .sort((a, b) => a.getTime() - b.getTime())
    .map((date) => format(date, "EEE MMM dd yyyy"));

  const toggleDate = (date: string): void => {
    setExpandedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  if (sortedExpirationDates.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1200px]">
        <p className="py-8 text-center text-muted-foreground">
          No options available to display.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px]">
      <div className="space-y-2">
        {sortedExpirationDates.map((expirationDate) => {
          const dateOptions = groupedOptions[expirationDate];
          const groupedByStrike = dateOptions.reduce((acc, option) => {
            if (!acc[option.strikePrice]) {
              acc[option.strikePrice] = { call: null, put: null };
            }
            if (option.type === "CALL") {
              acc[option.strikePrice].call = option;
            } else {
              acc[option.strikePrice].put = option;
            }
            return acc;
          }, {} as GroupedOptions);

          return (
            <ExpirationDateGroup
              key={expirationDate}
              expirationDate={expirationDate}
              isExpanded={expandedDates.has(expirationDate)}
              onToggle={() => toggleDate(expirationDate)}
              groupedByStrike={groupedByStrike}
              onOptionClick={(option: OptionQuoteDto) =>
                setSelectedOption(option)
              }
            />
          );
        })}
      </div>

      {selectedOption && (
        <TradeModal
          option={selectedOption}
          isOpen={!!selectedOption}
          onClose={() => setSelectedOption(undefined)}
        />
      )}
    </div>
  );
};

export default OptionChainTable;
