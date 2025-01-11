import axios from 'axios';

interface RESTCountry {
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        }
    };
    cca3: string;  // 3-letter country code
}

let countryCurrencyCache: Map<string, string> = new Map();

export async function fetchCountryCurrencies(): Promise<Map<string, string>> {
    try {
        if (countryCurrencyCache.size > 0) {
            return countryCurrencyCache;
        }

        const response = await axios.get<RESTCountry[]>('https://restcountries.com/v3.1/all?fields=currencies,cca3');
        const newCache = new Map<string, string>();

        response.data.forEach(country => {
            if (country.currencies) {
                // Get the first currency code for the country
                const currencyCode = Object.keys(country.currencies)[0];
                if (currencyCode) {
                    newCache.set(country.cca3, currencyCode);
                }
            }
        });

        countryCurrencyCache = newCache;
        return countryCurrencyCache;
    } catch (error) {
        console.error('Error fetching country currencies:', error);
        throw error;
    }
}