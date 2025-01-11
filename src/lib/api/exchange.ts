import { ExchangeRateResponse } from '@/types/exchange';
import { API_CONFIG } from "@/config/api-config";
import axios from "axios";

interface ExchangeAPIResponse {
    result: string;
    documentation: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
    base_code: string;
    conversion_rates: {
        [key: string]: number;
    };
}

export async function fetchExchangeRates(baseCurrency: string): Promise<ExchangeRateResponse> {
    try {
        const apiKey = process.env.EXCHANGE_RATE_API_KEY;
        if (!apiKey) {
            throw new Error('Exchange rate API key is not configured');
        }

        const { data } = await axios.get<ExchangeAPIResponse>(
            `${API_CONFIG.EXCHANGE.BASE_URL}/${apiKey}${API_CONFIG.EXCHANGE.ENDPOINTS.LATEST}/${baseCurrency}`
        );

        // Transform API response to match our interface
        const response: ExchangeRateResponse = {
            base: data.base_code,
            rates: data.conversion_rates,
            timestamp: data.time_last_update_unix
        };

        // Debug log
        console.log('Exchange rates response:', response);

        return response;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw new Error(`Failed to fetch exchange rates: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}