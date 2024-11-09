const express = require("express");
const carpark_route = express.Router();
const { fetch_reviews_api, fetch_address_api, fetch_carpark_rates_api, fetch_carpark_type_api, fetch_free_parking_api, fetch_location_api, fetch_parking_available_time_api, fetch_parking_system_type_api,fetch_carparks_within_radius_api, fetch_night_parking_api, fetch_gantry_height_api, fetch_carpark_basement_api, add_review_api } = require("../controller/carpark_controller.js");

carpark_route.get("/fetch_reviews/:carpark_id", fetch_reviews_api);
carpark_route.get("/fetch_address/:carpark_id", fetch_address_api);
carpark_route.get("/fetch_carpark_rates/:carpark_id", fetch_carpark_rates_api);
carpark_route.get("/fetch_carpark_type/:carpark_id", fetch_carpark_type_api);
carpark_route.get("/fetch_free_parking/:carpark_id", fetch_free_parking_api);
carpark_route.get("/fetch_location/:carpark_id", fetch_location_api);
carpark_route.get("/fetch_parking_available_time/:carpark_id", fetch_parking_available_time_api);
carpark_route.get("/fetch_parking_system_type/:carpark_id", fetch_parking_system_type_api);
carpark_route.get('/fetch_carparks_within_radius/:destination/:radius', fetch_carparks_within_radius_api);
carpark_route.get("/fetch_night_parking/:carpark_id", fetch_night_parking_api);
carpark_route.get("/fetch_gantry_height/:carpark_id", fetch_gantry_height_api);
carpark_route.get("/fetch_carpark_basement/:carpark_id", fetch_carpark_basement_api);
carpark_route.get("/add_review/:carpark_id/:reviewer_email/:review", add_review_api);


module.exports = { carpark_route };
