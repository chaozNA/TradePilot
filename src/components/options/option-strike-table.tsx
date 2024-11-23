import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OptionStrikeRow } from "./option-strike-row";
import { GroupedOptions } from "./option-types";
import OptionQuoteDto from "@/lib/entity/OptionQuoteDto";

interface OptionStrikeTableProps {
  groupedByStrike: GroupedOptions;
  onOptionClick: (option: OptionQuoteDto) => void;
}

export const OptionStrikeTable: FC<OptionStrikeTableProps> = ({
  groupedByStrike,
  onOptionClick,
}) => {
  const strikePrices = Object.keys(groupedByStrike)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Call Bid</TableHead>
          <TableHead className="text-left">Call Ask</TableHead>
          <TableHead className="text-center">Last</TableHead>
          <TableHead className="text-center">Volume</TableHead>
          <TableHead className="text-center">Strike</TableHead>
          <TableHead className="text-center">Volume</TableHead>
          <TableHead className="text-right">Put Bid</TableHead>
          <TableHead className="text-right">Put Ask</TableHead>
          <TableHead className="text-right">Last</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {strikePrices.map((strikePrice) => (
          <OptionStrikeRow
            key={strikePrice}
            strikePrice={strikePrice}
            options={groupedByStrike[strikePrice]}
            onOptionClick={onOptionClick}
          />
        ))}
      </TableBody>
    </Table>
  );
};
