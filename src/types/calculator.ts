export interface PurchasingPowerResult {
    countryCode: string;
    countryName: string;
    purchasingPower: number;
    localCurrencyAmount: number;
    exchangeRate: number;
    pppRate: number;
}

export interface CalculatorInputs {
    amount: number;
    currency: string;
}

export interface CurrencyOption {
    value: string;
    label: string;
}