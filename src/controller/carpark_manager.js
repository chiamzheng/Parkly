import axios from 'axios';

async function getAvailableLots(id){
    try {
        const response = await axios.get(`http://localhost:8083/carparkAvailability/${id}`);
        return response.data.availability;
        } catch (error) {
        console.error("Error fetching carpark availability:", error);
        throw new Error("Failed to fetch availability.");
    }
};

async function getCapacity(id){
    try {
        const response = await axios.get(`http://localhost:8083/carparkAvailability/${id}`);
        const totalLots = response.data.capacity
        const capacity = (await getAvailableLots(id)/totalLots)*100
        return capacity;
        } catch (error) {
        console.error("Error fetching carpark availability:", error);
        throw new Error("Failed to fetch capacity.");
    }
};

async function fetchSuggestions(search) {
    try {
        const response = await axios.get(`/searchAddress/${search}`);
        const suggestionsData = response.data;
        const suggestions = suggestionsData.slice(0, 5).map(item => item.Address);

        return suggestions; // address of first 5 closest matches
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
    }
}

//address and features of carpark can be found using read_location under carpark_read

export { getAvailableLots, getCapacity };