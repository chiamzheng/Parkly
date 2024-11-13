const { mongoose } = require("mongoose");

// Schema - define what data are in each collection
const user_account_schema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true},
    bookmark_list: [String], // carpark_id
    verified: {type: Boolean}
});

// Model - Allows easy manipulating and fetching of data
// Export the model directly (i.e. don't need to call module.UserAccount, can straight UserAccount since there's only one thing exported) to be used elsewhere by using 'UserAccount' as object
const UserAccountModel = mongoose.model('UserAccount', user_account_schema);

module.exports = { UserAccountModel, user_account_schema}