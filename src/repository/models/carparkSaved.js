const mongoose = require("mongoose");

const carparkSavedSchema = new mongoose.Schema({
    carparkID: String,
    caparkInfo: [String],
});

const carparkSaved = mongoose.model('User', carparkSavedSchema);
module.exports = carparkSaved; 