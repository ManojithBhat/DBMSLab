import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const departments = [
  { value: 'CSE', label: 'Computer Science and Engineering (CSE)' },
  { value: 'ISE', label: 'Information Science and Engineering (ISE)' },
  { value: 'EEE', label: 'Electrical and Electronics Engineering (EEE)' },
  { value: 'ECE', label: 'Electronics and Communication Engineering (ECE)' },
  { value: 'ME', label: 'Mechanical Engineering (ME)' },
  { value: 'ASE', label: 'Aerospace Engineering (ASE)' },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    department: '',
    poc: '',
    counsellor: '',
    role: '',
    nssVolunteer: '',
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    if (formData.nssVolunteer === 'yes') {
      formData.role = 'volunteer';
    } else if (formData.nssVolunteer === 'no') {
      formData.role = 'user';
    }

    try {
      const response = await axiosInstance.post('/auth/register', formData);
      console.log(response);
      if (response.status === 200) {
        setSuccess(true);
        setFormData({
          username: '',
          department: '',
          poc: '',
          counsellor: '',
          nssVolunteer: '',
          role: '',
        });
        navigate('/profile');
      }
    } catch (err) {
      let errorMessage = "An unknown error occurred. Please try again.";
      if (error.response?.data) {
        const matchedMessage =
          error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
        errorMessage = matchedMessage || errorMessage;
      }
      console.error("Signup failed:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Register</h2>
        <p className="text-center text-sm text-gray-600">
          Join us to be part of the NSS community and make a difference.
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your full name"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <select
                name="department"
                id="department"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.value} value={dept.value}>
                    {dept.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="counsellor" className="block text-sm font-medium text-gray-700">
                Counsellor ID
              </label>
              <input
                type="text"
                name="counsellor"
                id="counsellor"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your counsellor ID"
                value={formData.counsellor}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nssVolunteer" className="block text-sm font-medium text-gray-700">
                NSS Volunteer
              </label>
              <select
                name="nssVolunteer"
                id="nssVolunteer"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.nssVolunteer}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {formData.nssVolunteer === 'yes' && (
              <div className="mb-4">
                <label htmlFor="poc" className="block text-sm font-medium text-gray-700">
                  POC
                </label>
                <select
                  name="poc"
                  id="poc"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.poc}
                  onChange={handleChange}
                >
                  <option value="">Select POC</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && <p className="mt-2 text-sm text-green-600">Registration successful!</p>}
        </form>
      </div>
    </div>
  );
}
