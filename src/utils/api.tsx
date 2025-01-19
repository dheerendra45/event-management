import axios from 'axios';

// Create an axios instance for reusable API calls
const api = axios.create({
  baseURL: 'http://localhost:5000/api/events', // Base URL for all event APIs
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to add Authorization header
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('User is not authenticated');
  }
  return { Authorization: `Bearer ${token}` };
};

// Create Event
export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/createevent', eventData, {
      headers: getAuthHeaders(),
    });
    return response.data; // Return the created event data
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error(error.response?.data?.message || 'Failed to create event');
  }
};

// Get All Events
export const getEvents = async () => {
  try {
    const response = await api.get('/', {
      headers: getAuthHeaders(),
    });
    return response.data; // Return the list of events
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch events');
  }
};

// Get User-Specific Events
export const getUserEvents = async () => {
  try {
    const response = await api.get('/user', {
      headers: getAuthHeaders(),
    });
    return response.data; // Return the user's events
  } catch (error) {
    console.error('Error fetching user events:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user events');
  }
};

// Update Event
export const updateEvent = async (id, eventData) => {
  try {
    const response = await api.put(`/updateevent/${id}`, eventData, {
      headers: getAuthHeaders(),
    });
    return response.data; // Return the updated event data
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error(error.response?.data?.message || 'Failed to update event');
  }
};

// Delete Event
export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data; // Return the deleted event response
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete event');
  }
};
