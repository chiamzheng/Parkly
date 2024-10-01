
// fetch the current logged in username, and use it as oldUsername and username
function changeUsername(newUsername) {
    UserAccount.updateOne({username: oldUsername}, { $set: {username: newUsername} })
}

// only updates the password, does not check for prerequisites, check in logic before calling method.
function changePassword(username, newPassword) {
    UserAccount.updateOne({username: username}, {$set: {password: newPassword}})
}

function addBookList() {

}

