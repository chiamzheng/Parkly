const axios = require("axios");
const CarparkService = require("../service/carparkService");

/*
 * Fetches the available lot count and update time for a specific carpark.
 * 
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the availability data or error.
 * @returns {Promise<void>} - Returns a JSON response with the availableLots and updateTime
 * 
 * @throws {Error} - If the carpark availability data cannot be fetched.
 * 
 * @author Jamie
 */

async function fetch_available_lots(req, res) {
    const carparkId = req.query.carpark_id; // Get carpark ID from query parameter
    console.log("processed")
    try {
        const availability = await CarparkService.getCarparkAvailability(carparkId);
        res.status(200).json(availability);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

/*
 * Fetches the capacity (in %) for a specific carpark.
 * 
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object to send the availability data or error.
 * @returns {Promise<void>} - Returns a JSON response with the capacity.
 * 
 * @throws {Error} - If the capacity of carpark cannot be fetched.
 * 
 * @author Jamie
 */

async function fetch_capacity(req, res){
    const carparkId = req.query.carpark_id;

    try {
        const capacity = await CarparkService.getCarparkCapacity(carparkId);
        res.status(200).json(capacity);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { fetch_available_lots, fetch_capacity }