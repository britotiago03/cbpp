'use client';

import { useState, useEffect } from 'react';
import CurrencyInput from '@/components/features/calculator/currency-input';
import ResultsDisplay from '@/components/features/calculator/results-display';
import { useCalculator } from '@/hooks/useCalculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchCountryCurrencies } from '@/lib/api/countries';

export default function Home() {
    const [amount, setAmount] = useState<string>('');
    const [currencySymbols, setCurrencySymbols] = useState<Map<string, string>>(new Map()); // State for currency symbols

    const {
        selectedCurrency,
        setSelectedCurrency,
        isLoading,
        isCalculating,
        error,
        results,
        calculatePurchasingPower
    } = useCalculator();

    const handleCalculate = async () => {
        if (!amount) return;

        try {
            await calculatePurchasingPower(parseFloat(amount));
        } catch (err) {
            console.error('Calculation failed:', err);
        }
    };

    // Fetch currency symbols on mount
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const symbols = await fetchCountryCurrencies();
                setCurrencySymbols(symbols);
            } catch (err) {
                console.error('Failed to fetch currency symbols:', err);
            }
        };

        fetchSymbols();
    }, []);

    // Show loading state while initial data is being fetched
    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    // Get error message
    const getErrorMessage = (error: unknown): string => {
        if (error instanceof Error) {
            return error.message;
        }
        if (error && typeof error === 'object' && 'message' in error) {
            return String(error.message);
        }
        return 'An error occurred';
    };

    // Show error state if any API calls failed
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-500">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{getErrorMessage(error)}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <main className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <CurrencyInput
                    amount={amount}
                    currency={selectedCurrency}
                    currencies={[
                        { value: 'USD', label: 'US Dollar (USD)' },
                        { value: 'EUR', label: 'Euro (EUR)' },
                        { value: 'GBP', label: 'British Pound (GBP)' },
                        { value: 'JPY', label: 'Japanese Yen (JPY)' },
                        { value: 'CNY', label: 'Chinese Yuan (CNY)' },
                        { value: 'NOK', label: 'Norwegian Krone (NOK)' },
                        { value: 'VND', label: 'Vietnamese Dong (VND)' },
                        { value: 'CAD', label: 'Canadian Dollar (CAD)' },
                        { value: 'BRL', label: 'Brazilian Real (BRL)' },
                    ]}
                    onAmountChange={setAmount}
                    onCurrencyChange={setSelectedCurrency}
                    onCalculate={handleCalculate}
                    isLoading={isCalculating}
                    error={error ? getErrorMessage(error) : undefined}
                />

                {results.length > 0 && (
                    <div className="mt-8">
                        <ResultsDisplay
                            results={results}
                            baseAmount={parseFloat(amount)}
                            baseCurrency={selectedCurrency}
                            currencySymbols={currencySymbols} // Pass currency symbols here
                        />
                    </div>
                )}
            </div>
        </main>
    );
}
