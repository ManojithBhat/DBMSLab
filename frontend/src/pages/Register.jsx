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
      let errorMessage = 'An unknown error occurred. Please try again.';
      if (error.response?.data) {
        const matchedMessage =
          error.response.data.match(/Error:\s(.*?)<br>/)?.[1];
        errorMessage = matchedMessage || errorMessage;
      }
      console.error('Signup failed:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Register</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to be part of the NSS community and make a difference.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                name="username"
                id="username"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Enter your full name"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700"
              >
                Department
              </label>
              <select
                name="department"
                id="department"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                         focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
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

            <div>
              <label
                htmlFor="counsellor"
                className="block text-sm font-medium text-gray-700"
              >
                Counsellor ID
              </label>
              <input
                type="text"
                name="counsellor"
                id="counsellor"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                placeholder="Enter your counsellor ID"
                value={formData.counsellor}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="nssVolunteer"
                className="block text-sm font-medium text-gray-700"
              >
                NSS Volunteer
              </label>
              <select
                name="nssVolunteer"
                id="nssVolunteer"
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                         focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                value={formData.nssVolunteer}
                onChange={handleChange}
              >
                <option value="">Select Option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {formData.nssVolunteer === 'yes' && (
              <div>
                <label
                  htmlFor="poc"
                  className="block text-sm font-medium text-gray-700"
                >
                  POC
                </label>
                <select
                  name="poc"
                  id="poc"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm
                           focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
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
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black 
                       hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 
                       disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {success && (
            <p className="mt-2 text-sm text-green-600">
              Registration successful!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
