import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/event/events");
        setEvents(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-lg font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-lg font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Events
      </h1>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              {["Event Name", "Date", "Location", "Activity Points", "Participants"].map(
                (heading, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr
                key={event._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/events/view/${event._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {event.eventName}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.activityPoints || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {event.participants.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Call to Action */}
      <div className="mt-8 flex justify-center">
        <Link
          to="/create-event"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Create New Event
        </Link>
      </div>
    </div>
  );
};

export default EventsPage;
