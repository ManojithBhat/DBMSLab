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
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log(response.data); // Log the response data for debugging
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center text-blue-600 mb-8">
        Counsellor Dashboard
      </h1>

      {/* Counsellor Information */}
      <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Counsellor Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 text-lg"><strong>Name:</strong> {counsellor.username}</p>
            <p className="text-gray-700 text-lg"><strong>Email:</strong> {counsellor.email}</p>
            <p className="text-gray-700 text-lg"><strong>Department:</strong> {counsellor.department}</p>
            <p className="text-gray-700 text-lg"><strong>Code:</strong> {counsellor.code}</p>
          </div>
        </div>
      </div>

      {/* Students Information */}
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Assigned Students</h2>
        {students.length > 0 ? (
          <ul className="space-y-6">
            {students.map((student) => {
              return (
                <li
                  key={student._id}
                  className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  <div>
                    <p className="text-gray-700 font-medium"><strong>Name:</strong> {student.username}</p>
                    <p className="text-gray-700"><strong>Email:</strong> {student.email}</p>
                    <p className="text-gray-700"><strong>USN:</strong> {student.usn}</p>
                  </div>
                  <Link
                    to={`/students/${student.usn}`}
                    className="text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
                  >
                    View Details
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No students assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default CounsellorDashboard;
