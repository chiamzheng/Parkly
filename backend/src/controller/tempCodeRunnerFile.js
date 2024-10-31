// potentially displaying different formats of hourly rate
const CarparkWrite = require("../repository/database_access/write database/carpark_write.js");
const CarparkRead = require("../repository/database_access/read database/carpark_read.js");
const { get_collection } = require("../repository/database_access/database_tools.js");

function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// returns an array of reviews
async function display_reviews(car_park_id) {
    reviews = await CarparkRead.read_reviews(car_park_id);
}

const user_destination = [30000, 30000];

// all distances in meters
// user_destination in SVY21
async function fetch_nearby_carparks(user_destination, radius) {

    x = user_destination[0];
    y = user_destination[1];

    // get all the carparks in the collection
    const all_carparks = await get_collection("carparks").find({});

    // initialize nearby carparks array
    const nearby_carparks = [];

    // filter out carparks that are out of bound
    const minX = x - radius
    const maxX = x + radius
    const minY = y - radius
    const maxY = y + radius

    console.log(minX, minY, maxX, maxY)

    // iterate through all carparks in the collection "carparks" ,filter out carparks that are out of bound
    await all_carparks.forEach(carpark => {

        // initializing the x and y coordinates of carpark
        carpark_id = carpark.carpark_id;
        carpark_x = carpark.x_coordinate;
        carpark_y = carpark.y_coordinate;

        // if carpark is in the boundary
        if (carpark_x >= minX && carpark_y >= minY && carpark_x <= maxX && carpark_y <= maxY) {

            // calculate the euclidean distance between destination and carpark
            distance = calculateDistance(x, y, carpark_x, carpark_y);

            // if it is within the radius, add the carpark id to nearby carparks array
            if (distance <= radius) {
                nearby_carparks.push(carpark_id);
            }
        }
    })
}