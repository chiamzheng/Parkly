/**
 * 
 * write appropirate desc here
 * 
 * This functions contains their respective business logic to perform ;pcation-related data retrieval required by the frontend
 * 
 * @class Location
 * @author Jamie
 * 
 */

const axios = require('axios');
const polyline = require('@mapbox/polyline');

class LocationService {

    static async getSuggestions(query){
        const response = await axios.get('https://www.onemap.gov.sg/api/common/elastic/search', {
            params: {
                searchVal: query,         
                returnGeom: 'Y',          
                getAddrDetails: 'Y',      
            }
        });
        
        // return ONLY address
        if (response.data.results && response.data.results.length > 0) {
            return response.data.results.slice(0, 5).map(item => ({
                Address: item.ADDRESS,
                Postal: item.POSTAL,
            }));

        } else {
            return{
                message: 'No matching locations found'
            }
        }
    }

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

    static async getRouteDetails(start, end){
        const response = await axios.get('https://www.onemap.gov.sg/api/public/routingsvc/route', {
            params: {
                start: start,
                end: end,
                routeType: 'drive'
            },
            headers: {
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTY5YTNhNmM4NjAwZGM0ZDEwNDc1NDliMzk2NmRkOCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC1uZXctMTYzMzc5OTU0Mi5hcC1zb3V0aGVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hcGkvdjIvdXNlci9wYXNzd29yZCIsImlhdCI6MTczMDc4NjM3MiwiZXhwIjoxNzMxMDQ1NTcyLCJuYmYiOjE3MzA3ODYzNzIsImp0aSI6IlR3RmhjQUNVSUVCWUs2dzEiLCJ1c2VyX2lkIjo0NDU4LCJmb3JldmVyIjpmYWxzZX0.4fbhUvHqppqJyXbHOzsnUQ1FxceO8JZsOsCKi9JHvPw'
            }
        });

        const { route_geometry, route_instructions, route_summary } = response.data;

        return {
            routeGeometry: route_geometry,         // to decode for the polyline
            totalDistance: route_summary.total_distance,
            totalTime: route_summary.total_time
        };
    }

    static decodeRouteGeometry(encodedGeometry) {
        const coordinates = polyline.decode(encodedGeometry);
    
        return coordinates.map(coord => ({
            latitude: coord[0],
            longitude: coord[1]
        }));
    }
    
}

module.exports = LocationService;

