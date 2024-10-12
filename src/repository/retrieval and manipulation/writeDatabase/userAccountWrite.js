const { MongoClient, ServerApiVersion } = require('mongodb');
const collection = require("../../server_connection/connect_to_mongodb_test")

const UserAccount = require("../../models/userAccount");
const userAccountWriteTools = require("./userAccountWriteTools");

// newUser is a document with a JSON-like structure that represents a single data item in MongoDB
async function addAccount(email, username, password) {
    newUser = userAccountWriteTools.createUser(email, username, password);
    await collection.insertOne(newUser);
}

// fetch the current logged in username, and use it as oldUsername and username
function updateUsername(currentUsername, newUsername) {
    UserAccount.updateOne({username: currentUsername}, { $set: {username: newUsername} })
}

// only updates the password, does not check for prerequisites, check in logic before calling method.
function updatePassword(newPassword) {
    UserAccount.updateOne({username: currentUsername}, {$set: {password: newPassword}})
}

// encompasses both add and remove bookmark
function updateBookmarkList(carparkID) {
    UserAccount.updateOne({username: currentUsername}, {bookmarkList})
}


function updateReview(carparkID) {
    UserAccount.updateOne({username: currentUsername}, {})
}

module.exports = { addAccount, updateUsername, updatePassword, updateBookmarkList, updateReview };