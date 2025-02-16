import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axiosInstance from "../api/axiosInstance"
import { Html5Qrcode } from "html5-qrcode"

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newVolunteerUSN, setNewVolunteerUSN] = useState("")
  const [addingVolunteer, setAddingVolunteer] = useState(false)
  const [addVolunteerError, setAddVolunteerError] = useState(null)
  const [deleteVolunteerError, setDeleteVolunteerError] = useState(null)
  const [isScannerActive, setIsScannerActive] = useState(false)
  const [scanner, setScanner] = useState(null)
  const { eventId } = useParams()

  useEffect(() => {
    fetchEventDetails()
    return () => {
      if (scanner) {
        scanner.stop().catch((error) => console.error("Error stopping scanner:", error))
      }
    }
  }, [eventId]) // Added scanner to dependencies

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

  const startScanner = async () => {
    try {
      if (scanner) {
        await scanner.stop()
      }

      let scannerContainer = document.getElementById("reader")
      if (!scannerContainer) {
        scannerContainer = document.createElement("div")
        scannerContainer.id = "reader"
        document.getElementById("scanner-container").appendChild(scannerContainer)
      }

      const newScanner = new Html5Qrcode("reader")
      setScanner(newScanner)
      setIsScannerActive(true)

      const config = {
        fps: 10,
        qrbox: { width: 600, height: 250 },
        aspectRatio: 1.0,
      }

      await newScanner.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          setNewVolunteerUSN(decodedText)
          stopScanner()
        },
        (errorMessage) => {
          console.log("QR Code scanning in progress...")
        },
      )
    } catch (err) {
      setIsScannerActive(false)
    }
  }

  const stopScanner = async () => {
    if (scanner) {
      try {
        await scanner.stop()
        setIsScannerActive(false)
        setScanner(null)

        const scannerContainer = document.getElementById("reader")
        if (scannerContainer) {
          scannerContainer.innerHTML = ""
        }
      } catch (err) {
        console.error("Error stopping scanner:", err)
      }
    }
  }

  const addVolunteer = async (e) => {
    e.preventDefault()
    setAddingVolunteer(true)
    setAddVolunteerError(null)
    try {
      await axiosInstance.post(`/event/addVolunteer/${eventId}`, {
        usn: newVolunteerUSN,
      })
      setNewVolunteerUSN("")
      fetchEventDetails()
    } catch (error) {
      let errorMessage = "An unknown error occurred. Please try again."
      if (error.response?.data) {
        const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1]
        errorMessage = matchedMessage || errorMessage
      }
      setAddVolunteerError(errorMessage)
    } finally {
      setAddingVolunteer(false)
    }
  }

  const deleteVolunteer = async (usn) => {
    console.log(usn)
    setDeleteVolunteerError(null)
    try {
      await axiosInstance.delete(`/event/removeVolunteer/${eventId}`, {
          data: { usn },
      })
      fetchEventDetails()
    } catch (error) {
      let errorMessage = "An unknown error occurred. Please try again."
      if (error.response?.data) {
        const matchedMessage = error.response.data.match(/Error:\s(.*?)<br>/)?.[1]
        errorMessage = matchedMessage || errorMessage
      }
      setDeleteVolunteerError(errorMessage)
    }
  }

  if (loading) return <div className="flex justify-center items-center h-screen text-sm text-gray-500">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-sm text-gray-500">{error}</div>
  if (!event)
    return <div className="flex justify-center items-center h-screen text-sm text-gray-500">Event not found</div>

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <Link to="/list-events" className="text-sm text-gray-500 hover:text-gray-900 mb-8 inline-block">
          ← Back to Events
        </Link>

        <h1 className="text-2xl font-semibold text-gray-900 mb-8">{event.eventName}</h1>

        {/* Event Details */}
        <div className="space-y-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="text-gray-500">Date:</span> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Location:</span> {event.location}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Description:</span> {event.description}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Event Lead</h3>
              <p className="text-sm">
                <span className="text-gray-500">Name:</span> {event.lead.username}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">USN:</span> {event.lead.usn}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Department:</span> {event.lead.department}
              </p>
              <p className="text-sm">
                <span className="text-gray-500">Email:</span> {event.lead.email}
              </p>
            </div>
          </div>
        </div>

        {/* Add Volunteer Form */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4">Add Volunteer</h2>
          <form onSubmit={addVolunteer} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                value={newVolunteerUSN}
                onChange={(e) => setNewVolunteerUSN(e.target.value)}
                placeholder="Enter USN"
                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md"
                required
              />
              <button
                type="button"
                onClick={isScannerActive ? stopScanner : startScanner}
                className="px-4 py-2 text-sm border border-gray-200 rounded-md hover:bg-gray-50"
              >
                {isScannerActive ? "Stop Scan" : "Scan Barcode"}
              </button>
            </div>

            <div id="scanner-container" className="w-full">
              {isScannerActive && <div id="reader" className="w-full h-64"></div>}
            </div>

            <button
              type="submit"
              disabled={addingVolunteer}
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {addingVolunteer ? "Adding..." : "Add Volunteer"}
            </button>
          </form>
          {addVolunteerError && <p className="mt-4 text-sm text-red-500">{addVolunteerError}</p>}
        </div>

        {/* Participants Table */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Participants</h2>
          {deleteVolunteerError && <p className="mb-4 text-sm text-red-500">{deleteVolunteerError}</p>}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">USN</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {event.participants.map((participant) => (
                    <tr key={participant._id}>
                      <td className="px-6 py-4 text-sm text-gray-900">{participant.usn}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{participant.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{participant.role}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => deleteVolunteer(participant.usn)}
                          className="text-sm text-gray-500 hover:text-gray-900"
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
      </div>
    </div>
  )
}

export default EventDetailsPage