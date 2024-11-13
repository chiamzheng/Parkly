const axios = require("axios")
const CarparkWrite = require("../repository/database_access/write database/carpark_write.js");
const CarparkRead = require("../repository/database_access/read database/carpark_read.js");
const { get_collection } = require("../repository/database_access/database_tools.js");
const { wgs84ToSvy21 } = require("svy21");
const { svy21ToWgs84 } = require("svy21");
const { getLatLong } = require('../../APIServer/service/locationService.js')
const proj4 = require("proj4");

proj4.defs("EPSG:3414", "+proj=tmerc +lat_0=1.366666 +lon_0=103.833333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs");

/**
 * Retrieves reviews for a specific carpark from the database.
 * 
 * @param {string} carpark_id - The ID of the carpark to fetch reviews for.
 * @returns {Promise<Array>} - An array of reviews for the carpark.
 * 
 * @author Yue Hang
 */

async function fetch_reviews(carpark_id) {
    const reviews = await CarparkRead.read_reviews(carpark_id);
    return reviews;
}

async function fetch_address(carpark_id) {
    const address = await CarparkRead.read_address(carpark_id);
    return address;
}

async function fetch_location(carpark_id) {
    const carpark_location = await CarparkRead.read_location(carpark_id);
    return carpark_location;
}

async function fetch_carpark_type(carpark_id) {
    const carpark_type = await CarparkRead.read_carpark_type(carpark_id);
    return carpark_type;
}

async function fetch_parking_system_type(carpark_id) {
    const carpark_system_type = await CarparkRead.read_parking_system_type(carpark_id);
    return carpark_system_type;
}

async function fetch_short_term_parking(carpark_id) {
    const carpark_system_type = await CarparkRead.read_short_term_parking(carpark_id);
    return carpark_system_type;
}

async function fetch_parking_available_time(carpark_id) {
    const available_time = await CarparkRead.read_parking_available_time(carpark_id);
    return available_time;
}
async function fetch_free_parking(carpark_id) {
    const free_parking = await CarparkRead.read_free_parking(carpark_id);
    return free_parking;
}
async function fetch_carpark_rates(carpark_id) {
    const carpark_location = await CarparkRead.read_carpark_rate(carpark_id);
    return carpark_location;
}

async function fetch_night_parking(carpark_id) {
    const night_parking = await CarparkRead.read_night_parking(carpark_id);
    return night_parking;
}

async function fetch_gantry_height(carpark_id) {
    const gantry_height = await CarparkRead.read_gantry_height(carpark_id);
    return gantry_height;
}

async function fetch_carpark_basement(carpark_id) {
    const carpark_basement = await CarparkRead.read_carpark_basement(carpark_id);
    return carpark_basement;
}

/**
 * Utility function to calculate the Euclidean distance between two points.
 * 
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} - The Euclidean distance between the two points.
 * 
 * @author Yue Hang
 */

function calculate_distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
} //cannot use euclidean cause this is only for 2D plane but the earth is not flat

function calculate_haversine_distance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180; // Convert degrees to radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180; // Difference in latitudes
    const Δλ = (lon2 - lon1) * Math.PI / 180; // Difference in longitudes

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
}

function convert_svy21_to_latlon(x, y) {
    const latlon = svy21ToWgs84(x, y);
    return latlon;
}

/**
 * Finds all carparks within a specified radius from the user's destination using SVY21 coordinates.
 * 
 * @param {number[]} user_destination - User's destination in WGS84 coordinates (latitude, longitude).
 * @param {number} radius - Radius in meters to search for nearby carparks.
 * @returns {Promise<string[]>} - An array of carpark IDs within the radius.
 * @throws {Error} - Logs an error if the calculation fails.
 * 
 * @author Yue Hang
 */

