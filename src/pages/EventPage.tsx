import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function EventPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]); // State to store events
  const [loading, setLoading] = useState<boolean>(true); // Loading state for events

  useEffect(() => {
    // Fetch events from the backend
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events'); // Replace with your API endpoint
        const currentDate = new Date();
        const filteredEvents = response.data.filter((event: any) => new Date(event.date) > currentDate); // Filter events greater than current date
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventAction = (action: string) => {
    if (action === 'create') {
      navigate('/events/create');
    }
  };

  const handleEditEvent = (eventId: string) => {
    navigate(`/events/updateevent/${eventId}`); // Navigate to the event edit page with eventId
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Event Management</h1>

      <div className="space-y-4">
        {/* Event Actions */}
        <div className="flex items-center justify-between bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Event Actions</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleEventAction('create')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Create Event
            </button>
          </div>
        </div>

        {/* Event List */}
        <div className="bg-white p-4 shadow rounded-md">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          {loading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No upcoming events</p>
          ) : (
            <ul className="space-y-4 mt-4">
              {events.map((event) => (
                <li key={event._id} className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <span className="text-gray-500">{new Date(event.date).toLocaleString()}</span>
                  </div>
                  <p className="mt-2 text-gray-700">{event.description}</p>

                  {/* Edit Button for Each Event */}
                  <button
                    onClick={() => handleEditEvent(event._id)}
                    className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                  >
                    Edit Event
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventPage;
