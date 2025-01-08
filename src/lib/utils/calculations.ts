import { PurchasingPowerResult } from '@/types/calculator';

/**
 * Calculate statistics for purchasing power results
 */
export function calculateStatistics(results: PurchasingPowerResult[]) {
    if (!results.length) return null;

    const purchasingPowers = results.map(r => r.purchasingPower);

    const stats = {
        average: calculateAverage(purchasingPowers),
        median: calculateMedian(purchasingPowers),
        min: Math.min(...purchasingPowers),
        max: Math.max(...purchasingPowers),
        standardDeviation: calculateStandardDeviation(purchasingPowers)
    };

    return stats;
}

/**
 * Calculate average of an array of numbers
 */
function calculateAverage(numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

/**
 * Calculate median of an array of numbers
 */
function calculateMedian(numbers: number[]): number {
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }

    return sorted[middle];
}

/**
 * Calculate standard deviation of an array of numbers
 */
function calculateStandardDeviation(numbers: number[]): number {
    const avg = calculateAverage(numbers);
    const squareDiffs = numbers.map(value => {
        const diff = value - avg;
        return diff * diff;
    });

    const avgSquareDiff = calculateAverage(squareDiffs);
    return Math.sqrt(avgSquareDiff);
}

/**
 * Group results by continent/region
 */
export function groupResultsByRegion(results: PurchasingPowerResult[]): Record<string, PurchasingPowerResult[]> {
    // This is a simplified version. In a real app, you'd want to map countries to regions
    const regions: Record<string, PurchasingPowerResult[]> = {};

    results.forEach(result => {
        // This is where you'd determine the region based on country code
        // For now, we'll use a simple grouping
        const region = getRegionForCountry(result.countryCode);

        if (!regions[region]) {
            regions[region] = [];
        }

        regions[region].push(result);
    });

    return regions;
}

/**
 * Get region for country code (simplified version)
 */
function getRegionForCountry(countryCode: string): string {
    // This is a simplified version. In a real app, you'd want a complete mapping
    const regionMappings: Record<string, string> = {
        'US': 'North America',
        'CA': 'North America',
        'GB': 'Europe',
        'FR': 'Europe',
        'DE': 'Europe',
        'JP': 'Asia',
        'CN': 'Asia',
        'AU': 'Oceania',
        'NZ': 'Oceania',
        // Add more mappings as needed
    };

    return regionMappings[countryCode] || 'Other';
}