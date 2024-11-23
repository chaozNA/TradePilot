import AlpacaClient from "@/lib/AlpacaClient";
import Alpaca from "@alpacahq/alpaca-trade-api";
import OptionQuoteDto from "@/lib/entity/OptionQuoteDto";
import { AlpacaOptionSnapshot } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";
import { getMidPrice } from "@/lib/utils/PriceUtil";
import { formatDate } from "@/lib/utils/DateTimeUtils";

export class OptionsFetcherService {
  private alpacaClient: Alpaca = AlpacaClient.getInstance();

  public async fetchOptions(ticker: string): Promise<OptionQuoteDto[]> {
    try {
      await this.validateTicker(ticker);

      const currentDate = new Date();
      const currentDateString = formatDate(currentDate);

      const futureDate = new Date();
      futureDate.setDate(currentDate.getDate() + 21);
      const futureDateString = formatDate(futureDate);
      console.log("Current Date: ", currentDateString);
      console.log("Future Date: ", futureDateString);
      const config = {
        totalLimit: 25,
        strike_price_gte: 124,
        strike_price_lte: 125,
        expiration_date_gte: currentDateString,
        expiration_date_lte: futureDateString,
      };
      const optionsData: AlpacaOptionSnapshot[] =
        await this.alpacaClient.getOptionChain(ticker, config);

      return optionsData
        .filter((snapshot) => snapshot !== null)
        .map((snapshot) => OptionQuoteDto.fromSnapshot(snapshot));
    } catch (error) {
      console.error("Error fetching options:", error);
      throw new Error("Failed to fetch options");
    }
  }

  private async validateTicker(ticker: string): Promise<void> {
    try {
      console.log("Validating Ticker: ", ticker);
      const alpacaQuote = await this.alpacaClient.getLatestQuote(ticker);
      console.log("Alpaca Symbol: ", alpacaQuote.Symbol);
      console.log("Alpaca Quote: ", alpacaQuote);
      const midPrice = getMidPrice(alpacaQuote.AskPrice, alpacaQuote.BidPrice);
    } catch (error) {
      console.error(`Invalid ticker: ${ticker}`, error);
      throw new Error(`Ticker ${ticker} is invalid or does not exist.`);
    }
  }
}
