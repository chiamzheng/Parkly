async function fetch_available_lots(carpark_id){
    try {
        const response = await axios.get(`http://localhost:8083/carparkAvailability/${carpark_id}`);
        return response.data.availability;
        } catch (error) {
        console.error("Error fetching carpark availability:", error);
        throw new Error("Failed to fetch availability.");
    }
};


async function fetch_capacity(carpark_id){
    try {
        const response = await axios.get(`http://localhost:8083/carparkAvailability/${carpark_id}`);
        const totalLots = response.data.capacity
        const capacity = (await get_available_lots(carpark_id)/totalLots)*100
        return capacity;
        } catch (error) {
        console.error("Error fetching carpark availability:", error);
        throw new Error("Failed to fetch capacity.");
    }
};

async function fetch_suggestions(search) {
    try {
        const response = await axios.get(`/searchAddress/${search}`);
        const suggestionsData = response.data;
        const suggestions = suggestionsData.slice(0, 5).map(item => item.Address);

        return suggestions; // address of first 5 closest matches
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        set_suggestions([]);
    }
}


module.exports = { fetch_available_lots, fetch_capacity, fetch_suggestions }