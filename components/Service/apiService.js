import Constants from 'expo-constants';
import axios from 'axios';

const URL = Constants.expoConfig?.extra?.SERVER_IP;

export const fetchCarparkAddress = async (carparkID) => {
    try {
        const response = await axios.get(`${URL}/api/carpark/fetch_address/${carparkID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carpark address:', error);
        throw error;
    }
};
