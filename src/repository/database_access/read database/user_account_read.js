const { get_collection } = require("../database_tools.js")

const collection_name = "user_accounts";

// utility function
async function find_document ( email ) {

    // connect to collection in database
    const user_accounts_collection = await get_collection(collection_name);

    // query for results
    const query = {email: email};
    const document = await user_accounts_collection.findOne(query);

    return document;

}

// redundant function
async function read_email ( email ) {

    const document = await find_document(email);
    const result_email = await document.email;
    console.log(`Email for ${email}: ${result_email}`);
    return result_email;
}


async function read_password ( email ) {
    
    const document = await find_document(email);
    const password = await document.password;
    console.log(`Password for ${email}: ${password}`);
    return password
}

async function read_bookmark_list ( email ) {
    
    const document = await find_document(email);
    const bookmark_list = await document.bookmark_list;
    console.log(`Bookmark List for ${email}: ${bookmark_list}`);
    return bookmark_list;
}


module.exports = { read_email, read_password, read_bookmark_list }; 