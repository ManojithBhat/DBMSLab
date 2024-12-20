import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance'; // Import axiosInstance

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: '',
    description: '',
    location: '',
    date: '',
    activityPoints: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axiosInstance.post('/event/addevent', eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Ensure the token is included
        },
      });

      if (data.status === 201) {
        // On success, navigate to the event's detail page
        navigate(`/events/view/${data.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Add New Event</h2>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="eventName">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={eventData.eventName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            rows="4"
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={eventData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={eventData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="activityPoints">
            Activity Points
          </label>
          <input
            type="number"
            id="activityPoints"
            name="activityPoints"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={eventData.activityPoints}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg focus:outline-none hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Creating Event...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
