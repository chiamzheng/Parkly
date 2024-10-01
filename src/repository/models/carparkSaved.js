const carparkSavedSchema = new mongoose.Schema({
    carparkID: String,
    caparkInfo: [String],
});

const carparkSaved = mongoose.model('User', userAccountSchema);
module.exports = carparkSaved; 