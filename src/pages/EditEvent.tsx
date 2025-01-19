import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateEvent } from '../utils/api'; // API function for updating the event
import { useAuth } from '../context/AuthContext'; // Assume useAuth provides user info

export function EditEvent() {
  const { id } = useParams(); // Get event ID from URL params
  const { currentUser } = useAuth(); // Get logged-in user info
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    type: 'Virtual', // Default to Virtual
    maxCapacity: '',
    organizerId: currentUser?.id, // Use current user's ID as organizerId
  });

  const [loading, setLoading] = useState(true);

  // Fetch event data based on event ID when the page loads
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events`);
        console.log()
        const eventData = await response.json();
        setForm({
          name: eventData.name,
          description: eventData.description,
          date: eventData.date,
          time: eventData.time,
          type: eventData.type,
          maxCapacity: eventData.maxCapacity,
          organizerId: eventData.organizerId,
        });
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const eventData = {
        ...form,
        maxCapacity: parseInt(form.maxCapacity, 10), // Ensure it's a number
      };

      const response = await updateEvent(id, eventData); // Update the event via API
      console.log('Event Updated:', response);

      alert('Event updated successfully!');
      navigate('/events'); // Redirect to events list after update
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    }
  };

  // Show loading state or render form once data is fetched
  if (loading) return <p>Loading event...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Event Name */}
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

        {/* Date */}
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

        {/* Time */}
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

        {/* Description */}
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

        {/* Type */}
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

        {/* Max Capacity */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditEvent;
