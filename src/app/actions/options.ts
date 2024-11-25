"use server";

import { OptionsFetcherService } from "@/lib/services/options/OptionsFetcher";
import { OptionQuote } from "@/lib/types/OptionQuote";
import { logger } from "@/lib/utils/logger";

export type OptionsState = {
  options: OptionQuote[];
  error: string | null;
};

export async function getOptions(
  prevState: OptionsState | null,
  formData: FormData,
): Promise<OptionsState> {
  logger.info("getOptions", { prevState, formData });
  const ticker = (formData.get("ticker") as string)?.toUpperCase();

  if (!ticker) {
    return {
      options: [],
      error: "Ticker is required",
    };
  }

  try {
    const optionsFetcher = new OptionsFetcherService();
    const options = await optionsFetcher.fetchOptions({ ticker });

    if (!options.length) {
      return {
        options: [],
        error: "No options found",
      };
    }

    return {
      options,
      error: null,
    };
  } catch (error) {
    logger.error("Error fetching options:", error);
    return {
      options: [],
      error:
        error instanceof Error ? error.message : "Failed to fetch options data",
    };
  }
}
