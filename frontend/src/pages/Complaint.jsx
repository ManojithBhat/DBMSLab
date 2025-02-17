import { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const ComplaintForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/view/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        setUser(response.data.data);
      } catch (err) {
        console.error(err);
        setError('Login to submit a complaint');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: user.username,
          to_name: 'Admin',
          message: complaint,
          user_email: user.email,
          user_usn: user.usn,
          user_department: user.department,
          user_role: user.role,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSubmitStatus('success');
      setComplaint('');
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Raise a Complaint
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          If you have any issues or concerns, please submit them here. We take
          all complaints seriously and will reach out to you via email as soon
          as possible to address your concerns.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="complaint"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Complaint
            </label>
            <textarea
              id="complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
              placeholder="Please describe your complaint here..."
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitStatus === 'sending'}
              className="w-full rounded-md bg-black px-3 py-2 text-sm font-medium text-white 
                     hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
                     transition-colors"
            >
              {submitStatus === 'sending' ? 'Sending...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
        {submitStatus === 'success' && (
          <p className="mt-4 text-center text-green-600">
            Your complaint has been successfully submitted. We will reach out to
            you soon.
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="mt-4 text-center text-red-600">
            There was an error submitting your complaint. Please try again
            later.
          </p>
        )}
      </div>
    </section>
  );
};

export default ComplaintForm;
