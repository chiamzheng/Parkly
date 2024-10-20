const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8080;

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

        res.status(200).send({
            name: `Carpark ID ${id}`,
            availability: availability
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

        const { ADDRESS, POSTAL, X, Y } = response.data.results[0];

        res.status(200).send({
            Address: ADDRESS,
            Postal: POSTAL,
            X: X,
            Y: Y
        });


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
            'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTY5YTNhNmM4NjAwZGM0ZDEwNDc1NDliMzk2NmRkOCIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC1uZXctMTYzMzc5OTU0Mi5hcC1zb3V0aGVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hcGkvdjIvdXNlci9wYXNzd29yZCIsImlhdCI6MTcyOTM0ODQ0MSwiZXhwIjoxNzI5NjA3NjQxLCJuYmYiOjE3MjkzNDg0NDEsImp0aSI6Ik91Q1ZOaml4TThUTjBvTEYiLCJ1c2VyX2lkIjo0NDU4LCJmb3JldmVyIjpmYWxzZX0.tLt8NBnYogZxkD0aVQMtnhIm7jwXP2bj5Bfff50dY5A' // every 3 days
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


