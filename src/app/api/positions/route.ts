import { NextResponse } from 'next/server';
import { Position } from '@/lib/entity/portfolio';

export async function GET() {
    const dummyPositions: Position[] = [
        {
            symbol: 'AAPL',
            qty: 100,
            avgEntryPrice: 150.25,
            currentPrice: 175.50,
            marketValue: 17550.00,
            unrealizedPnL: 2525.00,
            unrealizedPnLPercentage: 16.81
        },
        {
            symbol: 'MSFT',
            qty: 50,
            avgEntryPrice: 280.00,
            currentPrice: 310.75,
            marketValue: 15537.50,
            unrealizedPnL: 1537.50,
            unrealizedPnLPercentage: 5.49
        },
        {
            symbol: 'GOOGL',
            qty: 30,
            avgEntryPrice: 2750.00,
            currentPrice: 2850.25,
            marketValue: 85507.50,
            unrealizedPnL: 3007.50,
            unrealizedPnLPercentage: 3.65
        },
        {
            symbol: 'TSLA',
            qty: 45,
            avgEntryPrice: 900.50,
            currentPrice: 875.25,
            marketValue: 39386.25,
            unrealizedPnL: -1136.25,
            unrealizedPnLPercentage: -2.80
        }
    ];

    return NextResponse.json(dummyPositions);
}