import { NextResponse } from "next/server";
import { Activity } from "@/lib/types/portfolio";

export async function GET() {
  const dummyActivities: Activity[] = [
    {
      id: "1",
      type: "BUY",
      symbol: "AAPL",
      qty: 50,
      price: 175.5,
      total: 8775.0,
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
      id: "2",
      type: "SELL",
      symbol: "MSFT",
      qty: 25,
      price: 310.75,
      total: 7768.75,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    },
    {
      id: "3",
      type: "BUY",
      symbol: "GOOGL",
      qty: 10,
      price: 2850.25,
      total: 28502.5,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id: "4",
      type: "SELL",
      symbol: "TSLA",
      qty: 15,
      price: 875.25,
      total: 13128.75,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
  ];

  return NextResponse.json(dummyActivities);
}
