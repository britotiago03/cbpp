import { NextResponse } from 'next/server';
import { fetchExchangeRates } from '@/lib/api/exchange';
import NodeCache from 'node-cache';
import { CACHE_CONFIG } from '@/config/api-config';

const cache = new NodeCache();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const baseCurrency = searchParams.get('base');

        if (!baseCurrency) {
            return NextResponse.json(
                { error: 'Base currency is required' },
                { status: 400 }
            );
        }

        const CACHE_KEY = `exchange_rates_${baseCurrency}`;

        // Check cache first
        const cachedData = cache.get(CACHE_KEY);
        if (cachedData) {
            return NextResponse.json(cachedData);
        }

        // Fetch fresh data
        const data = await fetchExchangeRates(baseCurrency);

        // Cache the response
        cache.set(CACHE_KEY, data, CACHE_CONFIG.EXCHANGE_RATES_TTL);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        return NextResponse.json(
            { error: 'Failed to fetch exchange rates' },
            { status: 500 }
        );
    }
}