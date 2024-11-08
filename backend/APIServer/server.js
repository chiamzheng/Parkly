const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8083;
const { carpark_route } = require("./routes/carpark_route");
const { user_account_route } = require("./routes/user_account_route");

// middleware
app.use(express.json()); // To parse incoming JSON data
// app.use executes whenever .../carpark is called regardless of GET, POST etc.
app.use("/api/carpark", carpark_route);
app.use("/api/user_account", user_account_route);


// examples

// // calls getCarpark() when a GET request is made to the UI
// router.get('/', getCarpark)

// // calls setCarpark() when a POST request is made to the UI
// router.post('/', 
//     //this entire block of code is postCarpark()
//     (req, res) => {
//         res.send("POST request to the homepage");
// })



// app.post('/api/register', async (req, res) => {
//     const { id } = req.params;
    
//     try {
//         register("SERVERACTUALLYWORKING!", "Apitest$1");
//     }
//     catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Error fetching carpark availability data' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

