import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const CounsellorDashboard = () => {
  const [counsellor, setCounsellor] = useState(null)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/view/counsellor/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        console.log(response.data) // Log the response data for debugging
        const { counsellor, students } = response.data.data
        setCounsellor(counsellor)
        setStudents(students)
      } catch (err) {
        console.error(err)
        setError("Failed to fetch counsellor data")
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

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Counsellor Dashboard</h1>
        </div>

        {/* Counsellor Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Counsellor Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-gray-500">Name</p>
              <p className="font-medium">{counsellor.username}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{counsellor.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Department</p>
              <p className="font-medium">{counsellor.department}</p>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500">Code</p>
              <p className="font-medium">{counsellor.code}</p>
            </div>
          </div>
        </div>

        <div className="border"></div>

        {/* Students Table */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Assigned Students</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">USN</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Details</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-b last:border-b-0">
                    <td className="py-3 px-4">{student.username}</td>
                    <td className="py-3 px-4">{student.email}</td>
                    <td className="py-3 px-4">{student.usn}</td>
                    <td className="py-3 px-4">
                      <Link to={`/students/${student.usn}`} className="text-black hover:underline font-medium">
                        View Details
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

export default CounsellorDashboard

