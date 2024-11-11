import Constants from 'expo-constants';
import axios from 'axios';

//const URL = Constants.expoConfig?.extra?.SERVER_IP;
const URL = 'http://10.0.2.2:8083';

export const fetchCarparkAddress = async (carparkID) => {
    try {
        const response = await axios.get(`${URL}/api/carpark/fetch_address/${carparkID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carpark address:', error);
        throw error;
    }
};

export const fetchCarparkFeatures = async (carparkID) => {
    try {
        const response1 = await axios.get(`${URL}/api/carpark/fetch_carpark_type/${carparkID}`);
        const response2 = await axios.get(`${URL}/api/carpark/fetch_parking_system_type/${carparkID}`);
        const response3 = await axios.get(`${URL}/api/carpark/fetch_night_parking/${carparkID}`);
        const response4 = await axios.get(`${URL}/api/carpark/fetch_carpark_basement/${carparkID}`);
        const response5 = await axios.get(`${URL}/api/carpark/fetch_gantry_height/${carparkID}`);
        const response6 = await axios.get(`${URL}/api/carpark/fetch_short_term_parking/${carparkID}`);
        const response7 = await axios.get(`${URL}/api/carpark/fetch_free_parking/${carparkID}`);

        return {
            carpark_type: response1.data,
            carpark_system: response2.data,
            carpark_night: response3.data,
            carpark_basement: response4.data,
            carpark_gantry: response5.data,
            carpark_short: response6.data,
            carpark_free: response7.data
          };
    } catch (error) {
        console.error('Error fetching carpark data', error);
        throw error;
    }
};

export const fetchNearbyCarparks = async (destination, radius) => {
    try {
        const response = await axios.get(`${URL}/api/carpark/fetch_carparks_within_radius/${destination.latitude},${destination.longitude}/${radius}`);
        console.log('Nearby Carparks:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching nearby carparks:', error);
        throw error;
    }
}; //should give array of nearby carparkIDs and ONLY the id, no coordinates

export const fetchAvailableLots = async (carparkID) => {
    try {
        const response = await axios.get(`${URL}/api/external/carpark/available-lot?carpark_id=${carparkID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carpark lots:', error);
        throw error;
    }
};

export const fetchCapacity = async (carparkID) => {
    try {
        const response = await axios.get(`${URL}/api/external/carpark/capacity?carpark_id=${carparkID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carpark capacity:', error);
        throw error;
    }
};