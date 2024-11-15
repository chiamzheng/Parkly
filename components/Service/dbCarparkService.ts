import Constants from 'expo-constants';
const URL = Constants.expoConfig?.extra?.SERVER_IP;
const BASE_URL = `${URL}/api/carpark`
//const BASE_URL= 'http://10.91.105.139:8083/api/carpark';
interface Coordinate {
    latitude: number;
    longitude: number;
}

export async function getNearbyCarparks(destination: Coordinate, radius: number): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/fetch_carparks_within_radius/${destination.latitude},${destination.longitude}/${radius}`);

        // Ensure the response is successful
        if (!response.ok) throw new Error('Failed to fetch carpark availability');
        
        const data = await response.json();
        console.log('Nearby Carparks:', data);
        return data;
    } catch (error) {
       // console.error('Error fetching Nearby Carparks:', error);
    }
}