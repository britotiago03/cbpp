import { useState } from 'react';
import {
    useIMFCountries,
    usePPPRates,
    useExchangeRates,
    useCalculatePurchasingPower
} from './useApi';
import { PurchasingPowerResult } from '@/types/calculator';

export function useCalculator() {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [results, setResults] = useState<PurchasingPowerResult[]>([]);

    // Fetch required data
    const {
        data: countries,
        isLoading: isLoadingCountries,
        error: countriesError
    } = useIMFCountries();

    const {
        data: pppRates,
        isLoading: isLoadingPPP,
        error: pppError
    } = usePPPRates();

    const {
        data: exchangeRates,
        isLoading: isLoadingExchange,
        error: exchangeError
    } = useExchangeRates(selectedCurrency);

    const purchasingPowerMutation = useCalculatePurchasingPower();

    // Check if all required data is loading
    const isLoading =
        isLoadingCountries ||
        isLoadingPPP ||
        isLoadingExchange;

    // Combine all errors
    const error = countriesError || pppError || exchangeError;

    // Calculate purchasing power
    const calculatePurchasingPower = async (amount: number) => {
        try {
            const result = await purchasingPowerMutation.mutateAsync({
                amount,
                currency: selectedCurrency
            });
            setResults(result);
        } catch (error) {
            console.error('Failed to calculate purchasing power:', error);
            throw error;
        }
    };

    return {
        // Data
        countries,
        pppRates,
        exchangeRates,
        results,

        // State
        selectedCurrency,
        setSelectedCurrency,

        // Loading states
        isLoading,
        isCalculating: purchasingPowerMutation.isPending,

        // Errors
        error: error || purchasingPowerMutation.error,

        // Actions
        calculatePurchasingPower,

        // Reset
        reset: () => setResults([])
    };
}