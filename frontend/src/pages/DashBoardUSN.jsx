import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usn } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/view/profile/${usn}`, {
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
  }, [usn]);

  if (loading) 
    return <div className="flex justify-center items-center h-screen text-lg font-medium">Loading...</div>;
  if (error) 
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* User Info */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">User Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-gray-700">
            <span className="font-medium">Username:</span> {user.username}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">USN:</span> {user.usn}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Department:</span> {user.department}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Joined On:</span> {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Role:</span> {user.role}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Counsellor:</span> {user.counsellorId.username}
          </p>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-6">Participated Events</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 border-b">Event Name</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Location</th>
                <th className="py-3 px-4 border-b">Details</th>
              </tr>
            </thead>
            <tbody>
              {user.participated.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-gray-700">{event.eventName}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b text-gray-700">{event.location}</td>
                  <td className="py-3 px-4 border-b">
                    <Link
                      to={`/events/view/${event._id}`}
                      className="text-indigo-500 hover:underline font-medium"
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
