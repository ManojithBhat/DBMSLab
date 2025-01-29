import React from "react"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">NSS RVCE Event Tracker</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Empowering students to track their social service journey and grow through active participation.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Features</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/event-tracking" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Event Tracking
                </Link>
              </li>
              <li>
                <Link to="/points-system" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Points System
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Certificates
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Contact</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-500">RV College of Engineering</li>
              <li className="text-sm text-gray-500">Mysore Road, Bengaluru - 560059</li>
              <li className="text-sm text-gray-500">Karnataka, India</li>
              <li>
                <a
                  href="mailto:nss@rvce.edu.in"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  nss@rvce.edu.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            Copyright © {new Date().getFullYear()} NSS RVCE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

