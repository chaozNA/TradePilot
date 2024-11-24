import React, { FC } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { OptionStrikeTable } from "./option-strike-table";
import { GroupedOptions } from "./option-types";
import OptionQuoteDto from "@/lib/entity/OptionQuoteDto";

interface ExpirationDateGroupProps {
  expirationDate: string;
  isExpanded: boolean;
  onToggle: () => void;
  groupedByStrike: GroupedOptions;
  onOptionClick: (option: OptionQuoteDto) => void;
}

export const ExpirationDateGroup: FC<ExpirationDateGroupProps> = ({
  expirationDate,
  isExpanded,
  onToggle,
  groupedByStrike,
  onOptionClick,
}) => {
  return (
    <div className="rounded-lg border bg-card">
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-2 px-4 py-2 transition-colors hover:bg-muted/50"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <span className="text-sm font-medium">
          Expiration Date: {expirationDate}
        </span>
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all",
          isExpanded ? "max-h-[1000px]" : "max-h-0",
        )}
      >
        <div className="px-4 pb-4">
          <OptionStrikeTable
            groupedByStrike={groupedByStrike}
            onOptionClick={onOptionClick}
          />
        </div>
      </div>
    </div>
  );
};
