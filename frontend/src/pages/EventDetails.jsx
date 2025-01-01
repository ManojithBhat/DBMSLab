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
      navigate('/'); // Redirect to homepage after deletion
    } catch (err) {
      setError('Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        Event not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to={`/list-events`} className="text-blue-600 hover:underline">
        Back to Events
      </Link>
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        {event.eventName}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <span className="font-semibold">Date:</span>{' '}
              {new Date(event.date).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Location:</span> {event.location}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{' '}
              {event.description}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Event Lead</h3>
            <p>
              <span className="font-semibold">Name:</span> {event.lead.username}
            </p>
            <p>
              <span className="font-semibold">USN:</span> {event.lead.usn}
            </p>
            <p>
              <span className="font-semibold">Department:</span>{' '}
              {event.lead.department}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {event.lead.email}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Participants</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  USN
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {event.participants.map((participant) => (
                <tr key={participant._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    {participant.usn}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {participant.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {participant.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin delete button */}
      {user === 'admin' && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowDeleteConfirmation(true)}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg"
          >
            Delete Event
          </button>

          <button
            onClick={() => navigate(`/add-volunteers/${eventId}`)}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg ml-10"
          >
            Add Volunteers
          </button>
        </div>
      )}

      {/* Delete confirmation dialog */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this event?
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
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
