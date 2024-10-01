const carparkReviewsSchema = new mongoose.Schema({
    carparkID: String,
    rating: Number,
    review: String,
    reviewer: UserAccount,
});

const carparkReviews = mongoose.model('User', userAccountSchema);
module.exports = carparkReviews; 

