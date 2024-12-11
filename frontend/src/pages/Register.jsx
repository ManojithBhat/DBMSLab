import React, { useState } from 'react';
import axios from 'axios';

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
    fullName: '',
    department: '',
    poc: '',
    counsellorId: '',
    nssVolunteer: '',
  });

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

    try {
      const response = await axios.post('/api/register', new URLSearchParams(formData), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          fullName: '',
          department: '',
          poc: '',
          counsellorId: '',
          nssVolunteer: '',
        });
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <div className="mt-1">
                <select
                  name="department"
                  id="department"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
            </div>

            <div>
              <label htmlFor="poc" className="block text-sm font-medium text-gray-700">
                POC
              </label>
              <div className="mt-1">
                <select
                  name="poc"
                  id="poc"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
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
            </div>

            <div>
              <label htmlFor="counsellorId" className="block text-sm font-medium text-gray-700">
                Counsellor ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="counsellorId"
                  id="counsellorId"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="ABC123"
                  value={formData.counsellorId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="nssVolunteer" className="block text-sm font-medium text-gray-700">
                NSS Volunteer
              </label>
              <div className="mt-1">
                <select
                  name="nssVolunteer"
                  id="nssVolunteer"
                  required
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.nssVolunteer}
                  onChange={handleChange}
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 text-center text-sm text-green-600">
              Registration successful!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

