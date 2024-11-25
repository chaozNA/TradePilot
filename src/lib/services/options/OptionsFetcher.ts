import AlpacaClient from "@/lib/AlpacaClient";
import Alpaca from "@alpacahq/alpaca-trade-api";
import { formatDate } from "@/lib/utils/DateTimeUtils";
import {
  createOptionQuoteFromSnapshot,
  OptionQuote,
} from "@/lib/types/OptionQuote";
import { logger } from "@/lib/utils/logger";

export class OptionsFetcherService {
  private alpacaClient: Alpaca = AlpacaClient.getInstance();

  public async fetchOptions({
    ticker,
  }: {
    ticker: string;
  }): Promise<OptionQuote[]> {
    try {
      const latestQuote = await this.getLatestStockPrice(ticker);
      console.log("Latest Quote: ", latestQuote);
      const strikePriceGte = latestQuote * 0.9;
      const strikePriceLte = latestQuote * 1.1;

      const currentDate = new Date();
      const currentDateString = formatDate(currentDate);

      const futureDate = new Date();
      futureDate.setDate(currentDate.getDate() + 90);
      const futureDateString = formatDate(futureDate);
      const config = {
        totalLimit: 500,
        strike_price_gte: strikePriceGte,
        strike_price_lte: strikePriceLte,
        expiration_date_gte: currentDateString,
        expiration_date_lte: futureDateString,
      };
      const optionsData = await this.alpacaClient.getOptionChain(
        ticker,
        config,
      );

      return optionsData
        .filter((snapshot) => snapshot !== null)
        .map((snapshot) => createOptionQuoteFromSnapshot(snapshot));
    } catch (error) {
      logger.error("Error fetching options:", error);
      throw new Error("Failed to fetch options");
    }
  }

  private async getLatestStockPrice(ticker: string): Promise<number> {
    const latestQuote = await this.alpacaClient.getLatestQuote(ticker);

    if (!latestQuote) {
      throw new Error(`Failed to fetch latest quote for ${ticker}`);
    }

    return latestQuote.AskPrice;
  }
}
