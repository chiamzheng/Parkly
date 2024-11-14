import axios from 'axios';
import Constants from 'expo-constants';
const URL = Constants.expoConfig?.extra?.SERVER_IP;
const BASE_URL = `${URL}/api/user_account`

// Returns -1 if the email already exists, 0 if the password is too weak, 1 if registration is successful.
export async function register(email: string, password: string): Promise<any> {
    try {
        const response = await fetch(`${URL}/register/${email}/${password}`);

        // Ensure the response is successful
        if (!response.ok) throw new Error('Failed to register');
        
        const data = await response.json();
        console.log('Value:', data);
        return data;
    } catch (error) {
        console.error('Error registering:', error);
    }
}

export const updateBookmark = async (email, carparkID) => {
        await axios.get(`${URL}/api/user_account/update_bookmark/${email}/${carparkID}`)
        console.log("Bookmark successfully updated.")
};

export const fetchBookmark = async (email) => {
    try {
        const bookmarks = await axios.get(`${URL}/api/user_account/fetch_bookmark/${email}`)
        return bookmarks.data;
    } catch (error) {
        console.error('Error fetching carpark bookmarks', error);
        throw error;
    }
}
