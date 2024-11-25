import AlpacaClient from "../AlpacaClient";
import { AlpacaOptionClient } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/option_websocket_v1beta1";
import { AlpacaOptionQuote } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/entityv2";
import {
  QuoteCallback,
  StreamData,
  StreamError,
  StreamStatus,
} from "../types/alpaca";
import { logger } from "../utils/logger";

export class LiveQuoteService {
  private socket: AlpacaOptionClient;
  private symbol: string | null = null;
  private callback: QuoteCallback | null = null;
  private status: StreamStatus = {
    isConnected: false,
    error: null,
    lastUpdated: null,
  };
  private mockInterval: NodeJS.Timeout | null = null;
  private readonly isDevelopment = process.env.NODE_ENV === "development";

  constructor() {
    this.socket = AlpacaClient.getInstance().option_stream;
    this.setupWebSocket();
  }

  private setupWebSocket(): void {
    this.socket.onConnect(() => {
      console.log("WebSocket connected");
      this.updateStatus({ isConnected: true, error: null });
      this.subscribeToSymbol();
    });

    this.socket.onDisconnect(() => {
      console.log("WebSocket disconnected");
      this.updateStatus({ isConnected: false });
    });

    this.socket.onError((error: any) => {
      logger.error("WebSocket error:", error);
      this.updateStatus({
        error: typeof error === "string" ? error : "Connection error occurred",
      });
    });

    this.socket.onOptionQuote((quote: AlpacaOptionQuote) => {
      if (this.callback && quote.Symbol === this.symbol) {
        this.notifyQuote(quote);
      }
    });
  }

  private updateStatus(update: Partial<StreamStatus>): void {
    this.status = {
      ...this.status,
      ...update,
      lastUpdated: new Date().toISOString(),
    };
  }

  private notifyQuote(quote: AlpacaOptionQuote): void {
    if (!this.callback) return;

    const streamData: StreamData = {
      type: "quote",
      data: quote,
      timestamp: new Date().toISOString(),
    };

    this.callback(streamData);
  }

  private subscribeToSymbol(): void {
    if (!this.symbol || !this.status.isConnected) return;

    try {
      console.log("Subscribing to symbol:", this.symbol);
      this.socket.subscribeForQuotes([this.symbol]);

      if (this.isDevelopment) {
        this.startMockData();
      }
    } catch (error) {
      logger.error("Subscription error:", error);
      this.updateStatus({
        error: "Failed to subscribe to symbol",
      });
    }
  }

  private startMockData(): void {
    this.stopMockData();

    this.mockInterval = setInterval(() => {
      if (!this.callback || !this.symbol) return;

      const basePrice = 150 + (Math.random() - 0.5) * 2;
      const mockQuote: AlpacaOptionQuote = {
        Symbol: this.symbol,
        BidExchange: "MOCK",
        BidPrice: parseFloat(basePrice.toFixed(2)),
        BidSize: Math.floor(Math.random() * 100) * 10,
        AskExchange: "MOCK",
        AskPrice: parseFloat((basePrice + 0.05).toFixed(2)),
        AskSize: Math.floor(Math.random() * 100) * 10,
        Timestamp: new Date().toISOString(),
        Condition: "Regular",
      };

      this.notifyQuote(mockQuote);
    }, 1000);
  }

  private stopMockData(): void {
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
  }

  public connect(symbol: string, callback: QuoteCallback): void {
    this.cleanup();

    this.symbol = symbol;
    this.callback = callback;

    if (!this.status.isConnected) {
      this.socket.connect();
    } else {
      this.subscribeToSymbol();
    }
  }

  public disconnect(): void {
    this.cleanup();
  }

  private cleanup(): void {
    this.stopMockData();

    if (this.symbol && this.status.isConnected) {
      try {
        if (typeof this.socket.unsubscribeFromQuotes === "function") {
          this.socket.unsubscribeFromQuotes([this.symbol]);
        }
      } catch (error) {
        logger.error("Cleanup error:", error);
      }
    }

    if (this.status.isConnected) {
      this.socket.disconnect();
    }

    this.symbol = null;
    this.callback = null;
    this.updateStatus({
      isConnected: false,
      error: null,
    });
  }

  public getStatus(): StreamStatus {
    return { ...this.status };
  }
}
