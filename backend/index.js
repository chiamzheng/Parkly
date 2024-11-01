const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8083;

app.use(express.json()); // To parse incoming JSON data

/**
 * @route GET /carparkAvailability/:id
 * @description Fetches number of available lots information for a specific carpark by its ID.
 *
 * @param {string} id - The ID of the carpark (carpark number).
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} res.json - JSON response containing carpark availability data
 * @throws {Error} - Throws a 404 error if the carpark is not found or a 500 error if the fetch fails
 *
 * @author Jamie
 */

app.get('/carparkAvailability/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        // Fetch data from Data.gov.sg API
        const response = await axios.get('https://api.data.gov.sg/v1/transport/carpark-availability');
        
        // Find the carpark with the specified ID
        const carparkData = response.data.items[0].carpark_data.find(carpark => carpark.carpark_number === id);

        if (!carparkData) {
            return res.status(404).send({ message: `Carpark with ID ${id} not found` });
        }

        // Extract availability info
        const availability = carparkData.carpark_info[0].lots_available;
        const totalLots = carparkData.carpark_info[0].total_lots;

        res.status(200).send({
            name: id,
            availability: availability,
            capacity: totalLots
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching carpark availability data' });
    }
});

/**
 * @route GET /searchAddress/:query
 * @description Searches for addresses based on the provided query (keyword)
 *
 * @param {string} query - The search term
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} res.json - JSON array of matching address results
 * @throws {Error} - Throws a 404 error if no results are found or a 500 error if the search fails
 *
 * @author Jamie
 */

