/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { validateUser } from "@/utils/validation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider, githubAuthProvider } from "@/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [debouncedEmail, setDebouncedEmail] = useState<string>("");

  const navigate = useNavigate();
  const {
    loginUser,
    signupWithGoogle,
    signupWithGithub,
    verifyEmail,
    loading,
    success,
    user,
  } = useAuth();

  // Debounce email input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedEmail(email);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [email]);

  useEffect(() => {
    const handleEmailVerification = async () => {
      if (debouncedEmail) {
        const isVerified = await verifyEmail(debouncedEmail);
        if (!isVerified) {
          navigate(`/register?email=${debouncedEmail}`);
        }
      }
    };
    handleEmailVerification();
  }, [debouncedEmail, verifyEmail, navigate]);

  const handleLogin = () => {
    const { error } = validateUser({ email });

    if (error) {
      const validationErrors = error.details.reduce((acc: any, err: any) => {
        const field = err.path[0];
        acc[field] = err.message;
        return acc;
      }, {});

      setErrors(validationErrors);
    } else {
      setErrors({});
      loginUser({ email, password });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const idToken = await result.user.getIdToken();
      signupWithGoogle(idToken);
    } catch (err) {
      console.error("Google Sign-In Error: ", err);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubAuthProvider);
      const idToken = await result.user.getIdToken();
      signupWithGithub(idToken);
    } catch (err) {
      console.error("GitHub Sign-In Error: ", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-white">
          Login
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-white">Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          {loading && (
            <p className="text-blue-500 text-sm mt-1">
              Checking registration...
            </p>
          )}
          {user && success && (
            <div className="relative">
              <Label className="text-white">Password</Label>
              <Input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 focus:outline-none"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          )}
          {!loading && !user && (
            <Button
              type="button"
              className="w-full mt-4"
              onClick={() => navigate(`/register?email=${email}`)}
            >
              Register
            </Button>
          )}
          {user && success && (
            <Button type="button" className="w-full mt-4" onClick={handleLogin}>
              Login
            </Button>
          )}
          <div className="flex flex-col gap-2 mt-4">
            <Button
              variant="outline"
              className={cn("flex items-center justify-center gap-2")}
              onClick={handleGoogleSignIn}
            >
              <FcGoogle />
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              className={cn("flex items-center justify-center gap-2")}
              onClick={handleGitHubSignIn}
            >
              <FaGithub />
              Sign in with GitHub
            </Button>
          </div>
          <div className="text-center mt-4 text-white">
            <span>Don't have an account?</span>
            <Link to="/register" className="text-blue-400 hover:underline ml-1">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
