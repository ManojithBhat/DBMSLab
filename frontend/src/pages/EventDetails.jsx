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
  }, [eventId]) // Removed unnecessary dependency: user

  const handleDeleteEvent = async () => {
    try {
      await axiosInstance.delete(`/event/deleteEvent/${eventId}`)
      navigate("/")
    } catch (err) {
      setError("Failed to delete event")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-sm font-medium">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-sm text-red-500">{error}</div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-sm text-gray-500">Event not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Link to="/list-events" className="text-sm font-medium text-black hover:underline">
            ← Back to Events
          </Link>
          {user === "admin" && (
            <button
              onClick={() => navigate(`/add-volunteers/${eventId}`)}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Add Volunteers
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{event.eventName}</h1>
            <p className="mt-2 text-sm text-gray-600">{event.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="mt-1 text-sm font-medium">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="mt-1 text-sm font-medium">{event.location}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-medium text-gray-900">Event Lead</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="mt-1 text-sm font-medium">{event.lead.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">USN</p>
                  <p className="mt-1 text-sm font-medium">{event.lead.usn}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="mt-1 text-sm font-medium">{event.lead.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="mt-1 text-sm font-medium">{event.lead.email}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border"></div>
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Participants</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500">USN</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {event.participants.map((participant) => (
                    <tr key={participant._id} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-3 text-sm">{participant.usn}</td>
                      <td className="py-3 text-sm">{participant.email}</td>
                      <td className="py-3 text-sm">{participant.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {user === "admin" && (
          <div className="pt-4">
            <button
              onClick={() => setShowDeleteConfirmation(true)}
              className="w-full rounded-md border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 
                       hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                       transition-colors"
            >
              Delete Event
            </button>
          </div>
        )}

        {showDeleteConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4">
              <p className="text-sm font-medium text-gray-900">Are you sure you want to delete this event?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium 
                           hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                           transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteEvent}
                  className="flex-1 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white 
                           hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                           transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventDetailsPage

