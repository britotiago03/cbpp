import React from 'react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CurrencyOption } from '@/types/calculator';

interface CurrencyInputProps {
    amount: string;
    currency: string;
    currencies: CurrencyOption[];
    onAmountChange: (value: string) => void;
    onCurrencyChange: (value: string) => void;
    onCalculate: () => void;
    isLoading: boolean;
    error?: string;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
                                                         amount,
                                                         currency,
                                                         currencies,
                                                         onAmountChange,
                                                         onCurrencyChange,
                                                         onCalculate,
                                                         isLoading,
                                                         error
                                                     }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCalculate();
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Calculate Global Purchasing Power</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="amount" className="text-sm font-medium">
                            Amount
                        </label>
                        <Input
                            id="amount"
                            type="number"
                            value={amount}
                            onChange={(e) => onAmountChange(e.target.value)}
                            placeholder="Enter amount"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="currency" className="text-sm font-medium">
                            Currency
                        </label>
                        <Select
                            id="currency"
                            value={currency}
                            onChange={(e) => onCurrencyChange(e.target.value)}
                            options={currencies}
                            required
                        />
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading || !amount || !currency}
                        className="w-full"
                    >
                        {isLoading ? 'Calculating...' : 'Calculate Purchasing Power'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CurrencyInput;