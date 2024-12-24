import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen h-full bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 min-h-full text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your NSS RVCE Journey</h1>
          <p className="text-xl mb-8">Monitor your event participation and activity points in one place</p>
          <Link to="/login" className="bg-white text-blue-600 py-2 px-6 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
            Get Started
          </Link>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              
              <h3 className="text-xl font-semibold mb-2">Event Tracking</h3>
              <p className="text-gray-600">Keep track of all NSS RVCE events you've participated in</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              
              <h3 className="text-xl font-semibold mb-2">Activity Points</h3>
              <p className="text-gray-600">Automatically calculate and update your activity points</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              
              <h3 className="text-xl font-semibold mb-2">Counselor Access</h3>
              <p className="text-gray-600">Share your progress with your assigned counselor</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              
              <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
              <p className="text-gray-600">Visualize your participation and growth over time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">1000+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">50+</h3>
              <p className="text-gray-600">Events per Year</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">10000+</h3>
              <p className="text-gray-600">Activity Points Awarded</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Blood Donation Camp</h3>
              <p className="text-gray-600 mb-2">May 15, 2023</p>
              <p className="text-blue-600 font-semibold">50 Activity Points</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Tree Plantation Drive</h3>
              <p className="text-gray-600 mb-2">June 5, 2023</p>
              <p className="text-blue-600 font-semibold">30 Activity Points</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Rural Education Program</h3>
              <p className="text-gray-600 mb-2">July 1, 2023</p>
              <p className="text-blue-600 font-semibold">75 Activity Points</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Tracking?</h2>
          <p className="text-xl mb-8">Join now and take control of your NSS RVCE journey!</p>
          <Link to="/signup" className="bg-white text-blue-600 py-3 px-8 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

