const BASE_URL = 'http://10.0.2.2:8083/api';

export async function getLocationSuggestions(searchQuery: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/location/suggestions?search=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to fetch location suggestions');

        const data = await response.json();
        console.log('Location Suggestions:', data);
        return data;
    } catch (error) {
        console.error('Error fetching location suggestions:', error);
    }
}

export async function getRouteDetails(start: string, end: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/location/route?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`);
        if (!response.ok) throw new Error('Failed to fetch route details');

        const data = await response.json();
        console.log('Route Details:', data);
        return data;
    } catch (error) {
        console.error('Error fetching route details:', error);
    }
}

export async function getRoutePolyline(start: string, end: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/location/route-polyline?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`);
        if (!response.ok) throw new Error('Failed to fetch route polyline');

        const data = await response.json();
        console.log('Route Polyline:', data);
        return data;
    } catch (error) {
        console.error('Error fetching route polyline:', error);
    }
}