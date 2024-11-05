/*const functions = require('../backend/src/repository/database_access/read database/carpark_read');
const { read_carpark_type, read_parking_system_type, read_parking_available_time, read_free_parking } = functions;

const fetchDatas = async (carparkID) => {
    const carparkData = {
        type: '',
        system: '',
        night: '',
        short: '',
        free: '',
    };

    try {
        const crpk_type = await read_carpark_type(carparkID);
        const crpk_system = await read_parking_system_type(carparkID);
        const crpk_time = await read_parking_available_time(carparkID);
        const crpk_free = await read_free_parking(carparkID);

        // Store the carpark data
        carparkData.type = crpk_type;
        carparkData.system = crpk_system;
        carparkData.night = crpk_time.night_parking;
        carparkData.short = crpk_time.short_term;
        carparkData.free = crpk_free;

        // Print the carpark data
        console.log("Carpark Data:", carparkData);
    } catch (error) {
        console.error("Error fetching carpark data:", error);
    }
};

fetchDatas('JM23');
*/