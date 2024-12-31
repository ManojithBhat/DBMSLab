import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestRoutes = () => {
  const navigate = useNavigate();

  const routes = [
    { path: '/', label: 'Home Page' },
    { path: '/signup', label: 'Signup Page' },
    { path: '/register', label: 'Register Page' },
    { path: '/counsellor/signup', label: 'Counsellor Signup' },
    { path: '/counsellor/login', label: 'Counsellor Login' },
    { path: '/login', label: 'Login Page' },
    { path: '/profile', label: 'Dashboard (Protected)' },
    { path: '/profile/counsellor', label: 'Counsellor Profile' },
    { path: '/events/view/1', label: 'Event Details (Sample ID: 1)' },
    { path: '/addevent', label: 'Add Event' },
    { path: '/list-events', label: 'List Events' },
    { path: '/add-volunteers/1', label: 'Add Volunteers (Sample ID: 1)' },
    { path: '/students/1234', label: 'Dashboard USN (Sample USN: 1234)' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Routes</h1>
      {routes.map((route) => (
        <button
          key={route.path}
          onClick={() => navigate(route.path)}
          style={{
            display: 'block',
            margin: '10px 0',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {route.label}
        </button>
      ))}
    </div>
  );
};

export default TestRoutes;