app.get('/searchAddress/:query', async (req, res) => {
    const { query } = req.params;

    try {
        // Make a GET request to OneMap Search API
        const response = await axios.get('https://www.onemap.gov.sg/api/common/elastic/search', {
            params: {
                searchVal: query,         // The search term (e.g., postal code, address)
                returnGeom: 'Y',          // Return geometry info (coordinates)
                getAddrDetails: 'Y',      // Return detailed address info
            }
        });

        console.log(response.data);

        if (response.data.results && response.data.results.length > 0) {
            const results = response.data.results.map(item => ({
                Address: item.ADDRESS,
                Postal: item.POSTAL,
                X: item.X,
                Y: item.Y
            }));

            res.status(200).send(results); // Send all results
        } else {
            res.status(404).send({ message: 'No results found' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error searching for address' });
    }
});

// tryna figure out how to renew token without explicitely copypasting token,, NOT USABLE unless you copy paste your token into Authorization

/**
 * @route GET /carRoute/:start/:end
 * @description Fetches driving route information between the specified start (takes in WGS84 longtitude and latitude) and end locations.
 *
 * @param {string} start - The starting location for the route.
 * @param {string} end - The destination location for the route.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} res.json - JSON response containing route information
 * @throws {Error} - Throws a 404 error if no routes are found or a 500 error if the fetch fails
 * 
 * @author Jamie
 */

app.get('/carRoute/:start/:end', async (req, res) => {
    const { start, end } = req.params; // Extract start and end locations from URL parameters

    try {
        const response = await axios.get(`https://www.onemap.gov.sg/api/public/routingsvc/route`, {
          params: {
            start: start,
            end: end,
            routeType: 'drive'
          },
          headers: {
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaW50ZXJuYWwtYWxiLW9tLXByZGV6aXQtaXQtbmV3LTE2MzM3OTk1NDIuYXAtc291dGhlYXN0LTEuZWxiLmFtYXpvbmF3cy5jb20vYXBpL3YyL3VzZXIvcGFzc3dvcmQiLCJpYXQiOjE3Mjk4MzQzNDQsImV4cCI6MTczMDA5MzU0NCwibmJmIjoxNzI5ODM0MzQ0LCJqdGkiOiJhdTBsNnhEUFVXTHMyaVNKIiwic3ViIjoiMTE2OWEzYTZjODYwMGRjNGQxMDQ3NTQ5YjM5NjZkZDgiLCJ1c2VyX2lkIjo0NDU4LCJmb3JldmVyIjpmYWxzZX0.gq23ZZ4FdoK4G6Xgqft1DGT0f_upVYiflYbyT2lJpaM' // every 3 days
          }
        });

    // Log the response to ensure we have the correct structure, can remove
    console.log(response.data);

    // Check if the route data is present
    if (response.data.status !== 0) {
        return res.status(404).send({ message: 'No routes found' });
    }

    // Extract relevant data from the response
    const { route_geometry, route_instructions, route_summary } = response.data;
    const { total_time, total_distance } = route_summary;

    // Send back the route information
    res.status(200).send({
        routeGeometry: route_geometry,   // The encoded geometry of the route
        routeInstructions: route_instructions, // Step-by-step instructions
        totalDistance: total_distance,   // Total distance of the route
        totalTime: total_time            // Total time taken for the route
    });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching route data' });
    }
});

/**
 * @route GET /walkRoute/:start/:end
 * @description Fetches walking route information between the specified start (takes in WGS84 longtitude and latitude) and end locations.
 *
 * @param {string} start - The starting location for the route.
 * @param {string} end - The destination location for the route.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} res.json - JSON response containing route information
 * @throws {Error} - Throws a 404 error if no routes are found or a 500 error if the fetch fails
 *
 * @author Jamie
 */

app.get('/walkRoute/:start/:end', async (req, res) => {
    const { start, end } = req.params; // Extract start and end locations from URL parameters

    try {
        const response = await axios.get(`https://www.onemap.gov.sg/api/public/routingsvc/route`, {
          params: {
            start: start,
            end: end,
            routeType: 'walk'
          },
          headers: {
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaW50ZXJuYWwtYWxiLW9tLXByZGV6aXQtaXQtbmV3LTE2MzM3OTk1NDIuYXAtc291dGhlYXN0LTEuZWxiLmFtYXpvbmF3cy5jb20vYXBpL3YyL3VzZXIvcGFzc3dvcmQiLCJpYXQiOjE3Mjk4MzQzNDQsImV4cCI6MTczMDA5MzU0NCwibmJmIjoxNzI5ODM0MzQ0LCJqdGkiOiJhdTBsNnhEUFVXTHMyaVNKIiwic3ViIjoiMTE2OWEzYTZjODYwMGRjNGQxMDQ3NTQ5YjM5NjZkZDgiLCJ1c2VyX2lkIjo0NDU4LCJmb3JldmVyIjpmYWxzZX0.gq23ZZ4FdoK4G6Xgqft1DGT0f_upVYiflYbyT2lJpaM' // every 3 days
          }
        });

    // Log the response to ensure we have the correct structure, can remove
    console.log(response.data);

    // Check if the route data is present
    if (response.data.status !== 0) {
        return res.status(404).send({ message: 'No routes found' });
    }

    // Extract relevant data from the response
    const { route_geometry, route_instructions, route_summary } = response.data;
    const { total_time, total_distance } = route_summary;

    // Send back the route information
    res.status(200).send({
        routeGeometry: route_geometry,   // The encoded geometry of the route
        routeInstructions: route_instructions, // Step-by-step instructions
        totalDistance: total_distance,   // Total distance of the route
        totalTime: total_time            // Total time taken for the route
    });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching route data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




// WIP

/**
 * @route POST /api/auth/post/getToken
 * @description Generates an access token using user credentials.
 *
 * @param {Object} req - Express request object containing email and password in the body.
 * @param {Object} res - Express response object
 * @returns {Object} res.json - JSON response containing the access token and its expiry timestamp.
 * @throws {Error} - Throws a 500 error if token generation fails
 *
 * @author Jamie
 */

/*
app.post('/api/auth/post/getToken', async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await axios.post('https://www.onemap.gov.sg/api/auth/post/getToken', {
            email: email,
            password: password,
        });

        const { access_token, expiry_timestamp } = response.data;
        oneMapToken = access_token;
        tokenExpiry = parseInt(expiry_timestamp);

        res.status(200).send({ access_token, expiry_timestamp });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).send({ message: 'Error generating token' });
    }
});*

/**
 * @function ensureToken
 * @description Function to check validity of token and renew if expired.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {Error} - Throws an error if the token refresh fails
 *
 * @author Jamie
 */
/*
async function ensureToken(req, res, next) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (currentTimestamp >= tokenExpiry) {
        try {
            const response = await axios.post('/api/auth/post/getToken', {
                email: email,
                password: password,
            });

            oneMapToken = response.data.access_token;
            tokenExpiry = parseInt(response.data.expiry_timestamp);
        } catch (error) {
            return res.status(500).send({ message: 'Failed to refresh token' });
        }
    }
    next();
}

*/



