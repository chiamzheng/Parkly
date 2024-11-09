/**
 * Provides functions to access car park data, including car park ID, location, hourly rate, and reviews, 
 * from a MongoDB collection. It also includes utility functions for fetching documents from the database.
 * 
 * @module CarparkRead
 */

const { get_collection } = require("../database_tools.js");
const collection_name = "carparks";

/**
 * Utility function to find a document in the car parks collection by car park ID.
 * 
 * @async
 * @function find_document
 * @param {string} carpark_id - The ID of the car park to find.
 * @returns {Promise<Object|null>} - Returns the document for the specified car park ID, or null if not found.
 * @throws {Error} - Throws an error if the database query fails.
 * 
 * @author Yue Hang
 */

// utility function
async function find_document ( carpark_id ) {

    // connect to collection in database
    const user_accounts_collection = await get_collection(collection_name);

    // query for results
    const query = { carpark_id : carpark_id };
    const document = await user_accounts_collection.findOne(query);

    return document;
}

/**
 * Reads and returns the car park ID for the given car park.
 * 
 * @async
 * @function read_carpark_id
 * @param {string} carpark_id - The ID of the car park to read.
 * @returns {Promise<string>} - Returns the car park ID.
 * @throws {Error} - Throws an error if the car park document is not found or reading fails.
 * 
 * @example
 * const carparkId = await read_carpark_id("CP001");
 * 
 * @author Yue Hang
 */

async function read_carpark_id ( carpark_id ) {

    const document = await find_document( carpark_id );
    const result_carpark_id = await document.carpark_id;
    console.log(`Carpark ID for ${carpark_id}: ${result_carpark_id}`);
    return result_carpark_id;
}

async function read_address( carpark_id ) {
    const document = await find_document( carpark_id );
    const address = document.address;
    return address
}

/**
 * Reads and returns the location (x, y coordinates in SVY21 format) of the given car park.
 * 
 * @async
 * @function read_location
 * @param {string} carpark_id - The ID of the car park to read.
 * @returns {Promise<Array<number>>} - Returns an array containing [x_coor, y_coor] in SVY21 format.
 * @throws {Error} - Throws an error if the car park document is not found or reading fails.
 * 
 * @example
 * const location = await read_location("CP001");
 * 
 * @author Yue Hang
 */

async function read_location ( carpark_id ) {
    
    const document = await find_document( carpark_id );
    const x = await document.x_coord;
    const y = await document.y_coord;
    
    // function for converting from svy21 to wgs84 in case needed
    // location = CoordinateConverter.svy21ToWgs84(x, y);

    const location = [x, y];
    console.log(`Location for ${carpark_id}: ${location}`);
    return location;
}

async function read_carpark_type (carpark_id) {
    const document = await find_document(carpark_id);
    const car_park_type = document.car_park_type;
    return car_park_type;
}

async function read_parking_system_type ( carpark_id ) {
    const document = await find_document(carpark_id);
    const parking_system_type = document.type_of_parking_system;
    return parking_system_type;
}

async function read_parking_available_time (carpark_id) {
    const document = await find_document(carpark_id);
    const short_term = document.short_term_parking;
    const whole_day = document.whole_day_parking;
    const morning_evening = document.morning_evening;
    const morning_night = document.morning_night;
    const night_parking = document.night_parking;
    return {short_term, whole_day, morning_evening, morning_night, night_parking}; // "YES" or "NO"
}

async function read_free_parking (carpark_id) {
    const document = await find_document(carpark_id);
    const free_parking = document.free_parking;
    return free_parking; // "YES" or "NO"
}

async function read_night_parking (carpark_id) {
    const document = await find_document(carpark_id);
    const night_parking = document.night_parking;
    return night_parking;
}

async function read_gantry_height (carpark_id) {
    const document = await find_document(carpark_id);
    const gantry_height = document.gantry_height;
    return gantry_height;
}

async function read_carpark_basement (carpark_id) {
    const document = await find_document(carpark_id);
    const carpark_basement = document.car_park_basement;
    return carpark_basement;
}

async function read_carpark_rate ( carpark_id ) {
    const document = await find_document(carpark_id);
    const morning_evening_motorcar_rate = document.morning_evening_motorcar_rate;
    const evening_morning_motorcar_rate = document.evening_morning_motorcar_rate;
    return {morning_evening_motorcar_rate, evening_morning_motorcar_rate};
    // Number data type stored as an array
}

// usage instruction
//   const [morn_eve, eve_morn] = await read_carpark_rate("ACB");
//   console.log(morn_eve,eve_morn);



/**
 * Reads and returns the reviews for the given car park.
 * 
 * @async
 * @function read_reviews
 * @param {string} carpark_id - The ID of the car park to read reviews for.
 * @returns {Promise<Array>} - Returns an array of reviews for the car park.
 * @throws {Error} - Throws an error if the car park document is not found or reading fails.
 * 
 * @example
 * const reviews = await read_reviews("CP001");
 * 
 * @author Yue Hang
 */

async function read_reviews ( carpark_id ) {

    const document = await find_document( carpark_id );
    const reviews = await document.reviews;
    console.log(`Reviews for ${carpark_id}: ${reviews}`);
    return reviews;
}

module.exports = { read_address, read_carpark_type, read_carpark_id, read_location, read_parking_system_type, read_parking_available_time, read_free_parking, read_carpark_rate, read_reviews, read_night_parking, read_gantry_height, read_carpark_basement };
