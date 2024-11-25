import {
  AlpacaOptionQuote,
  AlpacaQuote,
} from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";
import AlpacaClient from "../AlpacaClient";
import logger from "@/lib/utils/logger";

export default async function getLatestQuote(
  ticker: string,
): Promise<AlpacaQuote> {
  const alpacaClient = AlpacaClient.getInstance();

  try {
    const quote = await alpacaClient.getLatestQuote(ticker);
    console.log(`Quote: ${quote}`);
    return quote;
  } catch (error) {
    logger.error(`Error fetching quote for ${ticker}:`, error);
    throw error;
  }
}

export async function getLatestOptionQuote(
  ticker: string,
): Promise<AlpacaOptionQuote> {
  const alpacaClient = AlpacaClient.getInstance();

  try {
    const quote = await alpacaClient.getOptionLatestQuotes([ticker]);
    console.log(`Quote: ${quote}`);
    const optionQuote = quote.get(ticker);
    if (!optionQuote) {
      throw new Error(`No quote found for ${ticker}`);
    }
    return optionQuote;
  } catch (error) {
    logger.error(`Error fetching quote for ${ticker}:`, error);
    throw error;
  }
}
