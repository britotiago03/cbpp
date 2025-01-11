import { NextResponse } from 'next/server';
import { PPPService } from '@/services/ppp-service';
import { fetchIMFCountries, fetchPPPRates } from '@/lib/api/imf';
import { fetchExchangeRates } from '@/lib/api/exchange';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, currency } = body;

        if (!amount || !currency) {
            return NextResponse.json(
                { error: 'Amount and currency are required' },
                { status: 400 }
            );
        }

        // Use the imported functions instead of internal API calls
        const [countries, exchangeRates, pppRates] = await Promise.all([
            fetchIMFCountries(),
            fetchExchangeRates(currency),
            fetchPPPRates()
        ]);

        // Calculate purchasing power for all countries
        const results = await PPPService.calculatePurchasingPower(
            amount,
            currency,
            exchangeRates,
            pppRates,
            countries
        );

        return NextResponse.json(results);
    } catch (error) {
        console.error('Error calculating purchasing power:', error);
        return NextResponse.json(
            { error: 'Failed to calculate purchasing power' },
            { status: 500 }
        );
    }
}