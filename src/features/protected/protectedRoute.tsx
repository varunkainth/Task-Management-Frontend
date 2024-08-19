/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth"; // Adjust this path as needed

interface AuthRouteProps {
  element: React.ReactElement;
  redirectPath?: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element, redirectPath }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  if (
    !isAuthenticated &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (
    isAuthenticated &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    console.log("User is authenticated, redirecting to home");
    return <Navigate to="/" replace />;
  }

  // If no redirection is needed, render the provided element
  return element;
};

export default AuthRoute;
