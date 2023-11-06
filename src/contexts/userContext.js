// src/contexts/UserContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define your initial user state
const initialUserState = {
  username: '',
  role: '',
  isAuthenticated: false,
  token: localStorage.getItem('token') || null, // Store the JWT token
};

// Create the UserContext
const UserContext = createContext();

// Define a user reducer function to manage user-related actions
const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return {
        ...initialUserState,
      };
    default:
      return state;
  }
};

// Create a UserProvider component to wrap your app with the UserContext
export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialUserState);

  // Add useEffect to persist user data (e.g., token) to local storage
  useEffect(() => {
    // Attempt to retrieve the token from localStorage
    const storedToken = localStorage.getItem('token');
    // console.log('Stored Token:', storedToken);
    // console.log(typeof storedToken)
    if (storedToken) {
      dispatch({ type: 'LOGIN', payload: { username: '', role: '', token: storedToken } });
    }
  }, []);
  
  

  useEffect(() => {
    // Update localStorage when the token changes
    if (user.token) {
      localStorage.setItem('token', user.token);
    } else {
      // Handle the case where the token is removed
      localStorage.removeItem('token');
    }
  }, [user.token]);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Define a custom hook to access the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
