import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';
import { IMFCountriesResponse, PPPRates } from '@/types/imf';
import { ExchangeRateResponse } from '@/types/exchange';
import { PurchasingPowerResult } from '@/types/calculator';

// Fetch IMF Countries
export function useIMFCountries(): UseQueryResult<IMFCountriesResponse> {
    return useQuery({
        queryKey: ['imfCountries'],
        queryFn: async () => {
            const response = await fetch('/api/imf/countries');
            if (!response.ok) {
                throw new Error('Failed to fetch IMF countries');
            }
            return response.json();
        },
    });
}

// Fetch PPP Rates
export function usePPPRates(): UseQueryResult<PPPRates> {
    return useQuery({
        queryKey: ['pppRates'],
        queryFn: async () => {
            const response = await fetch('/api/imf/ppp-rates');
            if (!response.ok) {
                throw new Error('Failed to fetch PPP rates');
            }
            return response.json();
        },
    });
}

// Fetch Exchange Rates
export function useExchangeRates(currency: string): UseQueryResult<ExchangeRateResponse> {
    return useQuery({
        queryKey: ['exchangeRates', currency],
        queryFn: async () => {
            const response = await fetch(`/api/exchange-rates?base=${currency}`);
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rates');
            }
            return response.json();
        },
        enabled: Boolean(currency), // Only fetch when currency is provided
    });
}

// Calculate Purchasing Power
interface CalculateRequest {
    amount: number;
    currency: string;
}

export function useCalculatePurchasingPower(): UseMutationResult<
    PurchasingPowerResult[],
    Error,
    CalculateRequest
> {
    return useMutation({
        mutationFn: async ({ amount, currency }: CalculateRequest) => {
            const response = await fetch('/api/purchasing-power', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, currency }),
            });

            if (!response.ok) {
                throw new Error('Failed to calculate purchasing power');
            }

            return response.json();
        },
    });
}