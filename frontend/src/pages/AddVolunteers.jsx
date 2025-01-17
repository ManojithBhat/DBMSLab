import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Html5Qrcode } from "html5-qrcode";

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newVolunteerUSN, setNewVolunteerUSN] = useState('');
  const [addingVolunteer, setAddingVolunteer] = useState(false);
  const [addVolunteerError, setAddVolunteerError] = useState(null);
  const [deleteVolunteerError, setDeleteVolunteerError] = useState(null);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [scanner, setScanner] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    fetchEventDetails();
    return () => {
      if (scanner) {
        scanner.stop().catch(error => console.error('Error stopping scanner:', error));
      }
    };
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

  const startScanner = async () => {
    try {
      if (scanner) {
        await scanner.stop();
      }

      let scannerContainer = document.getElementById('reader');
      if (!scannerContainer) {
        scannerContainer = document.createElement('div');
        scannerContainer.id = 'reader';
        document.getElementById('scanner-container').appendChild(scannerContainer);
      }

      const newScanner = new Html5Qrcode('reader');
      setScanner(newScanner);
      setIsScannerActive(true);

      const config = {
        fps: 10,
        qrbox: { width: 600, height: 250 },
        aspectRatio: 1.0
      };

      await newScanner.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          setNewVolunteerUSN(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          console.log("QR Code scanning in progress...");
        }
      );
    } catch (err) {
      setIsScannerActive(false);
    }
  };

  const stopScanner = async () => {
    if (scanner) {
      try {
        await scanner.stop();
        setIsScannerActive(false);
        setScanner(null);

        const scannerContainer = document.getElementById('reader');
        if (scannerContainer) {
          scannerContainer.innerHTML = '';
        }
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  const addVolunteer = async (e) => {
    e.preventDefault();
    setAddingVolunteer(true);
    setAddVolunteerError(null);
    try {
      await axiosInstance.post(`/event/addVolunteer/${eventId}`, {
        usn: newVolunteerUSN,
      });
      setNewVolunteerUSN('');
      fetchEventDetails();
    } catch (error) {
      let errorMessage = 'An unknown error occurred. Please try again.';
      if (error.response?.data) {
        const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
        errorMessage = matchedMessage || errorMessage;
      }
      setAddVolunteerError(errorMessage);
    } finally {
      setAddingVolunteer(false);
    }
  };

  const deleteVolunteer = async (volunteerUSN) => {
    setDeleteVolunteerError(null);
    try {
      await axiosInstance.delete(`/event/removeVolunteer/${eventId}`, {
        data: { usn: volunteerUSN },
      });
      fetchEventDetails();
    } catch (error) {
      let errorMessage = 'An unknown error occurred. Please try again.';
      if (error.response?.data) {
        const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
        errorMessage = matchedMessage || errorMessage;
      }
      setDeleteVolunteerError(errorMessage);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-500">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  if (!event) return <div className="flex justify-center items-center h-screen text-gray-500">Event not found</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <Link to={`/events/view/${eventId}`} className="text-blue-600 hover:underline text-lg mb-4 inline-block">
        Back to Events
      </Link>
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        {event.eventName}
      </h1>

      {/* Event Details */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg mb-2"><span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Location:</span> {event.location}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Description:</span> {event.description}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Event Lead</h3>
            <p className="text-lg"><span className="font-semibold">Name:</span> {event.lead.username}</p>
            <p className="text-lg"><span className="font-semibold">USN:</span> {event.lead.usn}</p>
            <p className="text-lg"><span className="font-semibold">Department:</span> {event.lead.department}</p>
            <p className="text-lg"><span className="font-semibold">Email:</span> {event.lead.email}</p>
          </div>
        </div>
      </div>

      {/* Add Volunteer */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Add Volunteer</h2>
        <form onSubmit={addVolunteer} className="flex flex-col space-y-6">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newVolunteerUSN}
              onChange={(e) => setNewVolunteerUSN(e.target.value)}
              placeholder="Enter USN"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={isScannerActive ? stopScanner : startScanner}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            >
              {isScannerActive ? 'Stop Scan' : 'Scan Barcode'}
            </button>
          </div>
          {/* QR Code Scanner */}
          <div id="scanner-container" className="w-full mt-4">
            {isScannerActive && <div id="reader" className="w-full h-64"></div>}
          </div>
          <button
            type="submit"
            disabled={addingVolunteer}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {addingVolunteer ? 'Adding...' : 'Add Volunteer'}
          </button>
        </form>
        {addVolunteerError && (
          <p className="mt-4 text-red-500 text-lg">{addVolunteerError}</p>
        )}
      </div>

      {/* Volunteers List */}
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6">Participants</h2>
        {deleteVolunteerError && (
          <p className="mb-4 text-red-500 text-lg">{deleteVolunteerError}</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">USN</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {event.participants.map((participant) => (
                <tr key={participant._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{participant.usn}</td>
                  <td className="px-6 py-4">{participant.email}</td>
                  <td className="px-6 py-4">{participant.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteVolunteer(participant.usn)}
                      className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
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
