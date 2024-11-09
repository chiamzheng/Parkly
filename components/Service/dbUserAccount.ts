const BASE_URL = 'http://10.0.2.2:8083/api/user_account'; // where your API server is hosted

// Returns -1 if the email already exists, 0 if the password is too weak, 1 if registration is successful.
export async function register(email: string, password: string): Promise<any> {
    try {
        const response = await fetch(`${BASE_URL}/register/${email}/${password}`);

        // Ensure the response is successful
        if (!response.ok) throw new Error('Failed to register');
        
        const data = await response.json();
        console.log('Value:', data);
        return data;
    } catch (error) {
        console.error('Error registering:', error);
    }
}