const carparkReviewsSchema = new mongoose.Schema({
    carparkID: String,
    rating: Number,
    review: String,
    reviewer: UserAccount,
});

const UserAccount = mongoose.model('User', userAccountSchema);
module.exports = UserAccount; 

