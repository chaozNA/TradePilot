import { NextResponse } from "next/server";
import { Portfolio } from "@/lib/entity/portfolio";

export async function GET() {
  const dummyPortfolio: Portfolio = {
    equity: 125750.25,
    buyingPower: 25000.0,
    dayPnL: -1250.75,
    totalPnL: 25750.25,
  };

  return NextResponse.json(dummyPortfolio);
}
