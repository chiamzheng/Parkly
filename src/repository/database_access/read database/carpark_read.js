const { get_collection } = require("../database_tools.js");
const collection_name = "carparks";

// utility function
async function find_document ( carpark_id ) {

    // connect to collection in database
    const user_accounts_collection = await get_collection(collection_name);

    // query for results
    const query = { carpark_id : carpark_id };
    const document = await user_accounts_collection.findOne(query);

    return document;

}

async function read_carpark_id ( carpark_id ) {

    const document = await find_document( carpark_id );
    const result_carpark_id = await document.carpark_id;
    console.log(`Email for ${carpark_id}: ${result_carpark_id}`);
    return result_carpark_id;
}

async function read_location ( carpark_id ) {
    
    const document = await find_document( carpark_id );
    const location = await document.location;
    console.log(`Email for ${carpark_id}: ${location}`);
    return location;
}

async function read_hourly_rate ( carpark_id ) {

    const document = await find_document( carpark_id );
    const hourly_rate = await document.hourly_rate;
    console.log(`Email for ${carpark_id}: ${hourly_rate}`);
    return hourly_rate;
}


async function read_reviews ( carpark_id ) {

    const document = await find_document( carpark_id );
    const reviews = await document.reviews;
    console.log(`Email for ${carpark_id}: ${reviews}`);
    return reviews;
}


module.exports = { read_carpark_id, read_location, read_hourly_rate, read_reviews };

