import { AlpacaOptionQuote } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";

export interface StreamData {
  type: "quote" | "error";
  data: AlpacaOptionQuote;
  timestamp: string;
}

export interface StreamError {
  message: string;
  code: string;
}

export type QuoteCallback = (data: StreamData) => void;
export type ErrorCallback = (error: StreamError) => void;

export interface StreamStatus {
  isConnected: boolean;
  error: string | null;
  lastUpdated: string | null;
}
