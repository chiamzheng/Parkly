import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export default {
  expo: {
    extra: {
      SERVER_IP: process.env.SERVER_IP,
    },
  },
};
