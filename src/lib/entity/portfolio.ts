export interface Portfolio {
    equity: number;
    buyingPower: number;
    dayPnL: number;
    totalPnL: number;
}

export interface Position {
    symbol: string;
    qty: number;
    avgEntryPrice: number;
    currentPrice: number;
    marketValue: number;
    unrealizedPnL: number;
    unrealizedPnLPercentage: number;
}

export interface Activity {
    id: string;
    type: 'BUY' | 'SELL';
    symbol: string;
    qty: number;
    price: number;
    total: number;
    timestamp: string;
}