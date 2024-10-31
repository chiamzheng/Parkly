// test_carpark_manager.js
const { get_available_lots, get_capacity, fetch_suggestions, fetch_reviews, fetch_carparks_within_radius } = require('./carpark_manager');

// Mock testing function
(async () => {
    try {
        // Test `get_available_lots`
        console.log("Testing get_available_lots:");
        const availableLots = await get_available_lots("ACM");
        console.log(`Available Lots for carpark ACM: ${availableLots}`);

        // Test `get_capacity`
        console.log("\nTesting get_capacity:");
        const capacity = await get_capacity("ACM");
        console.log(`Capacity for carpark ACM: ${capacity}%`);

        // Test `fetch_suggestions`
        console.log("\nTesting fetch_suggestions:");
        const suggestions = await fetch_suggestions("Jurong");
        console.log(`Suggestions for 'Jurong': ${suggestions.join(", ")}`);

        // Test `fetch_reviews`
        console.log("\nTesting fetch_reviews:");
        const reviews = await fetch_reviews("ACM");
        console.log(`Reviews for carpark ACM: `, reviews);

        // Test `fetch_carparks_within_radius`
        console.log("\nTesting fetch_carparks_within_radius:");
        const user_destination = [1.321572, 103.884496];
        const nearbyCarparks = await fetch_carparks_within_radius(user_destination, 1000);
        console.log(`Nearby Carparks within 1km: ${nearbyCarparks.join(", ")}`);

    } catch (error) {
        console.error("Error running tests:", error);
    }
})();
