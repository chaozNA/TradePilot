import { NextRequest, NextResponse } from 'next/server';
import { OptionsFetcherService } from '@/lib/services/OptionsFetcher';

const optionsService = new OptionsFetcherService();

export async function GET(request: NextRequest) {
    const ticker = request.nextUrl.searchParams.get('ticker');

    if (!ticker) {
        return NextResponse.json({ error: 'Ticker symbol is required' }, { status: 400 });
    }

    try {
        const optionsData = await optionsService.fetchOptions(ticker);
        return NextResponse.json(optionsData, { status: 200 });
    } catch (error) {
        console.error('Error fetching options:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
