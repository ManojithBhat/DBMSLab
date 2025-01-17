import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

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
      const response = await axiosInstance.post('/event/addevent', eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Ensure the token is included
        },
      });
      if (response.data.statusCode === 200) {
        navigate(`/events/view/${response.data.data._id}`);
      }
    } catch (error) {
      let errorMessage = 'An unknown error occurred. Please try again.';
      if (error.response?.data) {
        const matchedMessage =
          error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
        errorMessage = matchedMessage || errorMessage;
      }

      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Add New Event
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="eventName" className="block text-lg font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventData.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-lg font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-lg font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="activityPoints" className="block text-lg font-medium text-gray-700">
              Activity Points
            </label>
            <input
              type="number"
              id="activityPoints"
              name="activityPoints"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventData.activityPoints}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </div>
        </form>

        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default AddEvent;
