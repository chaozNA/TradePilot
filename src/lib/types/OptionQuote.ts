import {
  AlpacaOptionSnapshot,
  Greeks,
} from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";

export type OptionType = "CALL" | "PUT";

export type OptionQuote = {
  // Contract identifiers
  symbol: string;
  underlyingSymbol: string;
  expirationDate: string; // ISO date string
  type: OptionType;
  strikePrice: number;

  // Price data
  askPrice: number;
  bidPrice: number;
  lastPrice: number;
  timestamp: string; // ISO date string

  // Options-specific metrics
  impliedVolatility: number;
  greeks: Greeks;
};

type ParsedOptionSymbol = {
  underlyingSymbol: string;
  expirationDate: Date;
  type: OptionType;
  strikePrice: number;
};

function parseOptionSymbol(symbol: string): ParsedOptionSymbol {
  const symbolPattern = /^([A-Z]{1,6})(\d{2})(\d{2})(\d{2})([CP])(\d{8})$/;
  const match = symbol.match(symbolPattern);

  if (!match) {
    throw new Error(`Invalid option symbol format: ${symbol}`);
  }

  const [_, underlyingSymbol, year, month, day, typeChar, strikePriceStr] =
    match;
  const expirationDate = new Date(2000 + +year, +month - 1, +day);
  const type = typeChar === "C" ? "CALL" : "PUT";
  const strikePrice = parseInt(strikePriceStr, 10) / 1000;

  return {
    underlyingSymbol,
    expirationDate,
    type,
    strikePrice,
  };
}

export function createOptionQuoteFromSnapshot(
  snapshot: AlpacaOptionSnapshot,
): OptionQuote {
  const parsed = parseOptionSymbol(snapshot.Symbol);
  const latestQuote = snapshot.LatestQuote;
  const latestTrade = snapshot.LatestTrade;

  if (
    !latestQuote?.AskPrice ||
    !latestQuote?.BidPrice ||
    !latestQuote?.Timestamp
  ) {
    throw new Error("Incomplete quote data in AlpacaOptionSnapshot");
  }

  return {
    symbol: snapshot.Symbol,
    underlyingSymbol: parsed.underlyingSymbol,
    expirationDate: parsed.expirationDate.toISOString(),
    type: parsed.type,
    strikePrice: parsed.strikePrice,
    askPrice: latestQuote.AskPrice,
    bidPrice: latestQuote.BidPrice,
    lastPrice: latestTrade?.Price ?? 0,
    timestamp: new Date(latestQuote.Timestamp).toISOString(),
    impliedVolatility: snapshot.ImpliedVOlatility ?? 0,
    greeks: snapshot.Greeks ?? {
      Delta: 0,
      Gamma: 0,
      Theta: 0,
      Vega: 0,
      Rho: 0,
    },
  };
}
