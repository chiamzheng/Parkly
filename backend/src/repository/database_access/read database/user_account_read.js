/**
 * Provides functions to access user account data, including email, password, and bookmark lists, 
 * from a MongoDB collection. It also includes utility functions for fetching documents by email.
 * 
 * @module UserAccountRead
 */

const { get_collection } = require("../database_tools.js")

const collection_name = "user_accounts";

/**
 * Utility function to find a document in the user accounts collection by email.
 * 
 * @async
 * @function find_document
 * @param {string} email - The email address to find in the user accounts collection.
 * @returns {Promise<Object|null>} - Returns the document for the specified email, or null if not found.
 * @throws {Error} - Throws an error if the database query fails.
 * 
 * @example
 * const userDocument = await find_document("user@example.com");
 * 
 * @author Yue Hang
 */

async function find_document ( email ) {

    // connect to collection in database
    const user_accounts_collection = await get_collection(collection_name);

    // query for results
    const query = {email: email};
    const document = await user_accounts_collection.findOne(query);

    return document;

}



async function read_email ( email ) {

    const document = await find_document(email);
    const result_email = await document.email;
    console.log(`Email for ${email}: ${result_email}`);
    return result_email;
}

/**
 * Reads and returns the password for the given email.
 * 
 * @async
 * @function read_password
 * @param {string} email - The email address to retrieve the password for.
 * @returns {Promise<string>} - Returns the password associated with the email.
 * @throws {Error} - Throws an error if the user document is not found or reading fails.
 * 
 * @example
 * const password = await read_password("user@example.com");
 * 
 * @author Yue Hang
 */

async function read_password ( email ) {
    
    const document = await find_document(email);
    console.log(document);
    const password = await document.password;
    return password;
}

/**
 * Reads and returns the bookmark list for the given email.
 * 
 * @async
 * @function read_bookmark_list
 * @param {string} email - The email address to retrieve the bookmark list for.
 * @returns {Promise<Array>} - Returns an array of bookmarked car park IDs.
 * @throws {Error} - Throws an error if the user document is not found or reading fails.
 * 
 * @example
 * const bookmarks = await read_bookmark_list("user@example.com");
 * 
 * @author Yue Hang
 */

async function read_bookmark_list ( email ) {
    
    const document = await find_document(email);
    const bookmark_list = await document.bookmark_list;
    console.log(`Bookmark List for ${email}: ${bookmark_list}`);
    return bookmark_list;
}


module.exports = { find_document, read_email, read_password, read_bookmark_list }; 