const UserAccountWrite = require("../repository/database_access/write database/user_account_write");
const UserAccountRead = require("../repository/database_access/read database/user_account_read");
const { password_matches, email_exists, strong_password } = require("./user_account_manager_tools");


async function register ( input_email, input_password ) {
    
    // check if email already exists
    if (await email_exists(input_email)) {

        console.log("email already exists! Try another email");
        return -1;
    
    } 

    // if password is too weak
    if (await !strong_password(input_password)) {
        
        console.log("Password too weak.");
        return -2;
    }

    // password is strong enough
    // register account to database
    await UserAccountWrite.add_user_account(input_email, input_password);
    return 1;
}


async function login ( input_email, input_password ){

    // if email does not exist
    if (await !email_exists(input_email)) {

        console.log("Email has not been registered!");
        return -1;
    }

    // email exists
    // check if input password matches the password in database
    if (await password_matches(input_email, input_password)){

        console.log("Log in successful!");
        return 1;
    }

    console.log("Login unsuccessful, passwords do not match.");
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
    if (await email_exists(new_email)) {

        console.log("Email already registered!");
        return -1;
    }

    // send a pin to user's email?

    // update email on the database
    await UserAccountWrite.write_email( user_email, new_email );

}

async function change_password( user_email, new_password) {

    // if password is same as before
    if (await password_matches(user_email, new_password)) {

        console.log("This password is same as your previous password!")
        return -1;
    }

    // password is not the same as before 
    // if password is too weak
    if (await !strong_password(input_password)) {
        
        console.log("Password too weak.");
        return -1;
    }

    // ask for current password before approving? (in a different file so that other UIs can reuse)
    
    // password is strong
    // update password on the database
    await UserAccountWrite.write_password(user_email, new_password);
    return 1;

}

async function update_bookmark( user_email, carpark_id ) {

    const bookmark_list = await UserAccountRead.read_bookmark_list(user_email);

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

}


module.exports = { register, login, change_email, change_password, update_bookmark };