import axios from 'axios';
import { API_CONFIG } from '@/config/api-config';
import { IMFCountriesResponse, PPPRates } from '@/types/imf';

export async function fetchIMFCountries(): Promise<IMFCountriesResponse> {
    const { data } = await axios.get(
        `${API_CONFIG.IMF.BASE_URL}${API_CONFIG.IMF.ENDPOINTS.COUNTRIES}`
    );
    return data;
}

export async function fetchPPPRates(): Promise<PPPRates> {
    const { data } = await axios.get(
        `${API_CONFIG.IMF.BASE_URL}${API_CONFIG.IMF.ENDPOINTS.PPP_RATES}`
    );
    return data;
}