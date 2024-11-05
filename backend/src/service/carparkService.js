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

class CarparkService {

    static async getCarparkData(carparkId) {
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

    static async getCarparkAvailability(carparkId) {
        const carparkData = await CarparkService.getCarparkData(carparkId);
        
        // Returns ONLY available parking lots and update time
        return {
            availableLots: carparkData.availableLots,
            updateTime: carparkData.updateTime
        };
    }

     static async getCarparkCapacity(carparkId) {
        const carparkData = await CarparkService.getCarparkData(carparkId);
        
        // return 2sf percentage capacity
        return {
            capacity: ((carparkData.availableLots / carparkData.totalLots)*100).toPrecision(2)
        };
    }
}

module.exports = CarparkService;