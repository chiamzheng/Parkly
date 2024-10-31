const UserAccountWrite = require("../repository/database_access/write database/user_account_write");
const UserAccountRead = require("../repository/database_access/read database/user_account_read");
const { password_matches, email_exists, strong_password } = require("./user_account_manager_tools");

/**
 * Registers a new user by adding an account to the database if the email is not already taken and the password is strong.
 * 
 * @param {string} input_email - The email provided by the user for registration.
 * @param {string} input_password - The password provided by the user for registration.
 * @returns {Promise<number>} - Returns -1 if the email already exists, 0 if the password is too weak, 1 if registration is successful.
 * @throws {Error} - Throws an error if writing to the database fails.
 * 
 * @author Yue Hang
 */

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

/**
 * Logs in a user by checking if the email exists and the password matches.
 * 
 * @param {string} input_email - The email provided by the user for login.
 * @param {string} input_password - The password provided by the user for login.
 * @returns {Promise<number>} - Returns -1 if the email is not registered, 0 if the passwords do not match, 1 if login is successful.
 * @throws {Error} - Throws an error if reading from the database fails.
 * 
 * @author Yue Hang
 */

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

/**
 * Sends a password reset process (pin validation) for a user who forgot their password.
 * 
 * @param {string} input_email - The email for the account that needs a password reset.
 * @returns {Promise<void>}
 * 
 * @author Yue Hang
 */

async function forgot_password ( input_email ) {
    
    // send pin to email address

    // user inputs pin

    // validate pin
    
}


/**
 * Changes the email of a user if the new email is not already registered.
 * 
 * @param {string} user_email - The current email of the user.
 * @param {string} new_email - The new email to replace the current one.
 * @returns {Promise<number>} - Returns -1 if the new email is already registered, 1 if email is successfully changed.
 * @throws {Error} - Throws an error if writing to the database fails.
 * 
 * @author Yue Hang
 */

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

/**
 * Changes the password for a user if the new password is strong and different from the current password.
 * 
 * @param {string} user_email - The email of the user changing their password.
 * @param {string} new_password - The new password to replace the current one.
 * @returns {Promise<number>} - Returns -1 if the new password is the same as the old one, 0 if the new password is too weak, 1 if password is successfully changed.
 * @throws {Error} - Throws an error if writing to the database fails.
 * 
 * @author Yue Hang
 */

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


/**
 * Updates the bookmark list for a user by either adding or removing a carpark ID.
 * 
 * @param {string} user_email - The email of the user updating their bookmark list.
 * @param {string} carpark_id - The carpark ID to add or remove from the bookmark list.
 * @returns {Promise<number>} - Returns 1 when the bookmark list is successfully updated.
 * @throws {Error} - Throws an error if reading or writing to the database fails.
 * 
 * @author Yue Hang
 */

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