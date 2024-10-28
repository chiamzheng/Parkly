const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8083;

app.use(express.json()); // To parse incoming JSON data

// GET endpoint to return carpark availability for a specific carpark
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

// GET endpoint to search for an address using OneMap API, locate x, y coordinates to pin destination
// Note you need to convert to WGS84 longtitude n latitude
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

//get carRoute from starting to destination (carpark), takes in WGS84 longtitude and latitude
//need to decode route geometry
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


