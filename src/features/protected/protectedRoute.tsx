import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth'; // Adjust this path as needed

interface AuthRouteProps {
  element: React.ReactElement;
  redirectPath: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ 
  element, 
  redirectPath 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  console.log('AuthRoute - path:', location.pathname);
  console.log('AuthRoute - isAuthenticated:', isAuthenticated);
  console.log('AuthRoute - loading:', loading);

  if (loading) {
   
    return <div>Loading...</div>;
  }

  if (!isAuthenticated && redirectPath !== '/login') {
    console.log('Redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isAuthenticated && (redirectPath === '/login' || redirectPath === '/register')) {
    console.log('Redirecting to home');
    return <Navigate to="/" replace />;
  }

  // Render the provided element
  console.log('Rendering element');
  return element;
};

export default AuthRoute;