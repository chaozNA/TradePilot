import OptionQuoteDto from "@/lib/entity/OptionQuoteDto";

export interface GroupedOption {
  call: OptionQuoteDto | null;
  put: OptionQuoteDto | null;
}

export type GroupedOptions = Record<number, GroupedOption>;
export type DateGroupedOptions = Record<string, OptionQuoteDto[]>;
