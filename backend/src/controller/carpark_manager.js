//import axios from 'axios';
const axios = require("axios")
const CarparkWrite = require("../repository/database_access/write database/carpark_write.js");
const CarparkRead = require("../repository/database_access/read database/carpark_read.js");
const { get_collection } = require("../repository/database_access/database_tools.js");
const { wgs84ToSvy21 } = require("svy21");



async function get_available_lots(car_park_id){
    try {
        const response = await axios.get(`http://localhost:8083/carparkAvailability/${car_park_id}`);
        return response.data.availability;
        } catch (error) {
        console.error("Error fetching carpark availability:", error);
        throw new Error("Failed to fetch availability.");
    }
};



async function get_capacity(car_park_id){
    try {
        const response = await axios.get(`http://localhost:8083/carparkAvailability/${car_park_id}`);
        const totalLots = response.data.capacity
        const capacity = (await get_available_lots(car_park_id)/totalLots)*100
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
        console.error('Error fetching suggestions:', error);
        set_suggestions([]);
    }
}

//address and features of carpark can be found using read_location under carpark_read

/**
 * Retrieves reviews for a specific carpark from the database.
 * 
 * @param {string} car_park_id - The ID of the carpark to fetch reviews for.
 * @returns {Promise<Array>} - An array of reviews for the carpark.
 * 
 * @author Yue Hang
 */

async function fetch_reviews(car_park_id) {
    reviews = await CarparkRead.read_reviews(car_park_id);
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
        car_park_id = carpark.car_park_id;
        carpark_x = carpark.x_coordinate;
        carpark_y = carpark.y_coordinate;

        // if carpark is in the boundary
        if (carpark_x >= minX && carpark_y >= minY && carpark_x <= maxX && carpark_y <= maxY) {

            // calculate the euclidean distance between destination and carpark
            distance = calculate_distance(x, y, carpark_x, carpark_y);

            // if it is within the radius, add the carpark car_park_id to nearby carparks array
            if (distance <= radius) {
                nearby_carparks.push(car_park_id);
            }
        }

        // carpark is out of the radius
        // do nothing
    })

    console.log(`carparks within ${radius/1000}km of user's entered destination is ${nearby_carparks}`);
    return nearby_carparks; // return array of nearby carparks
}

// test function
const user_destination = [1.321572, 103.884496] //wgs82
// const user_destination = [30000, 30000]; //svy21
fetch_carparks_within_radius(user_destination, 1000);


module.exports = { get_available_lots, get_capacity, fetch_suggestions, fetch_reviews, fetch_carparks_within_radius };