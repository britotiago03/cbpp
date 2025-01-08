export const API_CONFIG = {
    IMF: {
        BASE_URL: 'https://www.imf.org/external/datamapper/api/v1',
        ENDPOINTS: {
            COUNTRIES: '/countries',
            PPP_RATES: '/PPPEX'
        }
    },
    EXCHANGE: {
        BASE_URL: 'https://v6.exchangerate-api.com/v6',
        ENDPOINTS: {
            LATEST: '/latest'
        }
    }
};

export const CACHE_CONFIG = {
    PPP_RATES_TTL: 24 * 60 * 60, // 24 hours in seconds
    EXCHANGE_RATES_TTL: 60 * 60,  // 1 hour in seconds
};