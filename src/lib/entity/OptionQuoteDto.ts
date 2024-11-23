import { AlpacaOptionSnapshot } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";

type OptionType = "CALL" | "PUT";

interface ParsedOptionSymbol {
  underlyingSymbol: string;
  expirationDate: Date;
  type: OptionType;
  strikePrice: number;
}

class OptionQuoteDto {
  symbol!: string;
  underlyingSymbol!: string;
  expirationDate!: Date;
  type!: OptionType;
  strikePrice!: number;
  askPrice!: number;
  bidPrice!: number;
  timestamp!: Date;

  private constructor(data: {
    symbol: string;
    underlyingSymbol: string;
    expirationDate: Date;
    type: OptionType;
    strikePrice: number;
    askPrice: number;
    bidPrice: number;
    timestamp: Date;
  }) {
    Object.assign(this, data);
  }

  private static parseSymbol(symbol: string): ParsedOptionSymbol {
    /**
     * Parses an option symbol in the OSI (Options Symbology Initiative) format:
     * Underlying (1-6 chars), Expiration (YYMMDD), Option Type ('C' or 'P'), Strike Price (8 digits)
     * Example: TSLA230915C00400000
     */
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

  static fromSnapshot(snapshot: AlpacaOptionSnapshot): OptionQuoteDto {
    const parsed = OptionQuoteDto.parseSymbol(snapshot.Symbol);

    const latestQuote = snapshot.LatestQuote;
    if (
      latestQuote.AskPrice === undefined ||
      latestQuote.BidPrice === undefined ||
      latestQuote.Timestamp === undefined
    ) {
      throw new Error("Incomplete quote data in AlpacaOptionSnapshot");
    }

    const data = {
      symbol: snapshot.Symbol,
      underlyingSymbol: parsed.underlyingSymbol,
      expirationDate: parsed.expirationDate,
      type: parsed.type,
      strikePrice: parsed.strikePrice,
      askPrice: latestQuote.AskPrice,
      bidPrice: latestQuote.BidPrice,
      timestamp: new Date(latestQuote.Timestamp),
    };

    return new OptionQuoteDto(data);
  }
}

export default OptionQuoteDto;
