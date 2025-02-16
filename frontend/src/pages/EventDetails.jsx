import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import { Link } from "react-router-dom"

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [user, setUser] = useState(null)
  const { eventId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(`/event/events/${eventId}`)
        setEvent(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch event details")
        setLoading(false)
      }
    }

    const checkAdmin = async () => {
      try {
        const response = await axiosInstance.get("/auth/check-admin")
        setUser(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch user details")
        setLoading(false)
      }
    }

    fetchEventDetails()
    checkAdmin()
  }, [eventId])

  const handleDeleteEvent = async () => {
    try {
      await axiosInstance.delete(`/event/deleteEvent/${eventId}`)
      navigate("/")
    } catch (err) {
      setError("Failed to delete event")
    }
  }

  if (loading) {
    return <div className="p-4 text-sm">Loading...</div>
  }

  if (error) {
    return <div className="p-4 text-sm text-red-500">{error}</div>
  }

  if (!event) {
    return <div className="p-4 text-sm text-gray-500">Event not found</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex justify-between items-center">
        <Link to="/list-events" className="text-sm text-gray-600 hover:text-gray-900">
          ← Back to Events
        </Link>
        {user === "admin" && (
          <button
            onClick={() => navigate(`/add-volunteers/${eventId}`)}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded hover:bg-gray-800"
          >
            Add Volunteers
          </button>
        )}
      </div>

      <div className="mb-8">
        <h1 className="text-xl font-medium mb-2">{event.eventName}</h1>
        <p className="text-gray-600">{event.description}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <table className="min-w-full">
          <tbody>
            <tr>
              <td className="py-2 text-sm text-gray-600">Date</td>
              <td className="py-2 text-sm">{new Date(event.date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="py-2 text-sm text-gray-600">Location</td>
              <td className="py-2 text-sm">{event.location}</td>
            </tr>
          </tbody>
        </table>

        <table className="min-w-full">
          <tbody>
            <tr>
              <td className="py-2 text-sm text-gray-600">Lead Name</td>
              <td className="py-2 text-sm">{event.lead.username}</td>
            </tr>
            <tr>
              <td className="py-2 text-sm text-gray-600">USN</td>
              <td className="py-2 text-sm">{event.lead.usn}</td>
            </tr>
            <tr>
              <td className="py-2 text-sm text-gray-600">Department</td>
              <td className="py-2 text-sm">{event.lead.department}</td>
            </tr>
            <tr>
              <td className="py-2 text-sm text-gray-600">Email</td>
              <td className="py-2 text-sm">{event.lead.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
        <div className="border"></div>
      <div>
        <h2 className="text-lg font-medium mb-4">Participants</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 text-left text-sm font-medium text-gray-600">USN</th>
                <th className="py-3 text-left text-sm font-medium text-gray-600">Name</th>
                <th className="py-3 text-left text-sm font-medium text-gray-600">Role</th>
              </tr>
            </thead>
            <tbody>
              {event.participants.map((participant) => (
                <tr key={participant._id} className="border-b last:border-b-0">
                  <td className="py-3 text-sm">{participant.usn}</td>
                  <td className="py-3 text-sm">{participant.email}</td>
                  <td className="py-3 text-sm">{participant.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user === "admin" && (
        <div className="mt-8">
          <button onClick={() => setShowDeleteConfirmation(true)} className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
            Delete Event
          </button>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded max-w-sm w-full">
            <p className="text-sm mb-4">Are you sure you want to delete this event?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="flex-1 px-4 py-2 text-sm border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="flex-1 px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventDetailsPage