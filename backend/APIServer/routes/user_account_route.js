const express = require("express");
const user_account_route = express.Router();
const { register_api, login_api, change_email_api, change_password_api, update_bookmark_api } = require("../controller/user_account_controller.js");

user_account_route.get("/register/:input_email/:input_password", register_api);
user_account_route.get("/login/:input_email/:input_password", login_api);
user_account_route.get("/change_email/:user_email/:new_email", change_email_api);
user_account_route.get("/change_password/:user_email/:new_password", change_password_api);
user_account_route.get("/update_bookmark/:user_email/:carpark_id", update_bookmark_api);


module.exports = { user_account_route };

