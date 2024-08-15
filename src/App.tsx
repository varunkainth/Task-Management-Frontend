import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import HomePage from "@/pages/Home/home";
import AuthRoute from "@/features/protected/protectedRoute"; // Adjust this import path as needed
import { RootState } from '@/store'; // Adjust this import based on your project structure

// PublicRoute component (for login and register pages)
const PublicRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <AuthRoute element={<HomePage />} redirectPath="/login" />
        } />
        <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/register" element={<PublicRoute element={<Register />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;