import { useState, useCallback } from 'react';
import { CurrencyOption } from '@/types/calculator';

interface UseCurrencyInputProps {
    onSubmit: (amount: number, currency: string) => void;
}

interface UseCurrencyInputReturn {
    amount: string;
    currency: string;
    error: string | undefined;
    isLoading: boolean;
    setAmount: (value: string) => void;
    setCurrency: (value: string) => void;
    handleCalculate: () => void;
}

export const useCurrencyInput = ({ onSubmit }: UseCurrencyInputProps): UseCurrencyInputReturn => {
    const [amount, setAmount] = useState<string>('');
    const [currency, setCurrency] = useState<string>('USD');
    const [error, setError] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const handleCalculate = useCallback(async () => {
        try {
            setError(undefined);
            setIsLoading(true);

            const numericAmount = parseFloat(amount);
            if (isNaN(numericAmount) || numericAmount <= 0) {
                throw new Error('Please enter a valid amount');
            }

            await onSubmit(numericAmount, currency);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }, [amount, currency, onSubmit]);

    return {
        amount,
        currency,
        error,
        isLoading,
        setAmount,
        setCurrency,
        handleCalculate
    };
};

// Export common currency options
export const COMMON_CURRENCIES: CurrencyOption[] = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'CNY', label: 'Chinese Yuan (CNY)' },
    { value: 'AUD', label: 'Australian Dollar (AUD)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'HKD', label: 'Hong Kong Dollar (HKD)' },
    { value: 'NZD', label: 'New Zealand Dollar (NZD)' }
];