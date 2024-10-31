/**
 * Connects to the MongoDB database.
 * 
 * @async
 * @function connect_db
 * @returns {Promise<MongoClient>} - Returns the connected MongoDB client.
 * @throws {Error} - Throws an error if the connection to the database fails.
 * 
 * @example
 * const { connect_db } = require('./db_connection');
 * const client = await connect_db();
 * 
 * @author Yue Hang
 */

// taking the specific function "MongoClient" from 'mongodb'
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://lyh0805:abcd1234@parkly.pup5x.mongodb.net/?retryWrites=true&w=majority&appName=Parkly";
const client = new MongoClient(uri);

async function connect_db() {
  await client.connect();
  console.log("Connected to MongoDB!");
  return client;
}

/**
 * Closes the connection to the MongoDB database.
 * 
 * @async
 * @function close_db
 * @returns {Promise<void>} - Closes the MongoDB connection and returns nothing.
 * @throws {Error} - Throws an error if closing the connection fails.
 * 
 * @example
 * const { close_db } = require('./db_connection');
 * await close_db();
 * 
 * @author Yue Hang
 */

async function close_db() {
  await client.close();
  console.log("Disconnected from MongoDB!");
}

module.exports = { connect_db, close_db, client };