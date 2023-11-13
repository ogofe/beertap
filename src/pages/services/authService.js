// authService.js
// import { API_URL } from '../../App';
import axios from 'axios';

const apiUrl = `https://beer.binsoft.online/api/users`;

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { username, password });
    return response; // Return the full response object
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // Throw the error to be handled in the component
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // Return true if a token is present, indicating the user is authenticated
};

export const loginWithToken = async (token) => {
  try {
    // Simulate a token validation request
    const response = await axios.post(`${apiUrl}/validate-token`, { token });

    if (response.status === 200 && response.data.valid) {
      // Token is valid, retrieve user data if needed
      const userResponse = await axios.get(`${apiUrl}/user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse.status === 200) {
        const userData = userResponse.data;

        // You can return user data or store it as needed
        return { token, userData };
      }
    }

    throw new Error('Token validation failed');
  } catch (error) {
    throw error; // Throw the error to be handled in the component
  }
};
