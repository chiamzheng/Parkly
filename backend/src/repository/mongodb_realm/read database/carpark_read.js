/**
 * Provides functions to access car park data, including car park ID, location, hourly rate, and reviews,
 * from a MongoDB Realm database.
 * 
 * @module CarparkRead
 */

const Realm = require("realm");

// Define the Carpark schema
const CarparkSchema = {
    name: "Carpark",
    properties: {
        car_park_id: "string",
        x_coordinate: "double",
        y_coordinate: "double",
        hourly_rate: "double",
        reviews: "string[]"
    },
    primaryKey: "car_park_id",
};

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

// Utility function to find a car park document
async function find_document(car_park_id) {
    // Open the Realm database
    const realm = await Realm.open({
        path: "myrealm", // Specify your Realm database path
        schema: [CarparkSchema],
    });

    // Query for the car park by ID
    const document = realm.objectForPrimaryKey("Carpark", car_park_id);
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

async function read_carpark_id(car_park_id) {
    const document = await find_document(car_park_id);
    if (!document) throw new Error(`Carpark with ID ${car_park_id} not found.`);
    
    const result_carpark_id = document.car_park_id;
    console.log(`Carpark ID for ${car_park_id}: ${result_carpark_id}`);
    return result_carpark_id;
}

/**
 * Reads and returns the location (x, y coordinates) of the given car park.
 * 
 * @async
 * @function read_location
 * @param {string} car_park_id - The ID of the car park to read.
 * @returns {Promise<Array<number>>} - Returns an array containing [x_coor, y_coor].
 * @throws {Error} - Throws an error if the car park document is not found or reading fails.
 * 
 * @example
 * const location = await read_location("CP001");
 * 
 * @author Yue Hang
 */

async function read_location(car_park_id) {
    const document = await find_document(car_park_id);
    if (!document) throw new Error(`Carpark with ID ${car_park_id} not found.`);

    const x = document.x_coordinate;
    const y = document.y_coordinate;

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

async function read_hourly_rate(car_park_id) {
    const document = await find_document(car_park_id);
    if (!document) throw new Error(`Carpark with ID ${car_park_id} not found.`);

    const hourly_rate = document.hourly_rate;
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

async function read_reviews(car_park_id) {
    const document = await find_document(car_park_id);
    if (!document) throw new Error(`Carpark with ID ${car_park_id} not found.`);

    const reviews = document.reviews;
    console.log(`Reviews for ${car_park_id}: ${reviews}`);
    return reviews;
}

module.exports = { read_carpark_id, read_location, read_hourly_rate, read_reviews };

