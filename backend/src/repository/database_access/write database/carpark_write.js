/**
 * This module handles writing operations for carpark-related data in a MongoDB collection. 
 * It allows updating carpark ID, location, hourly rate, and reviews, as well as adding new carpark records.
 * 
 * @module CarparkWrite
 */

const { get_collection } = require("../database_tools.js");
const { CarparkModel } = require("../../models/carpark_model.js");
const collection_name = "carparks";

/**
 * Updates the carpark ID of a specified carpark.
 * 
 * @async
 * @function write_carpark_id
 * @param {string} car_park_id - The current carpark ID to be updated.
 * @param {string} new_carpark_id - The new carpark ID to set.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * 
 * @example
 * await write_carpark_id("C123", "C456");
 * 
 * @throws {Error} - Throws an error if the update operation fails.
 * 
 * @author Yue Hang
 */

async function write_carpark_id ( car_park_id, new_carpark_id) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { car_park_id: car_park_id }, 
        { $set: { car_park_id: new_carpark_id } }
    );

    console.log(`Carpark ID of ${car_park_id} updated to ${new_carpark_id}`);
}

/**
 * Updates the location of a specified carpark.
 * 
 * @async
 * @function write_location
 * @param {string} car_park_id - The carpark ID whose location is to be updated.
 * @param {Array<number>} new_location - An array representing the new [x, y] coordinates of the carpark.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * 
 * @example
 * await write_location("C123", [12345, 54321]);
 * 
 * @throws {Error} - Throws an error if the update operation fails.
 * 
 * @author Yue Hang
 */

async function write_location ( car_park_id, new_location ) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { car_park_id: car_park_id }, 
        { $set: { location: new_location } }
    );

    console.log(`Carpark location of ${car_park_id} updated to ${new_location}`);
}

/**
 * Updates the hourly rate of a specified carpark.
 * 
 * @async
 * @function write_hourly_rate
 * @param {string} car_park_id - The carpark ID whose hourly rate is to be updated.
 * @param {number} new_hourly_rate - The new hourly rate to set for the carpark.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * 
 * @example
 * await write_hourly_rate("C123", 2.5);
 * 
 * @throws {Error} - Throws an error if the update operation fails.
 * 
 * @author Yue Hang
 */

async function write_hourly_rate ( car_park_id, new_hourly_rate ) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { car_park_id: car_park_id }, 
        { $set: { hourly_rate: new_hourly_rate } }
    );

    console.log(`Hourly rate of Carpark ${car_park_id} updated to ${new_hourly_rate}`);
}

/**
 * Updates the reviews of a specified carpark.
 * 
 * @async
 * @function write_reviews
 * @param {string} car_park_id - The carpark ID whose reviews are to be updated.
 * @param {Array<string>} new_reviews - The new reviews to set for the carpark.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 * 
 * @example
 * await write_reviews("C123", ["Great parking!", "Convenient location"]);
 * 
 * @throws {Error} - Throws an error if the update operation fails.
 * 
 * @author Yue Hang
 */

async function write_reviews ( car_park_id, new_reviews ) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { car_park_id: car_park_id }, 
        { $set: { reviews: new_reviews } }
    );

    console.log(`Reviews of carpark ${car_park_id} updated to ${new_carpark_id}`);
}

/**
 * Adds a new carpark to the database.
 * 
 * @async
 * @function add_carpark
 * @param {string} car_park_id - The ID of the new carpark.
 * @param {Array<number>} location - The [x, y] coordinates of the carpark.
 * @param {number} hourly_rate - The hourly rate for parking.
 * @param {Array<string>} [reviews=[]] - An optional array of reviews for the carpark.
 * @returns {Promise<void>} - A promise that resolves when the carpark is added to the database.
 * 
 * @example
 * await add_carpark("C789", [12345, 54321], 3.0, ["Good service", "Spacious parking"]);
 * 
 * @throws {Error} - Throws an error if the insertion operation fails.
 * 
 * @author Yue Hang
 */

async function add_carpark ( car_park_id, location, hourly_rate, reviews = []) {
    
    // fetch collection
    const collection = await get_collection(collection_name);

    // create document using the UserAccount model
    carpark_document = new CarparkModel({
        car_park_id: car_park_id, 
        location: location,
        hourly_rate: hourly_rate,
        reviews: reviews
    });

    // insert document
    await collection.insertOne(carpark_document);
    console.log(`Carpark ${carpark_document.car_park_id} added to database!`);
}

module.exports = { write_carpark_id, write_location, write_hourly_rate, write_reviews, add_carpark };