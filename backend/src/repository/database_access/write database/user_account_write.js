/**
 * @module UserAccountRepository
 * @description Module for handling user account updates in the MongoDB collection.
 * @author Yue Hang
 */

const { get_collection } = require("../database_tools.js"); 

// import the UserAccountModel model
const { UserAccountModel } = require("../../models/user_account_model.js");

// define the collection name to be used
const collection_name = "user_accounts";

/**
 * Updates the email address for a user.
 * @async
 * @function write_email
 * @param {Object} collection - The MongoDB collection.
 * @param {string} user_email - The current email of the user.
 * @param {string} new_email - The new email to set.
 * @returns {Promise<void>}
 * @example
 * const collection = db.collection('user_accounts');
 * await write_email(collection, 'old@example.com', 'new@example.com');
 */

async function write_email (user_email, new_email) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { email: user_email }, 
        { $set: { email: new_email } }
    );
}

/**
 * Updates the password for a user.
 * @async
 * @function write_password
 * @param {Object} collection - The MongoDB collection.
 * @param {string} user_email - The user's email.
 * @param {string} new_password - The new password to set.
 * @returns {Promise<void>}
 * @example
 * const collection = db.collection('user_accounts');
 * await write_password(collection, 'user@example.com', 'new_password123');
 */

async function write_password (user_email, new_password) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { email: user_email }, 
        { $set: { password: new_password } }
    );
}



/**
 * Updates the bookmark list for a user.
 * @async
 * @function write_bookmark_list
 * @param {Object} collection - The MongoDB collection.
 * @param {string} user_email - The user's email.
 * @param {Array<string>} new_bookmark_list - The new bookmark list.
 * @returns {Promise<void>}
 * @example
 * const collection = db.collection('user_accounts');
 * await write_bookmark_list(collection, 'user@example.com', ['carpark_1', 'carpark_2']);
 */

async function write_bookmark_list (user_email, new_bookmark_list) {

    const collection = await get_collection(collection_name);
    
    await collection.updateOne(
        { email: user_email }, 
        { $set: { bookmark_list: new_bookmark_list } }
    );
}

/**
 * Adds a new user account document to the collection.
 * @async
 * @function add_user_account
 * @param {Object} collection - The MongoDB collection.
 * @param {string} user_email - The email of the new user.
 * @param {string} user_password - The password of the new user.
 * @param {Array<string>} [bookmark_list=[]] - The bookmark list of the new user.
 * @returns {Promise<void>}
 * @example
 * const collection = db.collection('user_accounts');
 * await add_user_account(collection, 'new@example.com', 'password123', []);
 */

async function add_user_account(user_email, user_password, bookmark_list = []) {

    // fetch collection
    const collection = await get_collection(collection_name);

    // create document using the UserAccountModel model
    user_account_document = new UserAccountModel({
        email: user_email,
        password: user_password,
        bookmark_list: bookmark_list,
        verified:false,
    });

    // insert document
    await collection.insertOne(user_account_document);
    console.log(`${user_account_document.email} added to database!`)

}

async function verify_account (user_email) {
    console.log("User verified 1");
    console.log(user_email);
    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { email: user_email }, 
        { $set: { verified: true } }
    );
    console.log("User verified 2");
}
module.exports = { write_email, write_password, write_bookmark_list, add_user_account, verify_account }; //, updateUsername, updatePassword, updateBookmarkList, updateReview };