import {PurchasingPowerResult} from "@/types/calculator";

export interface APIResponse<T> {
    data?: T;
    error?: string;
    status: number;
}

export interface PurchasingPowerRequest {
    amount: number;
    currency: string;
}

// Add to existing calculator.ts types
export interface PurchasingPowerResponse {
    results: PurchasingPowerResult[];
    timestamp: number;
    baseCurrency: string;
    baseAmount: number;
}