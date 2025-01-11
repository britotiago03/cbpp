import { NextResponse } from 'next/server';
import { fetchIMFCountries } from '@/lib/api/imf';
import NodeCache from 'node-cache';
import { CACHE_CONFIG } from '@/config/api-config';

const cache = new NodeCache();
const CACHE_KEY = 'imf_countries';

export async function GET() {
    try {
        // Check cache first
        const cachedData = cache.get(CACHE_KEY);
        if (cachedData) {
            return NextResponse.json(cachedData);
        }

        // Fetch fresh data
        const data = await fetchIMFCountries();

        // Cache the response
        cache.set(CACHE_KEY, data, CACHE_CONFIG.PPP_RATES_TTL);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching IMF countries:', error);
        return NextResponse.json(
            { error: 'Failed to fetch IMF countries' },
            { status: 500 }
        );
    }
}