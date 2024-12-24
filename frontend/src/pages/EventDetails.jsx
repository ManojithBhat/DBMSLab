import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(`/event/events/${eventId}`);
        console.log(response);
        setEvent(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch event details');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!event) {
    return <div className="flex justify-center items-center h-screen">Event not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">{event.eventName}</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
            <p><span className="font-semibold">Location:</span> {event.location}</p>
            <p><span className="font-semibold">Description:</span> {event.description}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Event Lead</h3>
            <p><span className="font-semibold">Name:</span> {event.lead.username}</p>
            <p><span className="font-semibold">USN:</span> {event.lead.usn}</p>
            <p><span className="font-semibold">Department:</span> {event.lead.department}</p>
            <p><span className="font-semibold">Email:</span> {event.lead.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Participants</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">USN</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {event.participants.map((participant) => (
                <tr key={participant._id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">{participant.usn}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{participant.email}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{participant.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;