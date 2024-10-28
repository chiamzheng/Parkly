const { mongoose } = require("mongoose");

const { user_account_schema } = require("./user_account_model");


const carpark_review_schema = new mongoose.Schema({
    carpark_id: String,
    rating: Number,
    review: String,
    reviewer: {type: user_account_schema, required: true},
});

const CarparkReviewModel = mongoose.model("CarparkReview", carpark_review_schema);

module.exports = { CarparkReviewModel, carpark_review_schema }

