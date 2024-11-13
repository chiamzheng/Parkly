const express = require('express');
const app = express();
const PORT = 8083;
const os = require('os');

const { carpark_route } = require("./routes/carpark_route");
const { user_account_route } = require("./routes/user_account_route");
const { external_api_route } = require("./routes/external_api_route")

// middleware
app.use(express.json()); // To parse incoming JSON data
// app.use executes whenever .../carpark is called regardless of GET, POST etc.
app.use("/api/carpark", carpark_route);
app.use("/api/user_account", user_account_route);
app.use('/api/external', external_api_route);

const getLocalIPv4 = () => {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
      const networkInterface = networkInterfaces[interfaceName];
      for (const interfaceInfo of networkInterface) {
        if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
          return interfaceInfo.address;
        }
      }
    }
    return '127.0.0.1'; // Fallback to localhost if no IP found
  };

const SERVER_IP = getLocalIPv4();
console.log(`Local IPv4 address: ${SERVER_IP}`);

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER_IP}:${PORT}`);
});

module.exports = { SERVER_IP, PORT } ;
