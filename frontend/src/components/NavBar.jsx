import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link to="/" className="hover:text-blue-400">
          My App
        </Link>
      </h1>
      <div className="flex items-center">
        {user ? (
          <div className="flex items-center">
            <div className="mr-4">
              <Link to="/profile" className="hover:text-blue-400">
                Dashboard
              </Link>
            </div>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="mr-4 hover:text-blue-400">
              Login
            </Link>
            <Link to="/signup" className="hover:text-blue-400">
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
