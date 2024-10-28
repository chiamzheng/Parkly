const CoordinateConverter = require("svy21") ; // package with function to convert coordinate system svy21 to lat long
const { get_collection } = require("../database_tools.js");
const collection_name = "carparks";

// utility function
async function find_document ( car_park_id ) {

    // connect to collection in database
    const user_accounts_collection = await get_collection(collection_name);

    // query for results
    const query = { car_park_id : car_park_id };
    const document = await user_accounts_collection.findOne(query);

    return document;
}

async function read_carpark_id ( car_park_id ) {

    const document = await find_document( car_park_id );
    const result_carpark_id = await document.car_park_id;
    console.log(`Carpark ID for ${car_park_id}: ${result_carpark_id}`);
    return result_carpark_id;
}

// returns an array of [x_coor, y_coor]
async function read_location ( car_park_id ) {
    
    const document = await find_document( car_park_id );
    const x = await document.x_coordinate;
    const y = await document.y_coordinate;
    // location = CoordinateConverter.svy21ToWgs84(x, y);
    const location = [x, y];
    console.log(`Location for ${car_park_id}: ${location}`);
    return location;
}

async function read_hourly_rate ( car_park_id ) {

    const document = await find_document( car_park_id );
    const hourly_rate = await document.hourly_rate;
    console.log(`Hourly rate for ${car_park_id}: ${hourly_rate}`);
    return hourly_rate;
}


async function read_reviews ( car_park_id ) {

    const document = await find_document( car_park_id );
    const reviews = await document.reviews;
    console.log(`Reviews for ${car_park_id}: ${reviews}`);
    return reviews;
}


module.exports = { read_carpark_id, read_location, read_hourly_rate, read_reviews };

