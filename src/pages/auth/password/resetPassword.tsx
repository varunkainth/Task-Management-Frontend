import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [tokenVerified, setTokenVerified] = useState<boolean>(false);
  const [decodedToken, setDecodedToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { verifyResetToken, resetPassword, success, message } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams<{ token?: string }>(); // Token from URL parameters
  const location = useLocation(); // To access query parameters

  // Extract email from query string
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (token) {
      try {
        const decoded = decodeURIComponent(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        setError("Failed to decode token.");
      }
    }
  }, [token]);

  useEffect(() => {
    const verifyToken = async () => {
      if (decodedToken) {
        await verifyResetToken(decodedToken);
        if (!success) {
          setError("Invalid or expired reset token.");
          setTokenVerified(false);
        } else {
          setTokenVerified(true);
        }
      }
    };
    verifyToken();
  }, [decodedToken, success, verifyResetToken]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!email) {
      setError("Email is missing.");
      return;
    }

    await resetPassword({
      newPassword: newPassword,
      token: token as string,
    });

    if (success) {
      navigate("/login"); // Redirect to login page after successful password reset
    } else {
      setError("Failed to reset password. Please try again.");
    }
  };

  if (!tokenVerified) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-red-500">{error || "Verifying token..."}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {success ? (
        <form
          className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-100">Reset Your Password</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
          {success && (
            <>
              <div className="mb-4 relative">
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-300"
                >
                  New Password
                </label>
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
              <div className="mb-6 relative">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Confirm New Password
                </label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full bg-gray-700 border-gray-600 text-gray-100 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-300"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>
              </div>
            </>
          )}
          {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
          <Button
            type="submit"
            disabled={
              !success || // Disable button if success is false
              !newPassword ||
              !confirmPassword ||
              newPassword !== confirmPassword
            }
            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            Reset Password
          </Button>
        </form>
      ) : (
        <div className="text-red-500">{error || "Failed to verify token."}</div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
