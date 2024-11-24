import { AlpacaOptionClient } from "@alpacahq/alpaca-trade-api/dist/resources/datav2/option_websocket_v1beta1";
import AlpacaClient from "@/lib/AlpacaClient";
import { StreamData } from "@/lib/types/alpaca";

type QuoteCallback = (data: StreamData) => void;

export class LiveQuoteService {
  private static instance: LiveQuoteService | null = null;
  private socket: AlpacaOptionClient;
  private subscriptions: Map<string, Set<QuoteCallback>> = new Map();
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectDelay: number = 1000;

  private constructor() {
    this.socket = AlpacaClient.getInstance().option_stream;
    this.setupSocketHandlers();
  }

  public static getInstance(): LiveQuoteService {
    if (!LiveQuoteService.instance) {
      LiveQuoteService.instance = new LiveQuoteService();
    }
    return LiveQuoteService.instance;
  }

  private setupSocketHandlers(): void {
    this.socket.onConnect(() => {
      console.log("Connected to Alpaca options WebSocket");
      this.isConnected = true;
      this.reconnectAttempts = 0;

      // Resubscribe to all symbols
      for (const symbol of this.subscriptions.keys()) {
        this.socket.subscribeForQuotes([symbol]);
      }
    });

    this.socket.onDisconnect(() => {
      console.log("Disconnected from Alpaca options WebSocket");
      this.isConnected = false;
      this.attemptReconnect();
    });

    this.socket.onOptionQuote((quote: any) => {
      const symbol = quote.S;
      const callbacks = this.subscriptions.get(symbol);
      if (callbacks) {
        const streamData: StreamData = {
          type: "quote",
          data: quote,
          timestamp: new Date().toISOString(),
        };
        callbacks.forEach((callback) => callback(streamData));
      }
    });

    this.socket.onError((error: any) => {
      console.error("WebSocket error:", error);
      const errorData: StreamData = {
        type: "error",
        data: "WebSocket error occurred",
        timestamp: new Date().toISOString(),
      };
      // Notify all subscribers about the error
      this.subscriptions.forEach((callbacks) => {
        callbacks.forEach((callback) => callback(errorData));
      });
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
      console.log(`Attempting to reconnect in ${delay}ms`);
      setTimeout(() => {
        this.reconnectAttempts++;
        this.connect();
      }, delay);
    }
  }

  public subscribe(symbol: string, callback: QuoteCallback): void {
    console.log("Subscribing to symbol:", symbol);
    if (!this.subscriptions.has(symbol)) {
      this.subscriptions.set(symbol, new Set([callback]));
      if (!this.isConnected) {
        this.connect();
      } else {
        this.socket.subscribeForQuotes([symbol]);
      }
    } else {
      this.subscriptions.get(symbol)?.add(callback);
    }
  }

  public connect(): void {
    if (!this.isConnected) {
      console.log("Connecting to WebSocket");
      this.socket.connect();
    }
  }

  public unsubscribe(symbol: string, callback: QuoteCallback): void {
    console.log("Unsubscribing from symbol:", symbol);
    const callbacks = this.subscriptions.get(symbol);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.subscriptions.delete(symbol);
        if (this.isConnected) {
          this.socket.unsubscribeFromQuotes([symbol]);
        }
      }
    }
  }
}
