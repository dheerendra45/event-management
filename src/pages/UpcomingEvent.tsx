import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assume useAuth provides user info
import axios from 'axios';

export function UpcomingEvent() {
  const { currentUser } = useAuth(); // Get logged-in user info
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      // Redirect to login page if not logged in
      alert('You must be logged in to view upcoming events.');
      navigate('/login'); // Replace '/login' with your login route
    } else {
      setIsAuthenticated(true);
    }
  }, [currentUser, navigate]);

  const events = [
    { id: 1, name: 'Event 1', date: '2025-01-20', organizerId: 1 },
    { id: 2, name: 'Event 2', date: '2025-02-15', organizerId: 2 },
  ];

  const editEvent = (eventId) => {
    navigate(`/edit-event/${eventId}`); // Navigate to the edit event page
  };

  // Don't render anything until authentication is confirmed
  if (!isAuthenticated) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-4 flex items-center justify-between">
            <div>
              <span className="font-semibold">{event.name}</span> - {event.date}
            </div>
            <div className="flex gap-4">
              {currentUser.id === event.organizerId && (
                <button
                  onClick={() => editEvent(event.id)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                >
                  Edit Event
                </button>
              )}
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Join Event
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingEvent;
