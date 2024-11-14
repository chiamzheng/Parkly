const { register, login, change_email, change_password, update_bookmark, verify_email, fetch_bookmark, send_password_to_email} = require("../../src/controller/user_account_manager.js");

// Returns -1 if the email already exists, 0 if the password is too weak, 1 if registration is successful.
const register_api = async (req, res) => {
    try {
        const input_email = req.params.input_email;
        const input_password = req.params.input_password;
        const value = await register(input_email, input_password);
        res.status(200).json(value);   
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login_api = async (req, res) => {
    try{
        const input_email = req.params.input_email;
        const input_password = req.params.input_password;
        const value = await login(input_email, input_password);
        res.status(200).json(value);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const change_email_api = async (req, res) => {
    try{
        const user_email = req.params.user_email;
        const new_email = req.params.new_email;
        await change_email(user_email, new_email);
        res.status(200).json(`Email address successfully changed to ${new_email}!`);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const change_password_api = async (req, res) => {
    try{
        console.log("change_password_api called"); // Log statement added
        const user_email = req.params.user_email;
        const new_password = req.params.new_password;
        await change_password(user_email, new_password);
        res.status(200).json(`Password successfully changed to ${new_password}!`);
    } catch (error) {
        console.error("Error in change_password_api:", error); // Detailed error logging
        res.status(500).json({message: error.message});
    }
}

const fetch_bookmark_api = async (req, res) => {
    try{
        const user_email = req.params.user_email;
        const bookmark = await fetch_bookmark(user_email);
        res.status(200).json(bookmark);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const update_bookmark_api = async (req, res) => {
    try{
        const user_email = req.params.user_email;
        const carpark_id = req.params.carpark_id;
        await update_bookmark(user_email, carpark_id);
        res.status(200).json(`Bookmark list updated!`);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const verifyEmail_api = async (req, res) => {
    try {
        const user_email = req.params.user_email; 
        await verify_email(user_email);
        res.status(200).json({ message: 'Account verified!', email: user_email });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Verification failed', error: error.message });
    }
};

const send_password_to_email_api = async (req, res) => {
    try {
        const user_email = req.params.user_email;
        await send_password_to_email(user_email);
        res.status(200).json(`Password sent to ${user_email}!`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    register_api, 
    login_api, 
    fetch_bookmark_api, 
    change_email_api, 
    change_password_api, 
    update_bookmark_api, 
    verifyEmail_api,
    send_password_to_email_api
};
