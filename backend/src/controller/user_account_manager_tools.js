const UserAccountRead = require("../repository/database_access/read database/user_account_read");
const { passwordStrength } = require("check-password-strength"); // https://www.npmjs.com/package/check-password-strength 
const { find_document } = require("../repository/database_access/read database/user_account_read");

// import { find_document as findDocument } from "../repository/database_access/read database/user_account_read";
/**
 * Checks if the provided password matches the one stored in the database for a given email.
 * 
 * @param {string} email - The user's email to retrieve the stored password.
 * @param {string} password - The password to check against the stored password.
 * @returns {Promise<number>} - Returns 1 if the passwords match, 0 if they don't.
 * @throws {Error} - Throws an error if reading the password from the database fails.
 * 
 * @author Yue Hang
 */

async function password_matches(email, password) {

    // read user password in database
    const user_password = await UserAccountRead.read_password(email);

    // passwords match
    if (user_password == password) {
        return 1;
    }

    // passwords do not match
    return 0;
};

/**
 * Evaluates the strength of the provided password.
 * 
 * @param {string} password - The password to evaluate.
 * @returns {number} - Returns the strength level of the password:
 *                     0 = Very Weak, 1 = Weak, 2 = Medium, 3 = Strong.
 * @throws {Error} - Logs the password strength result and returns its level.
 * 
 * @author Yue Hang
 */

function strong_password(password) {

    const password_strength = passwordStrength(password).id;

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

/**
 * Checks if an email already exists in the database.
 * 
 * @param {string} email - The email to check in the database.
 * @returns {Promise<number>} - Returns 1 if the email exists, 0 if it doesn't.
 * @throws {Error} - Throws an error if there is a failure reading from the database.
 * 
 * @author Yue Hang
 */

async function email_exists(email) {

    // email exists

    const document = await find_document(email);
    if (document) { // if email already exists

        console.log("email already exists!");
        return 1;
    }

    // email does not exist
    return 0;
}

module.exports = { password_matches, email_exists, strong_password };