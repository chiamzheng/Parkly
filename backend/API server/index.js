const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const {register} = require("../src/controller/user_account_manager");

app.use(express.json()); // To parse incoming JSON data


app.post('/api/register', async (req, res) => {
    const { id } = req.params;
    
    try {
        register("apitest", "Apitest$1");
        }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching carpark availability data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

