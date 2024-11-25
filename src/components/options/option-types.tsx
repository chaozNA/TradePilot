import { OptionQuote } from "@/lib/types/OptionQuote";

export interface GroupedOption {
  call: OptionQuote | null;
  put: OptionQuote | null;
}

export type GroupedOptions = Record<number, GroupedOption>;
export type DateGroupedOptions = Record<string, OptionQuote[]>;
