import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-lg font-bold">My App</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.username}</span>
            <div className='mr-4'> <Link to='/dashboard'>Dashboard</Link></div>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/signup">Signup</Link>
            
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
