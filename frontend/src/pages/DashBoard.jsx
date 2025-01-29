import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/view/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        setUser(response.data.data)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch user data")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-sm font-medium">Loading...</div>
      </div>
    )

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-sm text-red-500">{error}</div>
      </div>
    )

  // Calculate cumulative activity points
  const cumulativeActivityPoints = user.participated.reduce((total, event) => total + (event.activityPoints || 0), 0)

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          {user.role === "admin" && (
            <button
              onClick={() => navigate("/addevent")}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-900 
                       transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Add Event
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">User Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-500">Username</p>
              <p className="font-medium">{user.username}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">USN</p>
              <p className="font-medium">{user.usn}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Department</p>
              <p className="font-medium">{user.department}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Joined On</p>
              <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Role</p>
              <p className="font-medium">{user.role}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Counsellor</p>
              <p className="font-medium">{user.counsellorId.username}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Activity Points</p>
              <p className="font-medium">{cumulativeActivityPoints}</p>
            </div>
          </div>
        </div>

          <div className="border"></div>
        {/* Events Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Participated Events</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Event Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Points</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Details</th>
                </tr>
              </thead>
              <tbody>
                {user.participated.map((event) => (
                  <tr key={event._id} className="border-b last:border-b-0">
                    <td className="py-3 px-4">{event.eventName}</td>
                    <td className="py-3 px-4">{new Date(event.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{event.location}</td>
                    <td className="py-3 px-4">{event.activityPoints || 0}</td>
                    <td className="py-3 px-4">
                      <Link to={`/events/view/${event._id}`} className="text-black hover:underline font-medium">
                        View Event
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

