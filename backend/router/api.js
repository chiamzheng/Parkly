const express = require('express');
const router = express.Router();
const { fetch_suggestions, fetch_route_details, fetch_route_polyline } = require('../src/controller/location_manager');
const { fetch_available_lot, fetch_capacity } = require('../src/controller/carpark_manager');

//console.log("fetch_suggestions:", fetch_suggestions);
//console.log("fetch_route_details:", fetch_route_details);
//console.log("fetch_route_polyline:", fetch_route_polyline);
//console.log("fetch_available_lot:", fetch_available_lot);
//console.log("fetch_capacity:", fetch_capacity);

// Location-based endpoints
router.get('/location/suggestions', fetch_suggestions);
router.get('/location/route', fetch_route_details);
router.get('/location/route-polyline', fetch_route_polyline);

// Carpark-based endpoints
router.get('/carpark/available-lot', fetch_available_lot);
router.get('/carpark/capacity', fetch_capacity);

module.exports = router;