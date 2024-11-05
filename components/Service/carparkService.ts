const BASE_URL = 'http://10.0.2.2:8083/api';

export async function getAvailableCarparkLot(carparkId: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/carpark/available-lot?carpark_id=${encodeURIComponent(carparkId)}`);
        if (!response.ok) throw new Error('Failed to fetch carpark availability');
        
        const data = await response.json();
        console.log('Available Carpark Lots:', data);
        return data;
    } catch (error) {
        console.error('Error fetching available carpark lots:', error);
    }
}

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