import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  login,
  register,
  logout,
  emailVerify,
  googleSignup,
  githubSignup,
  clearError,
  UsePasswordToken,
  CreatepasswordresetToken,
  VerifyPasswordToken,
  RefreshToken,
  RevokeRefreshToken,
} from "@/features/auth/authSlice";
import { LoginCredentials, RegisterCredentials, UserData } from "@/types/auth";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  // console.log(auth.user)

  const loginUser = useCallback(
    (credentials: LoginCredentials) => dispatch(login(credentials)),
    [dispatch]
  );

  const registerUser = useCallback(
    (userData: RegisterCredentials) => dispatch(register(userData)),
    [dispatch]
  );

  const logoutUser = useCallback(() => dispatch(logout()), [dispatch]);

  const verifyEmail = useCallback(
    (email: string) => dispatch(emailVerify(email)),
    [dispatch]
  );

  const signupWithGoogle = useCallback(
    (idToken: string) => dispatch(googleSignup(idToken)),
    [dispatch]
  );

  const signupWithGithub = useCallback(
    (idToken: string) => dispatch(githubSignup(idToken)),
    [dispatch]
  );

  const createResetToken = useCallback(
    (email: string) => {
      console.log(email);
      dispatch(CreatepasswordresetToken(email));
    },
    [dispatch]
  );

  const verifyResetToken = useCallback(
    (token: string) => dispatch(VerifyPasswordToken(token)),
    [dispatch]
  );

  const resetPassword = useCallback(
    async (userData: UserData) => {
      try {
        await dispatch(UsePasswordToken(userData)).unwrap();
        return auth.success;
      } catch (error) {
        console.error("Failed to use password reset token:", error);
        return false;
      }
    },
    [dispatch, auth.success]
  );

  const refreshUserToken = useCallback(
    (token: string) => dispatch(RefreshToken(token)),
    [dispatch]
  );

  const revokeUserToken = useCallback(
    (token: string) => dispatch(RevokeRefreshToken(token)),
    [dispatch]
  );

  const clearAuthError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    ...auth,
    loginUser,
    registerUser,
    logoutUser,
    verifyEmail,
    signupWithGoogle,
    signupWithGithub,
    createResetToken,
    verifyResetToken,
    resetPassword,
    refreshUserToken,
    revokeUserToken,
    clearAuthError,
  };
};

export default useAuth;
