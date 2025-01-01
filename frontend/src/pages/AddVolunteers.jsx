import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const EventDetailsPage = () => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newVolunteerUSN, setNewVolunteerUSN] = useState('');
    const [addingVolunteer, setAddingVolunteer] = useState(false);
    const [addVolunteerError, setAddVolunteerError] = useState(null);
    const [deleteVolunteerError, setDeleteVolunteerError] = useState(null);
    const { eventId } = useParams();

    useEffect(() => {
        fetchEventDetails();
    }, [eventId]);

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

    const addVolunteer = async (e) => {
        e.preventDefault();
        setAddingVolunteer(true);
        setAddVolunteerError(null);
        try {
            await axiosInstance.post(`/event/addVolunteer/${eventId}`, { usn: newVolunteerUSN });
            setNewVolunteerUSN('');
            fetchEventDetails(); // Refresh event details
        } catch (error) {
            let errorMessage = 'An unknown error occurred. Please try again.';
            if (error.response?.data) {
              const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
               errorMessage = matchedMessage || errorMessage;
            }
        
            console.error(errorMessage);
            setAddVolunteerError(errorMessage);
        } finally {
            setAddingVolunteer(false);
        }
    };

    const deleteVolunteer = async (volunteerUSN) => {
        setDeleteVolunteerError(null);
        try {
            await axiosInstance.delete(`/event/removeVolunteer/${eventId}`, { data: { usn: volunteerUSN } });
            fetchEventDetails(); // Refresh event details
        } catch (error) {
            let errorMessage = 'An unknown error occurred. Please try again.';
            if (error.response?.data) {
              const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
               errorMessage = matchedMessage || errorMessage;
            }
        
            console.error('Login failed:', errorMessage);
            setDeleteVolunteerError(errorMessage);
        }
    };

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
            <Link to={`/events/view/${eventId}`} className="text-blue-600 hover:underline">Back to Events</Link>
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

            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Add Volunteer</h2>
                <form onSubmit={addVolunteer} className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={newVolunteerUSN}
                        onChange={(e) => setNewVolunteerUSN(e.target.value)}
                        placeholder="Enter USN"
                        className="flex-grow px-3 py-2 border rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        disabled={addingVolunteer}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
                    >
                        {addingVolunteer ? 'Adding...' : 'Add Volunteer'}
                    </button>
                </form>
                {addVolunteerError && <p className="mt-2 text-red-500">{addVolunteerError}</p>}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Participants</h2>
                {deleteVolunteerError && <p className="mb-2 text-red-500">{deleteVolunteerError}</p>}
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">USN</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {event.participants.map((participant) => (
                                <tr key={participant._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 whitespace-nowrap">{participant.usn}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{participant.email}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{participant.role}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => deleteVolunteer(participant.usn)}
                                            className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                            aria-label={`Delete ${participant.usn}`}
                                        >
                                            Delete
                                        </button>
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

export default EventDetailsPage;