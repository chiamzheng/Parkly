import Constants from 'expo-constants';
import computeLatLon from '../../scripts/computeLatLon';
import axios from 'axios';

const URL = Constants.expoConfig?.extra?.SERVER_IP; //use this if you are NOT using emulator
//const URL = 'http://10.0.2.2:8083';
//const URL = 'http://192.168.1.143:8083'; //chiam

export const addReview = async (carparkID, email, review) => {
    const publish = await axios.get(`${URL}/api/carpark/add_review/${carparkID}/${email}/${review}`);
    console.log(`Review successfully added to database: ${carparkID}, ${email}, ${review}`);
}

export const fetchReviews = async (carparkID) => {
    try {
        const reviews = await axios.get(`${URL}/api/carpark/fetch_reviews/${carparkID}`)
        return reviews.data;
    } catch (error) {
        console.error('Error fetching carpark reviews', error);
        throw error;
    }
}  

export const fetchCarparkAddress = async (carparkID) => {
    try {
        const response = await axios.get(`${URL}/api/carpark/fetch_address/${carparkID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carpark address:', error);
        throw error;
    }
};

// returns {morning_evening_motorcar_rate, evening_morning_motorcar_rate};
export const fetchRate = async (carparkID) => {
    try {
        const response = await axios.get(`${URL}/api/carpark/fetch_carpark_rates/${carparkID}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching carpark rates:', error);
        throw error;
    }
};

// gets array x and y,, convert to lat n long format for marker
export const fetchLocation = async (carparkID) => {
    try {
        const response = await axios.get(`${URL}/api/carpark/fetch_location/${carparkID}`);
        const [X, Y] = response.data;
        const { lat, lon } = computeLatLon(Y, X);

        return { latitude: lat, longitude: lon };
    } catch (error) {
        console.error('Error fetching carpark location:', error);
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
        //console.log('Nearby Carparks:', response.data);
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
