const axios = require("axios")
const LocationService = require('../service/locationService');

async function fetch_suggestions(req, res) {
    const search = req.query.query

    try {
        const locations = await LocationService.getSuggestions(search);
        res.status(200).json(locations);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

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
