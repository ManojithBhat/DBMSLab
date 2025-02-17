import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    eventName: "",
    description: "",
    location: "",
    date: "",
    activityPoints: "",
    poc: "",
  })
  const [pocList, setPocList] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPOCs = async () => {
      try {
        const response = await axiosInstance.get("/poc/list-poc", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        if (response.data.statusCode === 200) {
          setPocList(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching POCs:", error)
        setError("Failed to load POC list. Please refresh the page.")
      }
    }

    fetchPOCs()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEventData({ ...eventData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axiosInstance.post("/event/addevent", eventData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      if (response.data.statusCode === 200) {
        navigate(`/events/view/${response.data.data._id}`)
      }
    } catch (error) {
      let errorMessage = "An unknown error occurred. Please try again."
      if (error.response?.data) {
        const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1]
        errorMessage = matchedMessage || errorMessage
      }

      console.error(errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Add New Event</h2>
          <p className="mt-2 text-sm text-gray-600">Fill in the details below to create a new event</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-900">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={eventData.eventName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              rows="4"
              value={eventData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-900">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-900">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={eventData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="poc" className="block text-sm font-medium text-gray-900">
              Point of Contact (POC)
            </label>
            <select
              id="poc"
              name="poc"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm 
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={eventData.poc}
              onChange={handleChange}
              required
            >
              <option value="">Select a POC</option>
              {pocList.map((poc) => (
                <option key={poc._id} value={poc._id}>
                  {poc.pocName} (POC {poc.pocNumber})
                  {poc.head?.username ? ` - ${poc.head.username}` : ' - No Head Assigned'}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="activityPoints" className="block text-sm font-medium text-gray-900">
              Activity Points
            </label>
            <input
              type="number"
              id="activityPoints"
              name="activityPoints"
              className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400
                       focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              value={eventData.activityPoints}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white 
                     hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddEvent

