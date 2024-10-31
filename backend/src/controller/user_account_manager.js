const UserAccountWrite = require("../repository/database_access/write database/user_account_write");
const UserAccountRead = require("../repository/database_access/read database/user_account_read");
const { password_matches, email_exists, strong_password } = require("./user_account_manager_tools");


async function register ( input_email, input_password ) {
    
    // check if email already exists
    const email_exist = await email_exists(input_email)

    if (email_exist) {

        console.log("email already exists! User account not added");
        return -1;
    } 

    // if password is too weak
    if (await !strong_password(input_password)) {
        
        console.log("Password too weak. User account not added");
        return -2;
    }

    // password is strong enough
    // register account to database
    await UserAccountWrite.add_user_account(input_email, input_password);
    return 1;
}

async function login ( input_email, input_password ){

    // if email does not exist

    const email_exist = email_exists(input_email);

    if (!email_exist) {

        console.log("Email has not been registered!");
        return -1;
    }

    // email exists
    // check if input password matches the password in database

    const password_match = password_matches(input_email, input_password);

    if (!password_match){
        console.log("Log in unsuccessful, passwords do not match!");
        return 0;
    }

    console.log("Login successful!");
    return 1;

}

async function forgot_password ( input_email ) {
    
    // send pin to email address

    // user inputs pin

    // validate pin
    
}


// notice the variable name is user_email instead of input_email, 
// this means that the email is retrieved from the current session intead of an input
async function change_email( user_email, new_email ) {

    // email already registered
    const email_exist = email_exists(new_email);

    if (email_exist) {
        console.log("Email already registered!");
        return -1;
    }

    // send a pin to user's email?

    // update email on the database
    await UserAccountWrite.write_email( user_email, new_email );
    console.log(`Email changed successfully from ${user_email} to ${new_email}`);
    return 1;

}

async function change_password( user_email, new_password) {

    // if password is same as before

    const password_match = await password_matches(user_email, new_password);

    if (password_match) {
        console.log("This password is same as your previous password!")
        return -1;
    }

    // password is not the same as before 
    // if password is too weak
    const strong_password = strong_password(input_password);
    if (!strong_password) {
        console.log("Password too weak.");
        return 0;
    }

    // ask for current password before approving? (in a different file so that other UIs can reuse)
    
    // password is strong
    // update password on the database
    await UserAccountWrite.write_password(user_email, new_password);
    console.log(`Password successfully changed to ${new_password}`)
    return 1;

}


// only call this function when the user wants to CHANGE the bookmark for that carpark i.e. bookmark or remove bookmark
async function update_bookmark( user_email, carpark_id ) {

    const bookmark_list = await UserAccountRead.read_bookmark_list(user_email);

    // when user taps on an already bookmarked carpark's "bookmark icon", signals that user wants to remove bookmark, vice versa

    // if bookmark already exists, then remove the carpark from the bookmark list
    if (bookmark_list.includes(carpark_id)) {

        const index = array.indexOf(carpark_id);

        // remove carpark_id from index
        bookmark_list.splice(index); 

    } else { // bookmark does not exist
        
        // add carpark to the bookmark list
        bookmark_list.push(carpark_id);
    }

    // update new bookmark list on the database
    await UserAccountWrite.write_bookmark_list(user_email, bookmark_list);
    console.log("Bookmark updated")
    return 1; 

}


module.exports = { register, login, change_email, change_password, update_bookmark };