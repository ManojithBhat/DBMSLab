import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [usn, setUSN] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axiosInstance.post('/auth/signup', {
        email,
        usn,
        password,
      });

      login(response.data.data.accessToken);

      if (response.status === 201) {
        navigate('/register');
      } else {
        setError('Signup failed');
      }
    } catch (error) {
      let errorMessage = 'An unknown error occurred. Please try again.';
      if (error.response?.data) {
        const matchedMessage =
          error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
        errorMessage = matchedMessage || errorMessage;
      }

      console.error('Signup failed:', errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-purple-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-4">Sign Up</h2>
        <p className="text-center text-gray-500 mb-8">
          Create an account to join our community
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="usn" className="block text-sm font-medium text-gray-700">
              USN
            </label>
            <input
              id="usn"
              type="text"
              required
              placeholder="Enter your USN"
              className="mt-2 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={usn}
              onChange={(e) => setUSN(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative mt-2">
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Confirm your password"
                className="block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-indigo-500 font-medium hover:underline cursor-pointer"
            >
              Log In
            </span>
          </p>
          <p className="mt-4 text-gray-600">
            Are you a counsellor?{' '}
            <span className="text-indigo-500 font-medium hover:underline cursor-pointer">
              Contact Admin
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
