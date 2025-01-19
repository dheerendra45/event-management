import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, LogOut } from 'lucide-react';

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-indigo-600" />
              <span className="font-bold text-xl">EventHub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/events" className="text-gray-700 hover:text-indigo-600">
              Events
            </Link>

            {currentUser ? (
              <>
                <span className="text-gray-700">Hello, {currentUser.username}!</span>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login'); // Redirect to login after logging out
                  }}
                  className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">
                  Login
                </Link>
                <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
