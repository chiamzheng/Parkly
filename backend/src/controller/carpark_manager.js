const axios = require("axios")
const CarparkWrite = require("../repository/database_access/write database/carpark_write.js");
const CarparkRead = require("../repository/database_access/read database/carpark_read.js");
const { get_collection } = require("../repository/database_access/database_tools.js");
const { wgs84ToSvy21 } = require("svy21");
const { svy21ToWgs84 } = require("svy21");

/**
 * Retrieves reviews for a specific carpark from the database.
 * 
 * @param {string} carpark_id - The ID of the carpark to fetch reviews for.
 * @returns {Promise<Array>} - An array of reviews for the carpark.
 * 
 * @author Yue Hang
 */

async function fetch_reviews(carpark_id) {
    const reviews = await CarparkRead.read_reviews(carpark_id);
    return reviews;
}

async function fetch_address(carpark_id) {
    const address = await CarparkRead.read_address(carpark_id);
    return address;
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

async function fetch_short_term_parking(carpark_id) {
    const carpark_system_type = await CarparkRead.read_short_term_parking(carpark_id);
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

async function fetch_night_parking(carpark_id) {
    const night_parking = await CarparkRead.read_night_parking(carpark_id);
    return night_parking;
}

async function fetch_gantry_height(carpark_id) {
    const gantry_height = await CarparkRead.read_gantry_height(carpark_id);
    return gantry_height;
}

async function fetch_carpark_basement(carpark_id) {
    const carpark_basement = await CarparkRead.read_carpark_basement(carpark_id);
    return carpark_basement;
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
} //cannot use euclidean cause this is only for 2D plane but the earth is not flat

function calculate_haversine_distance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180; // Convert degrees to radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180; // Difference in latitudes
    const Δλ = (lon2 - lon1) * Math.PI / 180; // Difference in longitudes

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

function convert_svy21_to_latlon(x, y) {
    const latlon = svy21ToWgs84(x, y);
    return latlon;
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
    
    console.log(user_destination);

    // get all the carparks in the collection
    const all_carparks = await get_collection("carparks").find({});

    // initialize nearby carparks array
    const nearby_carparks = [];

    // iterate through all carparks in the collection "carparks" ,filter out carparks that are out of bound
    await all_carparks.forEach(carpark => {
        // Initializing the x and y coordinates of carpark
        carpark_id = carpark.carpark_id;
        const [carpark_lat, carpark_lon] = convert_svy21_to_latlon(carpark.x_coord, carpark.y_coord);

        // Ensure the coordinates are valid floating-point numbers
        const parsed_user_lat = parseFloat(user_destination[0]);
        const parsed_user_lon = parseFloat(user_destination[1]);
        const parsed_carpark_lat = parseFloat(carpark_lat);
        const parsed_carpark_lon = parseFloat(carpark_lon);

        // Calculate the distance between the user's destination and carpark
        const distance = calculate_haversine_distance(parsed_user_lat, parsed_user_lon, parsed_carpark_lat, parsed_carpark_lon);

        // If the distance is within the specified radius, add the carpark ID to the nearby array
        if (distance <= radius) {
            nearby_carparks.push(carpark.carpark_id);
            console.log(carpark.carpark_id);
            console.log(parsed_carpark_lat,parsed_carpark_lon);
            console.log(`Calculated Distance: ${distance} meters`);
        }
    });

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


async function add_review(carpark_id, user_email, review){
    const reviews = await CarparkRead.read_reviews(carpark_id);
    reviews.push(`${user_email}: ${review}`);
    const new_reviews = await CarparkWrite.write_reviews(carpark_id, reviews);
};



module.exports = { fetch_address, fetch_reviews, fetch_carpark_rates, fetch_carpark_type, fetch_short_term_parking, fetch_free_parking, fetch_location, fetch_parking_available_time, fetch_parking_system_type, fetch_night_parking, fetch_carpark_basement, fetch_gantry_height, fetch_carparks_within_radius, add_review };