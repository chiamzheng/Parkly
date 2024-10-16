const { mongoose } = require("mongoose");

const { carpark_review_schema } = require("./carpark_reviews_model")


const carpark_schema = new mongoose.Schema({
    carpark_id: { type: String, required: true },
    location: { type: String, required: true},
    hourly_rate: { type: Number },
    reviews: [carpark_review_schema]
});

const CarparkModel = mongoose.model('Carpark', carpark_schema);


// Model - Allows easy manipulating and fetching of data
// Export the model directly (i.e. don't need to call module.UserAccount, can straight UserAccount since there's only one thing exported) to be used elsewhere by using 'UserAccount' as object
module.exports = { CarparkModel, carpark_schema };
