export interface IMFCountry {
    label: string;
}

export interface IMFCountriesResponse {
    countries: {
        [key: string]: IMFCountry;
    };
}

export interface PPPRates {
    values: {
        PPPEX: {
            [countryCode: string]: {
                [year: string]: number;
            };
        };
    };
}