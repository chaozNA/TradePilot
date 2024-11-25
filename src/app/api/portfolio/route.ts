import { NextResponse } from "next/server";

import {
  getAccount,
  getPositions,
} from "@/lib/services/account/AccountService";
import { Portfolio } from "@/lib/types/portfolio";

export async function GET() {
  const account = await getAccount();
  const positions = await getPositions();

  const dummyPortfolio: Portfolio = {
    equity: account.portfolio_value,
    buyingPower: account.buying_power,
    dayPnL: -1250.75,
    totalPnL: 25750.25,
  };

  return NextResponse.json(dummyPortfolio);
}
