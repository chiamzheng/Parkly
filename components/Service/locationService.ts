const BASE_URL = 'http://localhost:8083/api';

interface Coordinate {
    latitude: number;
    longitude: number;
}

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