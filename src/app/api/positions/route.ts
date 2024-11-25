import { NextResponse } from "next/server";
import { Position } from "@/lib/types/portfolio";

export async function GET() {
  const dummyPositions: Position[] = [
    {
      symbol: "AAPL",
      qty: 100,
      avgEntryPrice: 150.25,
      currentPrice: 175.5,
      marketValue: 17550.0,
      unrealizedPnL: 2525.0,
      unrealizedPnLPercentage: 16.81,
    },
    {
      symbol: "MSFT",
      qty: 50,
      avgEntryPrice: 280.0,
      currentPrice: 310.75,
      marketValue: 15537.5,
      unrealizedPnL: 1537.5,
      unrealizedPnLPercentage: 5.49,
    },
    {
      symbol: "GOOGL",
      qty: 30,
      avgEntryPrice: 2750.0,
      currentPrice: 2850.25,
      marketValue: 85507.5,
      unrealizedPnL: 3007.5,
      unrealizedPnLPercentage: 3.65,
    },
    {
      symbol: "TSLA",
      qty: 45,
      avgEntryPrice: 900.5,
      currentPrice: 875.25,
      marketValue: 39386.25,
      unrealizedPnL: -1136.25,
      unrealizedPnLPercentage: -2.8,
    },
  ];

  return NextResponse.json(dummyPositions);
}
