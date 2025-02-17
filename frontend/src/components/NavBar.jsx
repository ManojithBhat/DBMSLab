import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Navbar = () => {
  const { user, logout } = useAuth();
  const isCounsellor = user?._id;

  return (
    <header className="border-b border-gray-200">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="font-semibold text-gray-900">
            NSS RVCE
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/features"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              to="/list-events"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Events
            </Link>
            <Link
              to="/about"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              to="/complaints"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Complaints
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link
                to={isCounsellor ? '/profile/counsellor' : '/profile'}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
