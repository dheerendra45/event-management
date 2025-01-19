import React, { useEffect, useState } from 'react';
import { createEvent } from '../utils/api'; // API function for event creation
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assume useAuth provides user info

export function CreateEvent() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    type: 'Virtual', // Default to Virtual
    maxCapacity: '',
  });

  const { currentUser } = useAuth(); // Get logged-in user info
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      // If user is not logged in, redirect to login page
      alert('You must be logged in to create an event.');
      navigate('/login'); // Replace '/login' with your login route
    }
  }, [currentUser, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const eventData = {
        ...form,
        maxCapacity: parseInt(form.maxCapacity, 10), // Ensure it's a number
        organizerId: currentUser?.id, // Use current user's ID as organizerId
      };

      const response = await createEvent(eventData);
      console.log('Event Created:', response);

      alert('Event created successfully!');
      navigate('/events'); // Redirect to events list
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {currentUser ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Create Event</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              Event Name:
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2"
              />
            </label>
            <label className="block">
              Date:
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2"
              />
            </label>
            <label className="block">
              Time:
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2"
              />
            </label>
            <label className="block">
              Description:
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2"
              />
            </label>
            <label className="block">
              Type:
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                className="w-full border px-4 py-2"
              >
                <option value="Virtual">Virtual</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>
            <label className="block">
              Max Capacity:
              <input
                type="number"
                name="maxCapacity"
                value={form.maxCapacity}
                onChange={handleChange}
                required
                min="1"
                className="w-full border px-4 py-2"
              />
            </label>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Submit
            </button>
          </form>
        </>
      ) : (
        <p className="text-center text-gray-700">
          You must <a href="/login" className="text-indigo-600 underline">log in</a> to create an event.
        </p>
      )}
    </div>
  );
}

export default CreateEvent;
