import React from "react"
import { Link } from "react-router-dom"

const HeroSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
          A comprehensive activity management system
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          Track, manage, and optimize your NSS activities with our powerful platform. Seamlessly organize events,
          monitor participation, and measure impact.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/signup"
            className="w-full sm:w-auto px-8 py-3 rounded-md bg-black text-white hover:bg-gray-800 text-sm font-medium"
          >
            Get Started
          </Link>
          <Link
            to="/events"
            className="w-full sm:w-auto px-8 py-3 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium"
          >
            View Events
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

