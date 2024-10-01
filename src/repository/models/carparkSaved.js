const carparkSavedSchema = new mongoose.Schema({
    carparkID: String,
    caparkInfo: [String],
});

const UserAccount = mongoose.model('User', userAccountSchema);
module.exports = UserAccount; 