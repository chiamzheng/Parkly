// deObject it to be used directly without needing databaseTools.get_collection()
const { get_collection } = require("../database_tools.js"); 

// import the UserAccountModel model
const { UserAccountModel } = require("../../models/user_account_model.js");

// define the collection name to be used
const collection_name = "user_accounts";


// change email
async function write_email (user_email, new_email) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { email: user_email }, 
        { $set: { email: new_email } }
    );
}

// change password
async function write_password (user_email, new_password) {

    const collection = await get_collection(collection_name);

    await collection.updateOne(
        { email: user_email }, 
        { $set: { password: new_password } }
    );
}

// change bookmark list
async function write_bookmark_list (user_email, new_bookmark_list) {

    const collection = await get_collection(collection_name);
    
    await collection.updateOne(
        { email: user_email }, 
        { $set: { bookmark_list: new_bookmark_list } }
    );
}

// add new document
async function add_user_account(user_email, user_password, bookmark_list = []) {

    // fetch collection
    const collection = await get_collection(collection_name);

    // create document using the UserAccountModel model
    user_account_document = new UserAccountModel({
        email: user_email,
        password: user_password,
        bookmark_list: bookmark_list
    });

    // insert document
    await collection.insertOne(user_account_document);
    console.log(`${user_account_document.email} added to database!`)

}

module.exports = { write_email, write_password, write_bookmark_list, add_user_account }; //, updateUsername, updatePassword, updateBookmarkList, updateReview };