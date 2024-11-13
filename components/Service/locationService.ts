import Constants from 'expo-constants';
const URL = Constants.expoConfig?.extra?.SERVER_IP;
const BASE_URL = `${URL}/api/external` //use this if you are NOT using emulator

interface Coordinate {
    latitude: number;
    longitude: number;
}

/**
 * Fetches location suggestions based on the provided search query from backend local server.
 * 
 * This function makes a GET request to the backend API to retrieve a list of location 
 * suggestions based on the search query. If successful, it returns the suggestions data; 
 * if there is an error, it logs the error and returns `undefined`.
 *
 * @param {string} searchQuery - The search query used to fetch location suggestions.
 * @returns {Promise<any>} - A promise that resolves with the location suggestions data, 
 *                            or logs an error if the request fails.
 * 
 * @author Jamie
 * 
 */

export async function getLocationSuggestions(searchQuery: string): Promise<any> {
    try {
        console.log('Fetching location suggestions for:', searchQuery);
        const response = await fetch(`${BASE_URL}/location/suggestions?search=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to fetch location suggestions');

        const data = await response.json();
        console.log('Location Suggestions:', data);
        return data;
    } catch (error) {
        console.error('Error fetching location suggestions:', error);
    }
}

/**
 * Fetches route details between a start and an end coordinate from backend local server.
 * 
 * This function makes a GET request to the backend API to retrieve the route details 
 * (such as distance and estimated time) between the start and end coordinates. 
 * If successful, it returns the route details; if there is an error, it logs the error.
 *
 * @param {Coordinate} start - The starting coordinate (latitude and longitude).
 * @param {Coordinate} end - The ending coordinate (latitude and longitude).
 * @returns {Promise<any>} - A promise that resolves with the route details data, 
 *                            or logs an error if the request fails.
 * 
 * @author Jamie
 * 
 */

export async function getRouteDetails(start: Coordinate, end: Coordinate): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/location/route?startLat=${start.latitude}&startLng=${start.longitude}&endLat=${end.latitude}&endLng=${end.longitude}`);
        if (!response.ok) throw new Error('Failed to fetch route details');

        const data = await response.json();
        console.log('Route Details:', data);
        return data;
    } catch (error) {
        console.error('Error fetching route details:', error);
    }
}

/**
 * Fetches the polyline geometry for a route between a start and an end coordinate.
 * 
 * This function makes a GET request to the backend API to retrieve the polyline 
 * (a sequence of connected line segments) that represents the route between 
 * the start and end coordinates. If successful, it returns the polyline data; 
 * if there is an error, it logs the error.
 *
 * @param {Coordinate} start - The starting coordinate (latitude and longitude).
 * @param {Coordinate} end - The ending coordinate (latitude and longitude).
 * @returns {Promise<any>} - A promise that resolves with the polyline data for the route, 
 *                            or logs an error if the request fails.
 * 
 * @author Jamie
 * 
 */

export async function getRoutePolyline(start: Coordinate, end: Coordinate): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/location/route-polyline?startLat=${start.latitude}&startLng=${start.longitude}&endLat=${end.latitude}&endLng=${end.longitude}`);
        if (!response.ok) throw new Error('Failed to fetch route polyline');

        const data = await response.json();
        console.log('Route Polyline:', data);
        return data;
    } catch (error) {
        console.error('Error fetching route polyline:', error);
    }
}