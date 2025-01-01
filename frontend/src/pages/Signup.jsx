import React, { useState } from "react";
import { useAuth } from "../components/AuthProvider";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [usn, setUSN] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/signup", {
        email,
        usn,
        password,
      });

      login(response.data.data.accessToken);

      if (response.status === 201) {
        navigate("/register");
      } else {
        setError("Signup failed");
      }
    } catch (error) {
      let errorMessage = 'An unknown error occurred. Please try again.';
      if (error.response?.data) {
        const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
         errorMessage = matchedMessage || errorMessage;
      }
  
      console.error('Login failed:', errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-indigo-100 to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 space-y-8">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700">Create an Account</h2>
        <p className="text-center text-gray-600">Join us and start your journey!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
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
              className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              value={usn}
              onChange={(e) => setUSN(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign up
          </button>
        </form>
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-500 font-medium hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
          <p className="mt-4 text-gray-600">
            If you are a counsellor,{" "}
            <span className="text-indigo-500 font-medium hover:underline cursor-pointer">
              contact the admin
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
}
