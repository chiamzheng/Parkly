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

    static decodeRouteGeometry(encodedGeometry) {
        const coordinates = polyline.decode(encodedGeometry);
    
        return coordinates.map(coord => ({
            latitude: coord[0],
            longitude: coord[1]
        }));
    }
    
}

module.exports = LocationService;

