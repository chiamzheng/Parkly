const axios = require("axios")
const CarparkService = require('../../APIServer/service/carparkService.js');
const CarparkWrite = require("../repository/database_access/write database/carpark_write.js");
const CarparkRead = require("../repository/database_access/read database/carpark_read.js");
const { get_collection } = require("../repository/database_access/database_tools.js");
const { wgs84ToSvy21 } = require("svy21");

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

async function fetch_location(carpark_id) {
    const carpark_location = await CarparkRead.read_location(carpark_id);
    return carpark_location;
}

async function fetch_carpark_type(carpark_id) {
    const carpark_type = await CarparkRead.read_carpark_type(carpark_id);
    return carpark_type;
}

async function fetch_parking_system_type(carpark_id) {
    const carpark_system_type = await CarparkRead.read_parking_system_type(carpark_id);
    return carpark_system_type;
}

async function fetch_parking_available_time(carpark_id) {
    const available_time = await CarparkRead.read_parking_available_time(carpark_id);
    return available_time;
}
async function fetch_free_parking(carpark_id) {
    const free_parking = await CarparkRead.read_free_parking(carpark_id);
    return free_parking;
}
async function fetch_carpark_rates(carpark_id) {
    const carpark_location = await CarparkRead.read_carpark_rate(carpark_id);
    return carpark_location;
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

// async function write_review(carpark_id, user_email) {
//     CarparkWrite.write_reviews(carpark_id)
// }

async function add_review(carpark_id, user_email, review){
    const reviews = await CarparkRead.read_reviews(carpark_id);
    reviews.push(review);
    const new_reviews = await CarparkWrite.write_reviews(carpark_id, reviews);
    return new_reviews;
};

module.exports = { fetch_reviews, fetch_carpark_rates, fetch_carpark_type, fetch_free_parking, fetch_location, fetch_parking_available_time, fetch_parking_system_type, fetch_carparks_within_radius, add_review };

