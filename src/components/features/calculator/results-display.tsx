import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PurchasingPowerResult } from '@/types/calculator';

interface ResultsDisplayProps {
    results: PurchasingPowerResult[];
    baseAmount: number;
    baseCurrency: string;
    currencySymbols: Map<string, string>; // Add currency symbols map
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
                                                           results,
                                                           baseAmount,
                                                           baseCurrency,
                                                           currencySymbols,
                                                       }) => {
    const [displayLimit, setDisplayLimit] = useState(10);

    // Define calculatePercentage function
    const calculatePercentage = (value: number) => {
        const baseValue = results.find((r) => r.countryCode === 'USA')?.purchasingPower || 1; // Default to 1
        const percentage = ((value - baseValue) / baseValue) * 100;
        return percentage.toFixed(1); // One decimal place
    };

    // Sort results by purchasing power and take top N
    const topResults = results
        .sort((a, b) => b.purchasingPower - a.purchasingPower)
        .slice(0, displayLimit);

    // Format currency for display
    const formatCurrency = (value: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    // Prepare data for chart
    const chartData = results.map((result) => ({
        country: result.countryName,
        purchasingPower: result.purchasingPower,
        localAmount: result.localCurrencyAmount,
    }));

    return (
        <div className="space-y-6">
            {/* Summary Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Purchasing Power Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600">
                        Comparing what {formatCurrency(baseAmount, baseCurrency)} can buy in
                        different countries
                    </p>
                </CardContent>
            </Card>

            {/* Chart Card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="h-96 overflow-x-auto">
                        <ResponsiveContainer width={chartData.length * 60} height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="country"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                    interval={0}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis
                                    label={{
                                        value: 'Purchasing Power (USD)',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -20,
                                    }}
                                />
                                <Tooltip
                                    formatter={(value: number) => [
                                        formatCurrency(value, baseCurrency),
                                    ]}
                                    labelStyle={{ color: 'black' }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="purchasingPower"
                                    fill="#4f46e5"
                                    name="Purchasing Power"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Table Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Detailed Results</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Country</th>
                                <th className="text-right p-2">Purchasing Power</th>
                                <th className="text-right p-2">Difference</th>
                                <th className="text-right p-2">Local Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {topResults.map((result, index) => (
                                <tr
                                    key={result.countryCode}
                                    className={index % 2 === 0 ? 'bg-gray-50' : ''}
                                >
                                    <td className="p-2">{result.countryName}</td>
                                    <td className="text-right p-2">
                                        {formatCurrency(result.purchasingPower, 'USD')}
                                    </td>
                                    <td className="text-right p-2">
                                        {calculatePercentage(result.purchasingPower)}%
                                    </td>
                                    <td className="text-right p-2">
                                        {formatCurrency(
                                            result.localCurrencyAmount,
                                            currencySymbols.get(result.countryCode) || 'USD'
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Show More/Less Button */}
                    {results.length > 10 && (
                        <button
                            onClick={() =>
                                setDisplayLimit((prev) => (prev === 10 ? results.length : 10))
                            }
                            className="mt-4 text-blue-600 hover:text-blue-800"
                        >
                            {displayLimit === 10 ? 'Show More' : 'Show Less'}
                        </button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ResultsDisplay;
