/**
 * @module DatabaseTools
 * @description Utility functions for working with the MongoDB database and collections.
 * @author Yue Hang
 */

const { client } = require("./connect database/database_connect");

/**
 * Gets the database instance from the MongoDB client.
 * @function get_database
 * @param {string} db_name - The name of the database to retrieve.
 * @returns {Object} The MongoDB database instance.
 * @example
 * const db = get_database('Parkly');
 * console.log(db.collectionNames);
 */

// get database from cluster
function get_database(db_name) {
        return client.db(db_name);
}

/**
 * Retrieves a collection from the "Parkly" database.
 * @function get_collection
 * @param {string} collection_name - The name of the collection to retrieve.
 * @returns {Object} The MongoDB collection instance.
 * @example
 * const collection = get_collection('carparks');
 * console.log(collection.find({}));
 */

// get collection from the database
function get_collection(collection_name) {
        return client.db("Parkly").collection(collection_name);
}

module.exports = { get_database, get_collection }

