import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthProvider";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { user, login } = useAuth();
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/auth/login", credentials);
      login(data.data.accessToken);
      window.location.href = "/profile";
    } catch (error) {
      let errorMessage = "An unknown error occurred. Please try again.";
      if (error.response?.data) {
        const matchedMessage =
          error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
        errorMessage = matchedMessage || errorMessage;
      }
      console.error("Login failed:", errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-4">
          Welcome Back!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Log in to your account to continue your NSS journey.
        </p>
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-400">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
        <p className="text-center text-gray-600 mt-3">
          <a
            href="/counsellor/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Counsellor login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
