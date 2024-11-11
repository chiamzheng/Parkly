/**
 * 
 * This service class is responsible for interacting with the OneMap API 
 * and processing location data. It provides functions to retrieve 
 * location suggesstions, latitude and longtitude coordinated of a specified location, route details and
 * to handle decoding of route geometry required byt the polyline.
 * .
 * This class contains functions with their respective business logic to perform location-related data retrieval required by the frontend.
 * 
 * @class LocationService
 * @author Jamie
 * 
 */

const axios = require('axios');
const polyline = require('@mapbox/polyline');

class LocationService {

    /**
     * Retrieves location suggestions based on a query.
     * 
     * This function makes a request to the OneMap API to retrieve up to five 
     * address suggestions matching the provided `query` string. Each suggestion 
     * contains the address and postal code. If no matches are found, a message is returned.
     * 
     * @param {string} query - The search query for location suggestions.
     * @returns {Promise<Object[]>} - An array of objects with `Address` and `Postal` properties, or a message if no matches are found.
     * 
     * @throws {Error} - If the OneMap API request fails.
     * 
     * @author Jamie
     * 
     */

    static async getSuggestions(query){
        const response = await axios.get('https://www.onemap.gov.sg/api/common/elastic/search', {
            params: {
                searchVal: query,         
                returnGeom: 'Y',          
                getAddrDetails: 'Y',      
            }
        });
        
        // return address, lat and long
        if (response.data.results && response.data.results.length > 0) {
            return response.data.results.slice(0, 5).map(item => ({
                Address: item.ADDRESS,
                latitude: item.LATITUDE,
                longitude: item.LONGITUDE
            }));

        } else {
            return{
                message: 'No matching locations found'
            }
        }
    }

    /**
     * Retrieves the latitude and longitude for a specific address.
     * 
     * This function makes a request to the OneMap API using the provided `address` 
     * and returns an object with the latitude and longitude of the first matching result. 
     * If no matches are found, a message is returned.
     * 
     * @param {string} address - The address to get latitude and longitude for.
     * @returns {Promise<Object>} - An object containing `latitude` and `longitude`, or a message if no match is found.
     *
     * @throws {Error} - If the OneMap API request fails.
     * 
     * @author Jamie
     * 
     */

    static async getDestinationLatLong(address){
        const response = await axios.get('https://www.onemap.gov.sg/api/common/elastic/search', {
            params: {
                searchVal: address,
                returnGeom: 'Y',
                getAddrDetails: 'Y',
            }
        });

        const result = response.data.results[0];
        if (result) {
            return {
                latitude: result.Y,
                longitude: result.X
            };
        } else {
            return{
                message: 'No matching locations found'
            }
        }
    }

    /**
     * Retrieves routing details between a start and end location.
     * 
     * This function makes a request to the OneMap API to get route details for 
     * driving directions between `start` and `end` points. It returns an object with 
     * the route geometry, total distance, and estimated travel time.
     * 
     * @param {string} start - Starting location coordinates as "latitude,longitude".
     * @param {string} end - Ending location coordinates as "latitude,longitude".
     * @returns {Promise<Object>} - An object containing `routeGeometry`, `totalDistance`, and `totalTime`.
     * 
     * @throws {Error} - If the OneMap API request fails.
     * 
     * @author Jamie
     * 
     */

    static async getRouteDetails(start, end){
        const response = await axios.get('https://www.onemap.gov.sg/api/public/routingsvc/route', {
            params: {
                start: start,
                end: end,
                routeType: 'drive'
            },
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaW50ZXJuYWwtYWxiLW9tLXByZGV6aXQtaXQtbmV3LTE2MzM3OTk1NDIuYXAtc291dGhlYXN0LTEuZWxiLmFtYXpvbmF3cy5jb20vYXBpL3YyL3VzZXIvcGFzc3dvcmQiLCJpYXQiOjE3MzEwMjk2NzgsImV4cCI6MTczMTI4ODg3OCwibmJmIjoxNzMxMDI5Njc4LCJqdGkiOiJYQ2VyVzQ4OEUwVWJLQTVDIiwic3ViIjoiMTE2OWEzYTZjODYwMGRjNGQxMDQ3NTQ5YjM5NjZkZDgiLCJ1c2VyX2lkIjo0NDU4LCJmb3JldmVyIjpmYWxzZX0.vsF7zx6Zw-s1h0UNpdYygdCZDkLeR_xRujtFTCPqEtk'
            }
        });

        const { route_geometry, route_instructions, route_summary } = response.data;

        return {
            routeGeometry: route_geometry,
            totalDistance: route_summary.total_distance,
            totalTime: route_summary.total_time
        };
    }

    /**
     * Decodes an encoded polyline geometry string into an array of coordinates.
     * 
     * This function uses the `@mapbox/polyline` library to decode an encoded 
     * polyline string and returns an array of coordinate objects with `latitude` 
     * and `longitude` properties.
     * 
     * @param {string} encodedGeometry - The encoded polyline string for the route.
     * @returns {Array<Object>} - An array of objects with `latitude` and `longitude`.
     * 
     * @author Jamie
     * 
     */

    static decodeRouteGeometry(encodedGeometry) {
        const coordinates = polyline.decode(encodedGeometry);
    
        return coordinates.map(coord => ({
            latitude: coord[0],
            longitude: coord[1]
        }));
    }
    
}

module.exports = LocationService;

