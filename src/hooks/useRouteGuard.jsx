// src/hooks/useRouteGuard.js
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from './contexts/UserContext'; // Assuming you have a UserContext

function useRouteGuard(allowedRoles) {
  const location = useLocation();
  const { user } = useContext(UserContext);

  // Check if the user has the required role for the current route
  const hasRequiredRole = allowedRoles.includes(user.role);

  if (!hasRequiredRole) {
    // Redirect to a "Permission Denied" page or another appropriate route
    return <Navigate to="/permission-denied" />;
  }

  return null;
}

export default useRouteGuard;
