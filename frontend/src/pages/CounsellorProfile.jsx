import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CounsellorDashboard = () => {
  const [counsellor, setCounsellor] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/view/counsellor/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        const { counsellor, students } = response.data.data;
        setCounsellor(counsellor);
        setStudents(students);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch counsellor data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Counsellor Dashboard</h1>
      
      {/* Counsellor Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Counsellor Profile</h2>
        <p><strong>Name:</strong> {counsellor.username}</p>
        <p><strong>Email:</strong> {counsellor.email}</p>
        <p><strong>Department:</strong> {counsellor.department}</p>
        <p><strong>Code:</strong> {counsellor.code}</p>
      </div>

      {/* Students Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Assigned Students</h2>
        {students.length > 0 ? (
          <ul className="space-y-3">
            {students.map((student) => (
              <li
                key={student._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md"
              >
                <div>
                  <p><strong>Name:</strong> {student.name}</p>
                  <p><strong>Email:</strong> {student.email}</p>
                  <p><strong>USN:</strong> {student.usn}</p>
                </div>
                <Link
                  to={`/students/${student._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No students assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default CounsellorDashboard;
