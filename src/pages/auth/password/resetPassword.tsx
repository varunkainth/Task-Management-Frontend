import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [tokenVerified, setTokenVerified] = useState(false);
  const { user, verifyResetToken, resetPassword,success } = useAuth();
  const navigate = useNavigate();
  const { token } = useParams(); // Assuming token is passed as a URL parameter

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
         await verifyResetToken(token as string);
        if (!success) {
          setError('Invalid or expired reset token.');
        } else {
          setTokenVerified(true);
        }
      }
    };
    verifyToken();
  }, [success, token, verifyResetToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!user) {
      setError('User information is missing.');
      return;
    }

    const success = await resetPassword({
      password: newPassword,
      token: token as string,
    });

    if (success) {
      navigate('/login'); // Redirect to login page after successful password reset
    } else {
      setError('Failed to reset password. Please try again.');
    }
  };

  if (!tokenVerified) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error || 'Verifying token...'}</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6">Reset Your Password</h2>
        {user && (
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="mt-1 block w-full"
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Button
          type="submit"
          disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
          className="w-full bg-blue-600 text-white"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
