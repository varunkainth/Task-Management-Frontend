import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  login,
  register,
  logout,
  googleSignup,
  githubSignup,
  emailVerify,
  clearError,
} from "@/features/auth/authSlice";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const loginUser = (credentials: LoginCredentials) =>
    dispatch(login(credentials));
  const registerUser = (userData: RegisterCredentials) =>
    dispatch(register(userData));
  const logoutUser = () => dispatch(logout());
  const signupWithGoogle = (idToken: string) => dispatch(googleSignup(idToken));
  const signupWithGithub = (idToken: string) => dispatch(githubSignup(idToken));
  const clearAuthError = () => dispatch(clearError());

  const verifyEmail = async (email: string) => {
    await dispatch(emailVerify(email));
    return auth.success;
  };

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    error: auth.error,
    success: auth.success,
    loginUser,
    registerUser,
    logoutUser,
    signupWithGoogle,
    signupWithGithub,
    clearAuthError,
    verifyEmail,
  };
};

export default useAuth;
