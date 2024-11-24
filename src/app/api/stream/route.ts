import { LiveQuoteService } from "@/lib/services/LiveQuoteService";
import { StreamData } from "@/lib/types/alpaca";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const symbol = new URL(request.url).searchParams.get("symbol");
  if (!symbol) {
    return new Response("Symbol is required", { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const quoteService = new LiveQuoteService({
    quoteCallback: (data: StreamData) => {
      try {
        const message = `data: ${JSON.stringify(data)}\n\n`;
        writer
          .write(encoder.encode(message))
          .catch((error: Error) =>
            console.error("Error writing to stream:", error),
          );
      } catch (error) {
        console.error("Error processing quote:", error);
      }
    },
  });

  request.signal.addEventListener("abort", () => {
    console.log("Client disconnected, cleaning up...");
    quoteService.disconnect();
  });

  quoteService.connect();
  quoteService.subscribeToSymbol(symbol);

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
