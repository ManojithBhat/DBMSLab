import React, { useState, useEffect } from "react"
import axiosInstance from "../api/axiosInstance"
import { Link } from "react-router-dom"

const EventsPage = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/event/events")
        setEvents(response.data.data)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch events")
        setLoading(false)
      }
    }

    const checkAdmin = async () => {
      if(document.cookie.includes("accessToken")){
        try {  
          const response = await axiosInstance.get("/auth/check-admin")
          setUser(response.data.data)
          setLoading(false)
        } catch (err) {
          setError("Failed to fetch user details")
          setLoading(false)
        }
        console.log(user)
      }
    }
    checkAdmin()

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-sm text-gray-500">Loading...</div>
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Events</h1>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {["Event Name", "Date", "Location", "Activity Points", "Participants"].map((heading, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event, index) => (
                  <tr key={event._id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link to={`/events/view/${event._id}`} className="text-gray-900 hover:text-gray-600 font-medium">
                        {event.eventName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.activityPoints || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.participants.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
       {user === "admin" && <div className="mt-8">
          <Link
            to="/create-event"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Create New Event
          </Link>
        </div>}
      </div>
    </div>
  )
}

export default EventsPage

