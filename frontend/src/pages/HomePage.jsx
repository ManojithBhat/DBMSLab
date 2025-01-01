import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <section className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Welcome to NSS RVCE
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Seamlessly track your events, activity points, and achievements.
          </p>
          <Link
            to="/list-events"
            className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen bg-gray-100 text-gray-800 flex items-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Explore Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Event Tracking',
                description: 'Monitor participation in NSS RVCE events with ease.',
              },
              {
                title: 'Activity Points',
                description: 'Track and update your activity points automatically.',
              },
              {
                title: 'Counselor Access',
                description: 'Share your progress with your assigned counselor.',
              },
              {
                title: 'Progress Analytics',
                description: 'Visualize your growth and achievements effortlessly.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="min-h-screen bg-gradient-to-r from-green-400 to-teal-600 text-white flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { value: '1000+', label: 'Active Students' },
              { value: '50+', label: 'Events Per Year' },
              { value: '10,000+', label: 'Activity Points Awarded' },
            ].map((stat, index) => (
              <div key={index} className="bg-white text-gray-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-5xl font-extrabold mb-4">{stat.value}</h3>
                <p className="text-xl">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="min-h-screen bg-gray-900 text-gray-100 flex items-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Recent Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Blood Donation Camp',
                date: 'May 15, 2023',
                points: '50 Activity Points',
              },
              {
                title: 'Tree Plantation Drive',
                date: 'June 5, 2023',
                points: '30 Activity Points',
              },
              {
                title: 'Rural Education Program',
                date: 'July 1, 2023',
                points: '75 Activity Points',
              },
            ].map((event, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-400 mb-2">{event.date}</p>
                <p className="text-teal-400 font-semibold">{event.points}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-600 text-white flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-4xl font-bold mb-4">Join Our Journey!</h2>
          <p className="text-xl mb-8">
            Start tracking your contributions and accomplishments today.
          </p>
          <Link
            to="/signup"
            className="bg-white text-purple-600 py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-200 transition duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
