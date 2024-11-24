// src/app/api/stream/route.ts
import { LiveQuoteService } from "@/lib/services/LiveQuoteService";
import { QuoteCallback, StreamData } from "@/lib/types/alpaca";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol");

  if (!symbol) {
    return new Response("Symbol is required", { status: 400 });
  }

  const liveQuoteService = LiveQuoteService.getInstance();
  let callback: QuoteCallback;

  const stream = new ReadableStream({
    start(controller) {
      console.log("Starting stream for symbol:", symbol);

      // Define the callback function
      callback = (data: StreamData) => {
        try {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        } catch (error) {
          console.error("Error sending data:", error);
          controller.error(error);
        }
      };

      // Connect and subscribe to updates
      liveQuoteService.subscribe(symbol, callback);
    },
    cancel() {
      console.log("Stream cancelled for symbol:", symbol);
      if (callback) {
        liveQuoteService.unsubscribe(symbol, callback);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
