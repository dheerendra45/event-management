import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, BarChart, Users } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Simplify Your Event Experience
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-indigo-200 sm:text-2xl md:mt-5 md:max-w-3xl">
              Manage your events effortlessly with our comprehensive platform.
            </p>
            <div className="mt-10">
              <Link
                to="/register"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-md font-medium hover:bg-indigo-50 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why Choose EventHub?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to manage your events successfully.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center">
              <Calendar className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              Easy Event Registration
            </h3>
            <p className="mt-2 text-gray-600">
              Register for events with just a few clicks and manage your schedule effortlessly.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center">
              <BarChart className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              Real-Time Analytics
            </h3>
            <p className="mt-2 text-gray-600">
              Track attendance, engagement, and other key metrics in real-time.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center">
              <Users className="h-12 w-12 text-indigo-600" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              Seamless Event Engagement
            </h3>
            <p className="mt-2 text-gray-600">
              Connect with other attendees and participate in events seamlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}