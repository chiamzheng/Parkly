const { get_collection } = require("../database_tools.js");
const { CarparkModel } = require("../../models/carpark_model.js");
const collection_name = "carparks";

async function write_carpark_id ( carpark_id, new_carpark_id) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { carpark_id: carpark_id }, 
        { $set: { carpark_id: new_carpark_id } }
    );

    console.log(`Carpark ID of ${carpark_id} updated to ${new_carpark_id}`);
}

async function write_location ( carpark_id, new_location ) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { carpark_id: carpark_id }, 
        { $set: { location: new_location } }
    );

    console.log(`Carpark location of ${carpark_id} updated to ${new_location}`);
}

async function write_hourly_rate ( carpark_id, new_hourly_rate ) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { carpark_id: carpark_id }, 
        { $set: { hourly_rate: new_hourly_rate } }
    );

    console.log(`Hourly rate of Carpark ${carpark_id} updated to ${new_hourly_rate}`);
}

async function write_reviews ( carpark_id, new_reviews ) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { carpark_id: carpark_id }, 
        { $set: { reviews: new_reviews } }
    );

    console.log(`Reviews of carpark ${carpark_id} updated to ${new_carpark_id}`);
}

async function add_carpark ( carpark_id, location, hourly_rate, reviews = []) {
    
    // fetch collection
    const collection = await get_collection(collection_name);

    // create document using the UserAccount model
    carpark_document = new CarparkModel({
        carpark_id: carpark_id, 
        location: location,
        hourly_rate: hourly_rate,
        reviews: reviews
    });

    // insert document
    await collection.insertOne(carpark_document);
    console.log(`Carpark ${carpark_document.carpark_id} added to database!`);
}

module.exports = { write_carpark_id, write_location, write_hourly_rate, write_reviews, add_carpark };