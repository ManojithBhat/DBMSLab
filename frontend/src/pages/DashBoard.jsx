import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/view/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUser(response.data.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );

  // Calculate cumulative activity points
  const cumulativeActivityPoints = user.participated.reduce(
    (total, event) => total + (event.activityPoints || 0),
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
        {user.role === 'admin' && (
          <button
            onClick={() => navigate('/addevent')}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 focus:outline-none"
          >
            Add Event
          </button>
        )}
      </header>

      {/* User Info */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">User Details</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
          <p>
            <span className="font-medium">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-medium">USN:</span> {user.usn}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Department:</span> {user.department}
          </p>
          <p>
            <span className="font-medium">Joined On:</span>{' '}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-medium">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-medium">Counsellor:</span>{' '}
            {user.counsellorId.username}
          </p>
          <p>
            <span className="font-medium">Activity Points:</span> {cumulativeActivityPoints}
          </p>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Participated Events</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Event Name</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Location</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Activity Points</th>
                <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Details</th>
              </tr>
            </thead>
            <tbody>
              {user.participated.map((event) => (
                <tr
                  key={event._id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="border border-gray-300 px-4 py-2">{event.eventName}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{event.location}</td>
                  <td className="border border-gray-300 px-4 py-2">{event.activityPoints || 0}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link
                      to={`/events/view/${event._id}`}
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      View Event
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
