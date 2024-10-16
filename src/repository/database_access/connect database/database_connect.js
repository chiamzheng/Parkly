// taking the specific function "MongoClient" from 'mongodb'
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://lyh0805:abcd1234@parkly.pup5x.mongodb.net/?retryWrites=true&w=majority&appName=Parkly";
const client = new MongoClient(uri);

async function connect_db() {
  await client.connect();
  console.log("Connected to MongoDB!");
  return client;
}

async function close_db() {
  await client.close();
  console.log("Disconnected from MongoDB!");
}

// // get database from cluster
// function get_database(db_name) {
//     return client.db(db_name);
// }

// // get collection from the database
// function get_collection(collection_name) {
//     return client.db("Parkly").collection(collection_name);
// }


module.exports = { connect_db, close_db, client };