const readDatabase = require("./readDatabase");
const writeDatabase = require("./writeDatabase");
const UserAccount = require("../models/userAccount");

const username = "lyh0805"; // get username from current user
const password = "abcd1234";

function register(email, username, password) {
    
    // check if username already exists
    if (userAccountRead.usernameExists(username)) {

        console.log("Username already exists! Try another username");
    
    } else {
        const newUser = {
            email: email,
            username: username,
            password: password,
        }
        writeDatabase.addAccount(newUser)
    }
    ;

    // check strength of password? 

}

function login(){

}

function changeUsername(newUsername) {

    // check if username already exists


    // update username on the database

}

function changePassword(newPassword) {

    // check if current password matches user input


    // check strength of password


    // update password on the database


}

function addBookmark() {

    // check if bookmark exists, if exist - do nothing, if doesn't exist - add

    // update on the database

}

function removeBookmark() {

    // check if bookmark exists, if it doesn't exist - do nothing, if exist - remove

    // update on the database
}

function leaveReview() {

    // add review to the current lists of review


    // update on the database
}