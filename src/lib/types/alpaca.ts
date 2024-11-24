import {
  AlpacaOptionQuote,
  AlpacaOptionTrade,
} from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";

export type QuoteData = {
  type: "quote";
  data: AlpacaOptionQuote;
  timestamp: string;
};

export type TradeData = {
  type: "trade";
  data: AlpacaOptionTrade;
  timestamp: string;
};

export type ErrorData = {
  type: "error";
  data: string;
  timestamp: string;
};

export type StreamData = QuoteData | TradeData | ErrorData;

export interface QuoteCallback {
  (data: StreamData): void;
}
