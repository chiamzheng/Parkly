const axios = require("axios")
const CarparkService = require('../../APIServer/service/carparkService.js');
const CarparkWrite = require("../repository/database_access/write database/carpark_write.js");
const CarparkRead = require("../repository/database_access/read database/carpark_read.js");
const { get_collection } = require("../repository/database_access/database_tools.js");
const { wgs84ToSvy21 } = require("svy21");

/**
 * Fetches the available lot count and update time for a specific carpark.
 * 
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the availability data or error.
 * @returns {Promise<void>} - Returns a JSON response with the availableLots and updateTime
 * 
 * @throws {Error} - If the carpark availability data cannot be fetched.
 * 
 * @author Jamie
 */

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

// get_available_lots("ACM")
// get_capacity("ACM")

async function fetch_suggestions(search) {
    try {
        const response = await axios.get(`/searchAddress/${search}`);
        const suggestionsData = response.data;
        const suggestions = suggestionsData.slice(0, 5).map(item => item.Address);

        return suggestions; // address of first 5 closest matches
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

/**
 * Fetches the capacity (in %) for a specific carpark.
 * 
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the availability data or error.
 * @returns {Promise<void>} - Returns a JSON response with the capacity.
 * 
 * @throws {Error} - If the capacity of carpark cannot be fetched.
 * 
 * @author Jamie
 */

async function fetch_capacity(req, res){
    const carparkId = req.query.carpark_id;

    try {
        const capacity = await CarparkService.getCarparkCapacity(carparkId);
        res.status(200).json(capacity);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

//address and features of carpark can be found using read_location under carpark_read



/**
 * Retrieves reviews for a specific carpark from the database.
 * 
 * @param {string} carpark_id - The ID of the carpark to fetch reviews for.
 * @returns {Promise<Array>} - An array of reviews for the carpark.
 * 
 * @author Yue Hang
 */

async function fetch_reviews(carpark_id) {
    reviews = await CarparkRead.read_reviews(carpark_id);
    return reviews;
}

/**
 * Utility function to calculate the Euclidean distance between two points.
 * 
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} - The Euclidean distance between the two points.
 * 
 * @author Yue Hang
 */

function calculate_distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Finds all carparks within a specified radius from the user's destination using SVY21 coordinates.
 * 
 * @param {number[]} user_destination - User's destination in WGS84 coordinates (latitude, longitude).
 * @param {number} radius - Radius in meters to search for nearby carparks.
 * @returns {Promise<string[]>} - An array of carpark IDs within the radius.
 * @throws {Error} - Logs an error if the calculation fails.
 * 
 * @author Yue Hang
 */

async function fetch_carparks_within_radius(user_destination, radius) {

    // convert WGS84 to SVY21
    user_destination = wgs84ToSvy21(user_destination[0], user_destination[1]);
    console.log(user_destination);

    x = user_destination[0];
    y = user_destination[1];

    // get all the carparks in the collection
    const all_carparks = await get_collection("carparks").find({});

    // initialize nearby carparks array
    const nearby_carparks = [];

    // define the boundaries where any carpark outside of the boundary is considered out of bounds, so we don't waste resources calculating the distances
    const minX = x - radius
    const maxX = x + radius
    const minY = y - radius
    const maxY = y + radius

    console.log(minX, minY, maxX, maxY)

    // iterate through all carparks in the collection "carparks" ,filter out carparks that are out of bound
    await all_carparks.forEach(carpark => {

        // initializing the x and y coordinates of carpark
        carpark_id = carpark.carpark_id;
        carpark_x = carpark.x_coord;
        carpark_y = carpark.y_coord;

        // if carpark is in the boundary
        if (carpark_x >= minX && carpark_y >= minY && carpark_x <= maxX && carpark_y <= maxY) {

            // calculate the euclidean distance between destination and carpark
            distance = calculate_distance(x, y, carpark_x, carpark_y);
            // if it is within the radius, add the carpark carpark_id to nearby carparks array
            if (distance <= radius) {
                nearby_carparks.push(carpark_id);
            }
        }

        // carpark is out of the radius
        // do nothing
    })

    console.log(`carparks within ${radius/1000}km of user's entered destination is ${nearby_carparks}`);
    return nearby_carparks; // return array of nearby carparks
}

// // test function
// async function main(){
//     const user_destination = [1.321572, 103.884496] //wgs82
//     // const user_destination = [30000, 30000]; //svy21
//     const carparks = await fetch_carparks_within_radius(user_destination, 1000);
//     console.log(carparks);
// }

// main();

module.exports = { fetch_available_lots, fetch_capacity, fetch_suggestions, fetch_reviews, fetch_carparks_within_radius };

