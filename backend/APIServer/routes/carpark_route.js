const express = require("express");
const carpark_route = express.Router();
const { fetch_carparks_within_radius_api, fetch_reviews_api } = require("../controller/carpark_controller.js");
// const {register_user_account} = require("")

carpark_route.get('/fetch_carparks_within_radius/:destination/:radius', fetch_carparks_within_radius_api); // OK
carpark_route.get("/fetch_reviews/:carpark_id", fetch_reviews_api)

// router.post("/");
module.exports = { carpark_route };