import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export default function PocPage() {
  const [pocs, setPocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [newUsn, setNewUsn] = useState('');
  const [updateError, setUpdateError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pocsResponse, userResponse] = await Promise.all([
          axiosInstance.get('/poc/list-poc'),
          axiosInstance.get('/view/profile', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }),
        ]);
        setPocs(pocsResponse.data.data);
        setUser(userResponse.data.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdatePOC = async (pocId) => {
    if (!newUsn) {
      setUpdateError('Please enter a USN');
      return;
    }

    try {
      await axiosInstance.post('/poc/update-poc-head', {
        pocNumber: pocId,
        usn: newUsn,
      });

      const refreshedData = await axiosInstance.get('/poc/list-poc');
      setPocs(refreshedData.data.data);
      setEditingId(null);
      setNewUsn('');
      setSuccessMessage('POC head updated successfully!');
      setUpdateError(null);

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setUpdateError('Failed to update POC head');
    }
  };

  if (loading) return <div className="p-8">Loading POCs...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">List of POCs</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      {updateError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {updateError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                POC Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                POC Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                POC Head
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                USN
              </th>
              {user?.role === 'admin' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pocs.map((poc) => (
              <tr key={poc._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {poc.pocNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {poc.pocName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {poc.head?.username || 'Not Assigned'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === poc._id ? (
                    <input
                      type="text"
                      value={newUsn}
                      onChange={(e) => setNewUsn(e.target.value)}
                      className="border rounded px-2 py-1 w-32"
                      placeholder="Enter USN"
                    />
                  ) : (
                    poc.head?.usn || 'N/A'
                  )}
                </td>
                {user?.role === 'admin' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {editingId === poc._id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdatePOC(poc._id)}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setNewUsn('');
                          }}
                          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(poc._id);
                          setNewUsn(poc.head?.usn || '');
                        }}
                        className="bg-stone-900 text-white px-3 py-1 rounded hover:bg-stone-900"
                      >
                        Update Head
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
