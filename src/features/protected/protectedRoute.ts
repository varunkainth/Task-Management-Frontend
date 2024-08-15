import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store'; 

interface AuthRouteProps {
  element: React.ReactElement;
  redirectPath?: string;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ element, redirectPath = '/' }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    return React.createElement(Navigate, {
      to: redirectPath,
      state: { from: location },
      replace: true
    });
  }

  return element;
};

export default AuthRoute;