const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8083;
const { carpark_route } = require("./routes/carpark_route");
const { user_account_route } = require("./routes/user_account_route");
const external_api_route = require("./routes/external_api_route");

// middleware
app.use(express.json()); // To parse incoming JSON data
// app.use executes whenever .../carpark is called regardless of GET, POST etc.
app.use("/api/carpark", carpark_route);
app.use("/api/user_account", user_account_route);
app.use('/api/external', external_api_route);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

