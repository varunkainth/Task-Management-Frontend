/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { validateUser } from "@/utils/validation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "@/firebaseConfig";

const Login = () => {
  const [emailOrUserId, setEmailOrUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    emailOrUserId?: string;
    password?: string;
  }>({});

  const handleLogin = () => {
    const { error } = validateUser({
      email: emailOrUserId.includes("@") ? emailOrUserId : "",
      userId: !emailOrUserId.includes("@") ? emailOrUserId : "",
    });

    if (error) {
      const validationErrors = error.details.reduce((acc: any, err: any) => {
        const field = err.path[0];
        acc[field] = err.message;
        return acc;
      }, {});

      setErrors(validationErrors);
    } else {
      setErrors({});
      // Proceed with login logic
    }
  };

  const handleGoogleSignIn = async () => {
    // Handle Google Sign-In
    const result = await signInWithPopup(auth, googleAuthProvider);
    console.log(result);
  };

  const handleGitHubSignIn = () => {
    // Handle GitHub Sign-In
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-white">
          Login
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <Label className="text-white">Email or ID</Label>
            <Input
              type="text"
              id="emailOrUserId"
              placeholder="Email or User ID"
              value={emailOrUserId}
              onChange={(e) => setEmailOrUserId(e.target.value)}
              className="mt-2"
            />
            {errors.emailOrUserId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.emailOrUserId}
              </p>
            )}
          </div>
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
          <div className="flex justify-between text-sm mt-2">
            <a href="#" className="text-blue-400 hover:underline">
              Forgot Password?
            </a>
            <a href="#" className="text-blue-400 hover:underline">
              Forgot Username?
            </a>
          </div>
          <Button type="button" className="w-full mt-4" onClick={handleLogin}>
            Login
          </Button>
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
            <a href="#" className="text-blue-400 hover:underline ml-1">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
