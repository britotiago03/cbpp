export interface ExchangeRateResponse {
    base: string;
    rates: {
        [currency: string]: number;
    };
    timestamp: number;
}