import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

module.exports = {
  extra: {
    SERVER_IP: process.env.SERVER_IP  // Use the env variable 
  },
};
