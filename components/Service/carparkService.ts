const BASE_URL = 'http://10.0.2.2:8083/api/external'; // where my API server is hosted on

/**
 * Fetches the available parking lots for a specific carpark from backend localserver.
 * 
 * This function makes a GET request to the backend API to retrieve the current 
 * availability of parking lots for the given carpark ID. If successful, it returns
 * the availability data; if there is an error, it logs the error and returns `undefined`.
 *
 * @param {string} carparkId - The unique ID of the carpark for which availability is requested.
 * @returns {Promise<any>} - A promise that resolves with the available parking lots data, 
 *                            or logs an error if the request fails.
 * 
 * @author Jamie
 * 
 */

export async function getAvailableCarparkLot(carparkId: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/carpark/available-lot?carpark_id=${encodeURIComponent(carparkId)}`);
        if (!response.ok) throw new Error('Failed to fetch carpark availability');
        
        const data = await response.json();
        // console.log('Available Carpark Lots:', data); debug
        return data;
    } catch (error) {
        console.error('Error fetching available carpark lots:', error);
    }
}

/**
 * Fetches the capacity of a specific carpark from backend local server.
 * 
 * This function makes a GET request to the backend API to retrieve the current 
 * capacity of the given carpark, including the total number of lots and the number of available lots.
 * If successful, it returns the capacity data; if there is an error, it logs the error and returns `null`.
 *
 * @param {string} carparkId - The unique ID of the carpark for which capacity is requested.
 * @returns {Promise<any>} - A promise that resolves with the carpark capacity data, 
 *                            or logs an error if the request fails.
 * 
 * @author Jamie
 *
 */

export async function getCarparkCapacity(carparkId: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/carpark/capacity?carpark_id=${encodeURIComponent(carparkId)}`);
        if (!response.ok) throw new Error('Failed to fetch carpark capacity');
        const data = await response.json();
        console.log('Carpark Capacity:', data);
        return data;
    } catch (error) {
        console.error('Error fetching carpark capacity:', error);
        return null;
    }
}