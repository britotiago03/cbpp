import { IMFCountriesResponse, PPPRates } from '@/types/imf';
import { ExchangeRateResponse } from '@/types/exchange';
import { PurchasingPowerResult } from '@/types/calculator';
import { fetchCountryCurrencies } from '@/lib/api/countries';

export class PPPService {
    private static currencyCache: Map<string, string> | null = null;
    /**
     * Calculate purchasing power for all available countries
     */
    static async calculatePurchasingPower(
        amount: number,
        baseCurrency: string,
        exchangeRates: ExchangeRateResponse,
        pppRates: PPPRates,
        countries: IMFCountriesResponse
    ): Promise<PurchasingPowerResult[]> {
        const results: PurchasingPowerResult[] = [];
        const currentYear = new Date().getFullYear().toString();

        // Ensure currency mappings are loaded
        if (!this.currencyCache) {
            this.currencyCache = await fetchCountryCurrencies();
        }

        // For each country, calculate purchasing power
        for (const [countryCode, countryData] of Object.entries(countries.countries)) {
            try {
                // Skip if country has no name
                if (!countryData.label) continue;

                const pppRate = pppRates.values.PPPEX[countryCode]?.[currentYear];
                if (!pppRate) continue;

                // Get currency code for the country
                const targetCurrencyCode = this.currencyCache.get(countryCode) || this.getEurozoneCurrency(countryCode);
                if (!targetCurrencyCode) {
                    console.log(`No currency found for ${countryCode} (${countryData.label})`);
                    continue;
                }

                let amountInLocalCurrency: number;

                // If base currency is the same as target currency, skip conversion
                if (baseCurrency === targetCurrencyCode) {
                    amountInLocalCurrency = amount;
                } else {
                    // Convert amount to target currency using exchange rates
                    const exchangeRate = exchangeRates.rates[targetCurrencyCode];
                    if (!exchangeRate) {
                        console.log(`No exchange rate found for ${targetCurrencyCode}`);
                        continue;
                    }
                    amountInLocalCurrency = amount * exchangeRate;
                }

                // Calculate purchasing power
                const purchasingPowerUSD = amountInLocalCurrency / pppRate;

                results.push({
                    countryCode,
                    countryName: countryData.label,
                    purchasingPower: purchasingPowerUSD,
                    localCurrencyAmount: amountInLocalCurrency,
                    exchangeRate: exchangeRates.rates[targetCurrencyCode] || 1,
                    pppRate
                });
            } catch (error) {
                console.error(`Error processing ${countryCode}:`, error);
                continue;
            }
        }

        return results.sort((a, b) => b.purchasingPower - a.purchasingPower);
    }

    /**
     * Special handling for Eurozone countries since they share a currency
     */
    private static getEurozoneCurrency(countryCode: string): string | null {
        const eurozoneCountries = [
            'DEU', 'FRA', 'ITA', 'ESP', 'NLD', 'BEL', 'AUT', 'IRL', 'FIN',
            'PRT', 'GRC', 'SVK', 'SVN', 'LUX', 'LVA', 'EST', 'CYP', 'MLT'
        ];
        return eurozoneCountries.includes(countryCode) ? 'EUR' : null;
    }
}