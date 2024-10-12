const mongoose = require("mongoose");

// Schema - define what data are in each collection
const userAccountSchema = new mongoose.Schema({
    email: String,
    username: { type: String, required: true},
    password: { type: String, required: true},
    bookmarkList: [String]
});

// Model - Allows easy manipulating and fetching of data
const UserAccount = mongoose.model('userAccount', userAccountSchema);

// Export the model to be used elsewhere
module.exports = { UserAccount }; 

