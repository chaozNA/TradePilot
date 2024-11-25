import { LiveQuoteService } from "@/lib/services/LiveQuoteService";
import { QuoteCallback, StreamData } from "@/lib/types/alpaca";
import { logger } from "@/lib/utils/logger";

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.trim();

  if (!symbol) {
    return new Response("Symbol is required", { status: 400 });
  }

  const quoteService = new LiveQuoteService();

  const stream = new ReadableStream({
    start(controller) {
      const callback: QuoteCallback = (data: StreamData) => {
        try {
          controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
        } catch (error) {
          logger.error("Stream error:", error);
          controller.error(error);
        }
      };

      quoteService.connect(symbol, callback);
    },
    cancel() {
      quoteService.disconnect();
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
