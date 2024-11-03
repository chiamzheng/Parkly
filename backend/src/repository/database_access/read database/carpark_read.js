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
 * @param {string} car_park_id - The ID of the car park to find.
 * @returns {Promise<Object|null>} - Returns the document for the specified car park ID, or null if not found.
 * @throws {Error} - Throws an error if the database query fails.
 * 
 * @author Yue Hang
 */

// utility function
async function find_document ( car_park_id ) {

    // connect to collection in database
    const user_accounts_collection = await get_collection(collection_name);

    // query for results
    const query = { car_park_id : car_park_id };
    const document = await user_accounts_collection.findOne(query);

    return document;
}

/**
 * Reads and returns the car park ID for the given car park.
 * 
 * @async
 * @function read_carpark_id
 * @param {string} car_park_id - The ID of the car park to read.
 * @returns {Promise<string>} - Returns the car park ID.
 * @throws {Error} - Throws an error if the car park document is not found or reading fails.
 * 
 * @example
 * const carparkId = await read_carpark_id("CP001");
 * 
 * @author Yue Hang
 */

async function read_carpark_id ( car_park_id ) {

    const document = await find_document( car_park_id );
    const result_carpark_id = await document.car_park_id;
    console.log(`Carpark ID for ${car_park_id}: ${result_carpark_id}`);
    return result_carpark_id;
}

async function read_address( car_park_id ) {
    const document = await find_document( car_park_id );
    const address = document.address;
    return address
}

async function read_parking_system_type ( car_park_id ) {
    const document = await find_document(car_park_id);
    const parking_system_type = document.parking_system_type;
    return parking_system_type;
}

async function read_parking_available_time (car_park_id) {
    const document = await find_document(car_park_id);
    const short_term = document.short_term_parking;
    const whole_day = document.whole_day_parking;
    // const morning_evening = document.0700to1900_parking;
    // const morning_night = document.0800to2230_parking;
    const night_parking = document.night_parking;
    return short_term, whole_day, night_parking;
}

async function read_free_parking (car_park_id) {
    const document = await find_document(car_park_id);
    const free_parking = document.free_parking;
    return free_parking; 
}

async function read_carpark_rate ( car_park_id ) {
    const document = await find_document(car_park_id);
    // const morning_evening = document.0700to1700_motorcars_rate;
}

/**
 * Reads and returns the location (x, y coordinates in SVY21 format) of the given car park.
 * 
 * @async
 * @function read_location
 * @param {string} car_park_id - The ID of the car park to read.
 * @returns {Promise<Array<number>>} - Returns an array containing [x_coor, y_coor] in SVY21 format.
 * @throws {Error} - Throws an error if the car park document is not found or reading fails.
 * 
 * @example
 * const location = await read_location("CP001");
 * 
 * @author Yue Hang
 */

async function read_location ( car_park_id ) {
    
    const document = await find_document( car_park_id );
    const x = await document.x_coordinate;
    const y = await document.y_coordinate;
    
    // function for converting from svy21 to wgs84 in case needed
    // location = CoordinateConverter.svy21ToWgs84(x, y);

    const location = [x, y];
    console.log(`Location for ${car_park_id}: ${location}`);
    return location;
}

/**
 * Reads and returns the hourly rate of the given car park.
 * 
 * @async
 * @function read_hourly_rate
 * @param {string} car_park_id - The ID of the car park to read.
 * @returns {Promise<number>} - Returns the hourly rate of the car park.
 * @throws {Error} - Throws an error if the car park document is not found or reading fails.
 * 
 * @example
 * const rate = await read_hourly_rate("CP001");
 * 
 * @author Yue Hang
 */

async function read_hourly_rate ( car_park_id ) {

    const document = await find_document( car_park_id );
    const hourly_rate = await document.hourly_rate;
    console.log(`Hourly rate for ${car_park_id}: ${hourly_rate}`);
    return hourly_rate;
}

/**
 * Reads and returns the reviews for the given car park.
 * 
 * @async
 * @function read_reviews
 * @param {string} car_park_id - The ID of the car park to read reviews for.
 * @returns {Promise<Array>} - Returns an array of reviews for the car park.
 * @throws {Error} - Throws an error if the car park document is not found or reading fails.
 * 
 * @example
 * const reviews = await read_reviews("CP001");
 * 
 * @author Yue Hang
 */

async function read_reviews ( car_park_id ) {

    const document = await find_document( car_park_id );
    const reviews = await document.reviews;
    console.log(`Reviews for ${car_park_id}: ${reviews}`);
    return reviews;
}


module.exports = { read_carpark_id, read_location, read_hourly_rate, read_reviews };

