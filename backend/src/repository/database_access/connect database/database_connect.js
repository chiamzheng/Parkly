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

module.exports = { connect_db, close_db, client };