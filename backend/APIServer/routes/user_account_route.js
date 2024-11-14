const express = require("express");
const user_account_route = express.Router();
const { register_api, login_api, fetch_bookmark_api, change_email_api, change_password_api, update_bookmark_api, verifyEmail_api, send_password_to_email_api } = require("../controller/user_account_controller.js");

user_account_route.get("/register/:input_email/:input_password", register_api);
user_account_route.get("/login/:input_email/:input_password", login_api);
user_account_route.get("/change_email/:user_email/:new_email", change_email_api);
user_account_route.get("/change_password/:user_email/:new_password", change_password_api);
user_account_route.get("/update_bookmark/:user_email/:carpark_id", update_bookmark_api);
user_account_route.get("/fetch_bookmark/:user_email", fetch_bookmark_api);
user_account_route.get("/verify/:user_email", verifyEmail_api);
user_account_route.get("/send_password/:user_email", send_password_to_email_api);

module.exports = { user_account_route };

