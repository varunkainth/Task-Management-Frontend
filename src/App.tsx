import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import HomePage from "./pages/Home/home";
import AuthRoute from "./features/protected/protectedRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected route for the home page - only accessible to authenticated users */}
        <Route path="/" element={<AuthRoute element={<HomePage />} redirectPath="/login" />} />

        {/* Public route for login - only accessible to unauthenticated users */}
        <Route path="/login" element={<AuthRoute element={<Login />} redirectPath="/" />} />

        {/* Public route for registration - only accessible to unauthenticated users */}
        <Route path="/register" element={<AuthRoute element={<Register />} redirectPath="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
