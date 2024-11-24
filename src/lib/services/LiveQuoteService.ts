import { AlpacaOptionClient } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/option_websocket_v1beta1";
import Alpaca from "@alpacahq/alpaca-trade-api";
import AlpacaClient from "../AlpacaClient";
import { QuoteCallback, StreamData } from "@/lib/types/alpaca";

export class LiveQuoteService {
  private socket: AlpacaOptionClient;
  private currentSymbol: string | null = null;
  private quoteCallback: QuoteCallback;
  private isConnected: boolean = false;

  constructor({ quoteCallback }: { quoteCallback: QuoteCallback }) {
    this.socket = AlpacaClient.getInstance().option_stream;
    this.quoteCallback = quoteCallback;
    this.setupSocketHandlers();
  }

  private setupSocketHandlers(): void {
    if (!this.socket) {
      throw new Error("WebSocket not initialized");
    }

    this.socket.onConnect(() => {
      console.log("Connected to WebSocket");
      this.isConnected = true;
      if (this.currentSymbol) {
        console.log("Subscribing to symbol:", this.currentSymbol);
        this.subscribeToSymbol(this.currentSymbol);
      } else {
        console.log("not subscribed");
      }
    });

    this.socket.onDisconnect(() => {
      console.log("Disconnected from WebSocket");
      this.isConnected = false;
    });

    this.socket.onOptionQuote((quote: any) => {
      console.log("Received quote:", quote);
      if (this.isConnected) {
        this.quoteCallback({
          type: "quote",
          data: quote,
          timestamp: new Date().toISOString(),
        });
      }
    });

    this.socket.onError((error: any) => {
      console.error("WebSocket error:", error);
    });
  }

  public connect(): void {
    if (!this.socket) {
      throw new Error("WebSocket not initialized");
    }
    this.socket.connect();
  }

  public disconnect(): void {
    if (this.socket && this.isConnected) {
      this.socket.disconnect();
      this.isConnected = false;
      this.currentSymbol = null;
    }
  }

  public subscribeToSymbol(symbol: string): void {
    this.currentSymbol = symbol;
    if (this.socket && this.isConnected) {
      this.socket.subscribeForQuotes([symbol]);
    }
  }
}
