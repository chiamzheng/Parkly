const UserAccount = require("../../models/userAccount");

// look for existing username in database
function findUser(username) {
    return UserAccount.findOne({username: username})
}

module.exports = {findUser};