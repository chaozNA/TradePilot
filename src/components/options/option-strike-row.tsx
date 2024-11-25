import React, { FC } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils/utils";
import { GroupedOption } from "./option-types";
import { OptionQuote } from "@/lib/types/OptionQuote";

interface OptionStrikeRowProps {
  strikePrice: number;
  options: GroupedOption;
  onOptionClick: (option: OptionQuote) => void;
}

export const OptionStrikeRow: FC<OptionStrikeRowProps> = ({
  strikePrice,
  options: { call, put },
  onOptionClick,
}) => {
  const formatPrice = (price: number | undefined): string => {
    return price ? price.toFixed(2) : "-";
  };

  return (
    <TableRow>
      <TableCell
        className={cn(
          "cursor-pointer transition-colors hover:bg-accent/50",
          call && "font-medium text-green-600",
        )}
        onClick={call ? () => onOptionClick(call) : undefined}
      >
        {formatPrice(call?.bidPrice)}
      </TableCell>
      <TableCell
        className={cn(
          "cursor-pointer transition-colors hover:bg-accent/50",
          call && "font-medium text-green-600",
        )}
        onClick={call ? () => onOptionClick(call) : undefined}
      >
        {formatPrice(call?.askPrice)}
      </TableCell>
      <TableCell className="text-center">
        {formatPrice(call?.lastPrice)}
      </TableCell>
      <TableCell className="text-center">
        {call?.impliedVolatility || "-"}
      </TableCell>
      <TableCell className="bg-muted/30 text-center font-medium">
        ${strikePrice.toFixed(2)}
      </TableCell>
      <TableCell className="text-center">
        {put?.impliedVolatility || "-"}
      </TableCell>
      <TableCell
        className={cn(
          "cursor-pointer text-right transition-colors hover:bg-accent/50",
          put && "font-medium text-red-600",
        )}
        onClick={put ? () => onOptionClick(put) : undefined}
      >
        {formatPrice(put?.bidPrice)}
      </TableCell>
      <TableCell
        className={cn(
          "cursor-pointer text-right transition-colors hover:bg-accent/50",
          put && "font-medium text-red-600",
        )}
        onClick={put ? () => onOptionClick(put) : undefined}
      >
        {formatPrice(put?.askPrice)}
      </TableCell>
      <TableCell className="text-right">
        {formatPrice(put?.lastPrice)}
      </TableCell>
    </TableRow>
  );
};
