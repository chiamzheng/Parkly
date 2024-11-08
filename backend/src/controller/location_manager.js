const axios = require("axios")
const LocationService = require('../service/locationService');

/**
 * Fetches first 5 closest suggestions based on search/query entry.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the address of the closest 5 suggestions.
 * @returns {Promise<void>} - Returns an array of JSON response (up to 5) with the Address, and Postal.
 * 
 * @throws {Error} - If the addresses cannot be fetched.
 * 
 * @author Jamie
 */

async function fetch_suggestions(req, res) {
    const search = req.query.search

    try {
        const locations = await LocationService.getSuggestions(search);
        res.status(200).json(locations);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

/**
 * Fetches route details - used for routing from starting point to selected carpark.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the address of the closest 5 suggestions.
 * @returns {Promise<void>} - Returns JSON response including (encoded) routeGeometry, totalDistance and totalTime.
 * 
 * @throws {Error} - If the data cannot be fetched.
 * 
 * @author Jamie
 */

async function fetch_route_details(req, res){
    const { startLat, startLng, endLat, endLng } = req.query;
    try {
        const start = `${startLat},${startLng}`;
        const end = `${endLat},${endLng}`;
        
        console.log("Start:", start);
        console.log("End:", end);
        const routeDetails = await LocationService.getRouteDetails(start, end);
        res.status(200).json(routeDetails); 
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

/**
 * Fetch array of latitude and logititude coordinates from encoded routeGeometry for polyline.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the address of the closest 5 suggestions.
 * @returns {Promise<void>} - Returns array JSON data of latitude and longtitude coordinates.
 * 
 * @throws {Error} - If the data cannot be fetched.
 * 
 * @author Jamie
 */

async function fetch_route_polyline(req, res){
    const { startLat, startLng, endLat, endLng } = req.query;
    try {
        // Convert coordinates to strings for API
        const start = `${startLat},${startLng}`;
        const end = `${endLat},${endLng}`;

        const routeDetails = await LocationService.getRouteDetails(start, end);
        const routeGeometry = routeDetails.routeGeometry;
        //console.log(routeGeometry)
        const polyline = await LocationService.decodeRouteGeometry(routeGeometry);
        res.status(200).json(polyline); 
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = { fetch_suggestions, fetch_route_details, fetch_route_polyline };
