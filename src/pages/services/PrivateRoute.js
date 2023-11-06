import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext'; // Import your user context

const PrivateRoute = ({ element }) => {
  const { user } = useUser(); // Access user information from the context

  if (user.isAuthenticated) {
    return element; // User is authenticated, render the protected route
  } else {
    return <Navigate to="/login" replace />; // User is not authenticated, redirect to the login page
  }
};

export default PrivateRoute;
