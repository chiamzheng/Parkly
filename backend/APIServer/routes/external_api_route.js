const express = require('express');
const external_api_route = express.Router();
const { fetch_suggestions, fetch_route_details, fetch_route_polyline } = require('../controller/location_manager.js');
const { fetch_available_lot, fetch_capacity } = require('../controller/external_api_controller.js');

//console.log("fetch_suggestions:", fetch_suggestions);
//console.log("fetch_route_details:", fetch_route_details);
//console.log("fetch_route_polyline:", fetch_route_polyline);
//console.log("fetch_available_lot:", fetch_available_lot);
//console.log("fetch_capacity:", fetch_capacity);

// Location-based endpoints
external_api_route.get('/location/suggestions', fetch_suggestions);
external_api_route.get('/location/route', fetch_route_details);
external_api_route.get('/location/route-polyline', fetch_route_polyline);

// Carpark-based endpoints
external_api_route.get('/carpark/available-lot', fetch_available_lot);
external_api_route.get('/carpark/capacity', fetch_capacity);

module.exports = { external_api_route };