import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('/auth/login', credentials);
      login(data.data.accessToken);
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-2 mb-4 border rounded"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-4 border rounded"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
