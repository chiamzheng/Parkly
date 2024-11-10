const { fetch_reviews, fetch_address, fetch_carpark_rates, fetch_carpark_type, fetch_short_term_parking, fetch_free_parking, fetch_location, fetch_parking_available_time, fetch_parking_system_type, fetch_night_parking, fetch_gantry_height, fetch_carpark_basement, fetch_carparks_within_radius, add_review } = require("../../src/controller/carpark_manager");

const fetch_reviews_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const reviews = await fetch_reviews(carpark_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_address_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const address = await fetch_address(carpark_id);
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_carpark_rates_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const reviews = await fetch_carpark_rates(carpark_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_carpark_type_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const reviews = await fetch_carpark_type(carpark_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_short_term_parking_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const short_term_parking = await fetch_short_term_parking(carpark_id);
        res.status(200).json(short_term_parking);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_free_parking_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const reviews = await fetch_free_parking(carpark_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_location_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const reviews = await fetch_location(carpark_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_parking_available_time_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const reviews = await fetch_parking_available_time(carpark_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_night_parking_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const night_parking = await fetch_night_parking(carpark_id);
        res.status(200).json(night_parking);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_gantry_height_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const gantry_height = await fetch_gantry_height(carpark_id);
        res.status(200).json(gantry_height);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_carpark_basement_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const carpark_basement = await fetch_carpark_basement(carpark_id);
        res.status(200).json(carpark_basement);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_parking_system_type_api = async (req, res) => {
    try{
        const carpark_id = req.params.carpark_id;
        const reviews = await fetch_parking_system_type(carpark_id);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const fetch_carparks_within_radius_api = async (req, res) => {
    try{
        // const { user_destination, radius } = req.params;
        const user_destination = req.params.destination.split(',');
        const radius = req.params.radius;
        const carparks_within_radius = await fetch_carparks_within_radius(user_destination, radius);
        res.status(200).json(carparks_within_radius);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const add_review_api = async (req, res) => {
    try{
        // const { user_destination, radius } = req.params;
        const carpark_id = req.params.carpark_id;
        const reviewer_email = req.params.reviewer_email;
        const review = req.params.review;
        const new_reviews = await add_review(carpark_id, reviewer_email, review);
        res.status(200).json(`Updated reviews: ${new_reviews}`);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
module.exports = { fetch_address_api, fetch_reviews_api, fetch_carpark_rates_api, fetch_carpark_type_api, fetch_short_term_parking_api, fetch_free_parking_api, fetch_location_api, fetch_parking_available_time_api, fetch_parking_system_type_api, fetch_night_parking_api, fetch_gantry_height_api, fetch_carpark_basement_api, fetch_carparks_within_radius_api, add_review_api };

