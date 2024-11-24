import { NextRequest, NextResponse } from "next/server";
import getLatestQuote, {
  getLatestOptionQuote,
} from "@/lib/services/latest-quote";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const ticker = request.nextUrl.searchParams.get("ticker");

  if (!ticker) {
    return NextResponse.json(
      { error: "Ticker symbol is required" },
      { status: 400 },
    );
  }

  try {
    const quote =
      ticker.length > 6
        ? await getLatestOptionQuote(ticker)
        : await getLatestQuote(ticker);
    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
