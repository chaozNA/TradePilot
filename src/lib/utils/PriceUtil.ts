
export function getMidPrice(a: number, b: number): number {
    const midPrice = (a + b) / 2;
    return parseFloat(midPrice.toFixed(2));
}

export function formatCurrency(num: number) {
    return num.toFixed(2);
}

export function formatPercentage(num: number) {
    return (num * 100).toFixed(2);
}