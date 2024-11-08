//const functions = require('../backend/src/controller/carpark_manager');
//note that functions here are outdated,, refer to components/Service for example
const { get_available_lots, get_capacity, fetch_suggestions, fetch_reviews, fetch_carparks_within_radius } = functions;

const carParkId = 'JM23'; // Replace with a valid car park ID

const fetchData = async () => {
    try {
        const availableLots = await get_capacity(carParkId);
        console.log(`Available lots for car park ID ${carParkId}:`, availableLots);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Call fetchData immediately to get the first data
fetchData();

// Set an interval to fetch data every 5 seconds
const interval = setInterval(fetchData, 5000); //note needed if you useEffect in component

// Optionally, clear the interval after a certain time (e.g., after 30 seconds)
// setTimeout(() => clearInterval(interval), 30000); // Uncomment this line to stop after 30 seconds
