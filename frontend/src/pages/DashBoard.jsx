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
        console.log(response.data.data);
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

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* User Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>
        <div className="grid grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Participated Events</h2>
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2">Event Name</th>
              <th className="border border-gray-200 p-2">Date</th>
              <th className="border border-gray-200 p-2">Location</th>
              <th className="border border-gray-200 p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {user.participated.map((event) => (
              <tr key={event._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 p-2">
                  {event.eventName}
                </td>
                <td className="border border-gray-200 p-2">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="border border-gray-200 p-2">{event.location}</td>
                <td className="border border-gray-200 p-2">
                  <Link
                    to={`/events/view/${event._id}`}
                    className="text-blue-500 underline"
                  >
                    View Event
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {user.role === 'admin' && (
        <div className="text-right mt-6">
          <button
            onClick={() => navigate('/addevent')}
            className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
