const { client } = require("./connect database/database_connect");

// get database from cluster
function get_database(db_name) {
        return client.db(db_name);
}
    
// get collection from the database
function get_collection(collection_name) {
        return client.db("Parkly").collection(collection_name);
}

module.exports = { get_database, get_collection }

