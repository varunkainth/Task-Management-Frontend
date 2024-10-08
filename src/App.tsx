import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import HomePage from "./pages/Home/home";
import AuthRoute from "./features/protected/protectedRoute";
import ForgotPassword from "./pages/auth/password/forgotPassword";
import ResetPasswordForm from "./pages/auth/password/resetPassword";
import Navbar from "./pages/Home/Navbar/navbar";
import ProfilePage from "./pages/Profile/profile";
import Dashboard from "./pages/Dashboard/dashboard";
import ProjectCreate from "./pages/projects/createProject";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Protected route for the home page - only accessible to authenticated users */}
        <Route
          path="/"
          element={<AuthRoute element={<HomePage />} redirectPath="/login" />}
        />

        {/* Public route for login - only accessible to unauthenticated users */}
        <Route
          path="/login"
          element={<AuthRoute element={<Login />} redirectPath="/" />}
        />

        {/* Public route for registration - only accessible to unauthenticated users */}
        <Route
          path="/register"
          element={<AuthRoute element={<Register />} redirectPath="/" />}
        />

        {/* Public route for forgot password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Public route for reset password */}
        <Route path="/reset-password/:token" element={<ResetPasswordForm />} />

        {/* Protected route for the Profile page - only accessible to authenticated users */}
        <Route
          path="/profile"
          element={
            <AuthRoute element={<ProfilePage />} redirectPath="/login" />
          }
        />

        <Route
          path="/dashboard"
          element={<AuthRoute element={<Dashboard />} redirectPath="/login" />}
        />
        <Route
          path="/project/create"
          element={
            <AuthRoute element={<ProjectCreate />} redirectPath="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
