import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [user, setUser] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(`/event/events/${eventId}`);
        setEvent(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };

    const checkAdmin = async () => {
      try {
        const response = await axiosInstance.get('/auth/check-admin');
        setUser(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user details');
        setLoading(false);
      }
    };

    fetchEventDetails();
    checkAdmin();
  }, [eventId, user]);

  const handleDeleteEvent = async () => {
    try {
      await axiosInstance.delete(`/event/deleteEvent/${eventId}`);
      navigate('/');
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg font-semibold">
        Event not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link
          to={`/list-events`}
          className="text-indigo-600 hover:underline text-lg font-medium"
        >
          &larr; Back to Events
        </Link>
        {user === 'admin' && (
          <button
            onClick={() => navigate(`/add-volunteers/${eventId}`)}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
          >
            Add Volunteers
          </button>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
          {event.eventName}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {event.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Location:</span> {event.location}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Event Lead</h2>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Name:</span> {event.lead.username}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">USN:</span> {event.lead.usn}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Department:</span> {event.lead.department}
            </p>
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold">Email:</span> {event.lead.email}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Participants</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">USN</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
              </tr>
            </thead>
            <tbody>
              {event.participants.map((participant) => (
                <tr key={participant._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-700">{participant.usn}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{participant.email}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{participant.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user === 'admin' && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
          >
            Delete Event
          </button>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Are you sure you want to delete this event?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg shadow-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
