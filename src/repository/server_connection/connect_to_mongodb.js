//const userAccountManager = require('../retrieval and manipulation/writeDatabase/userAccountWrite');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lyh0805:abcd1234@parkly.pup5x.mongodb.net/?retryWrites=true&w=majority&appName=Parkly";

const userAccountRead = require("../retrieval and manipulation/readDatabase/userAccountRead.js")
const userAccountWrite = require("../retrieval and manipulation/writeDatabase/userAccountWrite.js")

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// run this to connect to server
run().catch(console.dir);



  
console.log(userAccountWrite.addAccount('abcd@gmail.com', "abcd1234", "abcd1234"));
  