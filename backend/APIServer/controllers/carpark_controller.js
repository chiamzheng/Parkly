const { fetch_carparks_within_radius, fetch_reviews } = require("../../src/controller/carpark_manager");

const fetch_reviews_api = async (req, res) => {
    try{
        const user_email = req.params.user_email;
        const carpark_id = req.params.carpark_id;
        const reviews = await fetch_reviews(user_email, carpark_id);
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

module.exports = { fetch_carparks_within_radius_api, fetch_reviews_api };