async function fetch_carparks_within_radius(user_destination, radius) {
    console.log(user_destination);

    // get all the carparks in the collection
    const all_carparks = await get_collection("carparks").find({});

    // initialize nearby carparks array
    const nearby_carparks = [];

    // iterate through all carparks in the collection, filtering out carparks that are out of bounds
    await all_carparks.forEach(carpark => {
        const carpark_id = carpark.carpark_id;

        // Convert the SVY21 x and y coordinates to WGS84 lat/lon using proj4
        const [carpark_lon, carpark_lat] = proj4("EPSG:3414", "EPSG:4326", [carpark.x_coord, carpark.y_coord]);

        // Ensure the coordinates are valid floating-point numbers
        const parsed_user_lat = parseFloat(user_destination[0]);
        const parsed_user_lon = parseFloat(user_destination[1]);
        const parsed_carpark_lat = parseFloat(carpark_lat);
        const parsed_carpark_lon = parseFloat(carpark_lon);

        // Calculate the distance between the user's destination and carpark
        const distance = calculate_haversine_distance(parsed_user_lat, parsed_user_lon, parsed_carpark_lat, parsed_carpark_lon);

        // If the distance is within the specified radius, add the carpark ID to the nearby array
        if (distance <= radius) {
            nearby_carparks.push(carpark_id);
            console.log(carpark_id);
            console.log('X and Y coordinate:', carpark.x_coord, carpark.y_coord);
            console.log(parsed_carpark_lat, parsed_carpark_lon);
            console.log(`Calculated Distance: ${distance} meters`);
        }
    });

    console.log(`Carparks within ${radius / 1000}km of user's entered destination: ${nearby_carparks}`);
    return nearby_carparks; // return array of nearby carparks
}

// // test function
// async function main(){
//     const user_destination = [1.321572, 103.884496] //wgs82
//     // const user_destination = [30000, 30000]; //svy21
//     const carparks = await fetch_carparks_within_radius(user_destination, 1000);
//     console.log(carparks);
// }

// main();


async function add_review(carpark_id, user_email, review){
    const reviews = await CarparkRead.read_reviews(carpark_id);
    reviews.push(`${user_email}: ${review}`);
    const new_reviews = await CarparkWrite.write_reviews(carpark_id, reviews);
};

