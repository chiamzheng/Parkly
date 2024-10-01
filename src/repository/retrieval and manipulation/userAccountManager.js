import userDetails from "session_data"


// fetch the current logged in username, and use it as oldUsername and username
function changeUsername(newUsername) {
    UserAccount.updateOne({username: current_username}, { $set: {username: newUsername} })
}

// only updates the password, does not check for prerequisites, check in logic before calling method.
function changePassword(newPassword) {
    UserAccount.updateOne({username: current_username}, {$set: {password: newPassword}})
}

function addBookList(carparkID) {
    userDetails
    UserAccount.updateOne({username: }, {})
}

function removeBookList(carparkID) {
    UserAccount.updateOne()
}

function leaveReview(carparkID) {

}