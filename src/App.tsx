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
        <Route path="/" element={<AuthRoute element={<HomePage />} redirectPath="/login" />} />
        <Route path="/login" element={<AuthRoute element={<Login />} redirectPath="/" />} />
        <Route path="/register" element={<AuthRoute element={<Register />} redirectPath="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;