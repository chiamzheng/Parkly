/**
 * 
 * This service class is responsible for interacting with the carpark availability API 
 * and processing carpark data for specific carparks. It provides functions to retrieve 
 * data about carpark availability, capacity, and other related information based on 
 * the carpark ID.
 * 
 * This functions contains their respective business logic to perform carpark-related data retrieval required by the frontend
 * 
 * @class CarparkService
 * @author Jamie
 * 
 */

const axios = require('axios');

async function getCarparkData(carparkId) {
    const response = await axios.get('https://api.data.gov.sg/v1/transport/carpark-availability');

    const carparkData = response.data.items[0].carpark_data.find(carpark => carpark.carpark_number === carparkId);

    // Process and return the data fetched from API in a specific format for other functions to refer and utilise
    return {
        carparkNumber: carparkData.carpark_number,
        totalLots: carparkData.carpark_info[0].total_lots,
        availableLots: carparkData.carpark_info[0].lots_available,
        updateTime: carparkData.update_datetime
    };
}

class CarparkService {

     /**
     * Retrieves detailed carpark data from the carpark availability API.
     * 
     * This function makes a request to the carpark availability API, and 
     * retrieves the carpark data for a given `carparkId`. The data is then 
     * processed and returned in a specific format for use by other functions.
     * 
     * @param {string} carparkId - The ID of the carpark to retrieve data for.
     * @returns {Promise<Object>} - An object containing the `carparkNumber`, `totalLots`, 
     *                              `availableLots`, and `updateTime` for the carpark.
     * 
     * @throws {Error} - If the API request fails or the carpark ID is not found.
     * 
     * @author Jamie
     * 
     */



    /**
     * Retrieves the availability of parking lots for a specific carpark.
     * 
     * This function fetches the carpark data for the given `carparkId` using 
     * `getCarparkData()` and returns only the number of available parking lots 
     * and the time of the last update.
     * 
     * @param {string} carparkId - The ID of the carpark to retrieve availability for.
     * @returns {Promise<Object>} - An object containing `availableLots` and `updateTime`.
     * 
     * @throws {Error} - If the carpark ID is not found or the API request fails.
     * 
     * @author Jamie
     * 
     */

    static async getCarparkAvailability(carparkId) {
        const carparkData = await getCarparkData(carparkId);
        
        // Returns ONLY available parking lots and update time
        return {
            availableLots: carparkData.availableLots,
            updateTime: carparkData.updateTime
        };
    }

    /**
     * Retrieves the parking capacity of a specific carpark as a percentage.
     * 
     * This function calculates the parking capacity as a percentage using the 
     * number of available lots and the total lots in the carpark. The capacity is 
     * returned with two significant figures.
     * 
     * @param {string} carparkId - The ID of the carpark to retrieve capacity for.
     * @returns {Promise<Object>} - An object containing the `capacity` as a percentage.
     * 
     * @throws {Error} - If the carpark ID is not found or the API request fails.
     * 
     * @author Jamie
     * 
     */

     static async getCarparkCapacity(carparkId) {
        const carparkData = await getCarparkData(carparkId);
        
        // return 2sf percentage capacity
        return {
            capacity: ((carparkData.availableLots / carparkData.totalLots)*100).toPrecision(2)
        };
    }
}

module.exports = CarparkService;