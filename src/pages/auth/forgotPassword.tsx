import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const { createResetToken, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    try {
      await createResetToken(email);
      // You can add any success handling here, like showing a confirmation message
    } catch (err) {
      // Error handling is done in useAuth, so you can optionally handle it here
      console.error('Failed to send reset token:', err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-4 text-white">
          Forgot Password
        </h2>
        <p className="text-center mb-6 text-white">
          Enter your email address below and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-input"
            required
          />
          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p>
          )}
          <Button
            type="submit"
            className="w-full mt-4 transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Continue'}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-blue-400 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
