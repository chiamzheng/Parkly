const UserAccountRead = require("../repository/database_access/read database/user_account_read");
const { passwordStrength } = require("check-password-strength"); // https://www.npmjs.com/package/check-password-strength 
const { find_document } = require("../repository/database_access/read database/user_account_read");

// alternative way
// import { find_document as findDocument } from "../repository/database_access/read database/user_account_read";

function password_matches(email, password) {

    // read user password in database
    const user_password = UserAccountRead.read_password(email);

    // passwords match
    if (user_password == password) {
        return 1;
    }

    // passwords do not match
    return -1;
};

function strong_password(password) {

    const password_strength = passwordStrength(password).value;

    switch (password_strength) {

        case 0: // Too weak
            console.log("Very Weak password");
            return password_strength;

        case 1: // Weak
            console.log("Weak password");
            return password_strength;

        case 2: // Medium
            console.log("Medium password");
            return password_strength;

        case 3: // Strong
            console.log("Strong password");
            return password_strength;

        default:
    }
}

// check if email already exists
function email_exists(email) {

    // email exists
    if (find_document(email)) {

        console.log("email already exists!");
        return 1;
    }

    // email does not exist
    return -1;
}
module.exports = { password_matches, email_exists, strong_password };