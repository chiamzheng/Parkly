const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 8083;
const router = require('./router/api');

app.use(express.json()); // To parse incoming JSON data

app.use('/api', router);

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