function computeLatLon(N, E) {
    // WGS84 Datum
    const a = 6378137;
    const f = 1 / 298.257223563;
  
    // SVY21 Projection origin
    const oLat = 1.366666;  // origin's lat in degrees
    const oLon = 103.833333; // origin's lon in degrees
    const oN = 38744.572;  // false Northing
    const oE = 28001.642;  // false Easting
    const k = 1;  // scale factor
  
    const b = a * (1 - f);
    const e2 = (2 * f) - (f * f);
    const e4 = e2 * e2;
    const e6 = e4 * e2;
    const A0 = 1 - (e2 / 4) - (3 * e4 / 64) - (5 * e6 / 256);
    const A2 = (3. / 8.) * (e2 + (e4 / 4) + (15 * e6 / 128));
    const A4 = (15. / 256.) * (e4 + (3 * e6 / 4));
    const A6 = 35 * e6 / 3072;
  
    const calcM = (lat) => {
        const latR = lat * Math.PI / 180;
        return a * ((A0 * latR) - (A2 * Math.sin(2 * latR)) + (A4 * Math.sin(4 * latR)) - (A6 * Math.sin(6 * latR)));
    };
  
    const calcRho = (sin2Lat) => {
        const num = a * (1 - e2);
        const denom = Math.pow(1 - e2 * sin2Lat, 3. / 2.);
        return num / denom;
    };
  
    const calcV = (sin2Lat) => {
        const poly = 1 - e2 * sin2Lat;
        return a / Math.sqrt(poly);
    };
  
    const Nprime = N - oN;
    const Mo = calcM(oLat);
    const Mprime = Mo + (Nprime / k);
  
    const n = (a - b) / (a + b);
    const n2 = n * n;
    const n3 = n2 * n;
    const n4 = n2 * n2;
  
    const G = a * (1 - n) * (1 - n2) * (1 + (9 * n2 / 4) + (225 * n4 / 64)) * (Math.PI / 180);
    const sigma = (Mprime * Math.PI) / (180. * G);
  
    let latPrime = sigma + ((3 * n / 2) - (27 * n3 / 32)) * Math.sin(2 * sigma) +
        ((21 * n2 / 16) - (55 * n4 / 32)) * Math.sin(4 * sigma) +
        (151 * n3 / 96) * Math.sin(6 * sigma) +
        (1097 * n4 / 512) * Math.sin(8 * sigma);
  
    const sinLatPrime = Math.sin(latPrime);
    const sin2LatPrime = sinLatPrime * sinLatPrime;
  
    const rhoPrime = calcRho(sin2LatPrime);
    const vPrime = calcV(sin2LatPrime);
    const psiPrime = vPrime / rhoPrime;
    const tPrime = Math.tan(latPrime);
  
    const Eprime = E - oE;
    const x = Eprime / (k * vPrime);
    const x2 = x * x;
    const x3 = x2 * x;
    const x5 = x3 * x2;
    const x7 = x5 * x2;
  
    const latFactor = tPrime / (k * rhoPrime);
    const latTerm1 = latFactor * ((Eprime * x) / 2);
    const latTerm2 = latFactor * ((Eprime * x3) / 24) * ((-4 * psiPrime * psiPrime) + (9 * psiPrime) * (1 - tPrime * tPrime) + (12 * tPrime * tPrime));
    const latTerm3 = latFactor * ((Eprime * x5) / 720) * ((8 * psiPrime * psiPrime * psiPrime * psiPrime) * (11 - 24 * tPrime * tPrime) -
        (12 * psiPrime * psiPrime * psiPrime) * (21 - 71 * tPrime * tPrime) +
        (15 * psiPrime * psiPrime) * (15 - 98 * tPrime * tPrime + 15 * tPrime * tPrime * tPrime) +
        (180 * psiPrime) * (5 * tPrime * tPrime - 3 * tPrime * tPrime * tPrime) +
        360 * tPrime * tPrime);
    const latTerm4 = latFactor * ((Eprime * x7) / 40320) * (1385 - 3633 * tPrime * tPrime + 4095 * tPrime * tPrime * tPrime + 1575 * tPrime * tPrime * tPrime * tPrime);
  
    latPrime = latPrime - latTerm1 + latTerm2 - latTerm3 + latTerm4;
  
    let lonTerm1 = x * (1 / Math.cos(latPrime));
    let lonTerm2 = (x3 / 6) * (1 / Math.cos(latPrime)) * (psiPrime + 2 * tPrime * tPrime);
    let lonTerm3 = (x5 / 120) * (1 / Math.cos(latPrime)) * ((-4 * psiPrime * psiPrime * psiPrime) * (1 - 6 * tPrime * tPrime) +
        psiPrime * psiPrime * (9 - 68 * tPrime * tPrime) + 72 * psiPrime * tPrime * tPrime + 24 * tPrime * tPrime * tPrime);
    let lonTerm4 = (x7 / 5040) * (1 / Math.cos(latPrime)) * (61 + 662 * tPrime * tPrime + 1320 * tPrime * tPrime * tPrime + 720 * tPrime * tPrime * tPrime * tPrime);
  
    const lonPrime = (oLon * Math.PI / 180) + lonTerm1 - lonTerm2 + lonTerm3 - lonTerm4;
  
    return { lat: latPrime / (Math.PI / 180), lon: lonPrime / (Math.PI / 180) };
  }
  


module.exports = { fetch_address, fetch_reviews, fetch_carpark_rates, fetch_carpark_type, fetch_short_term_parking, fetch_free_parking, fetch_location, fetch_parking_available_time, fetch_parking_system_type, fetch_night_parking, fetch_carpark_basement, fetch_gantry_height, fetch_carparks_within_radius, add_review };