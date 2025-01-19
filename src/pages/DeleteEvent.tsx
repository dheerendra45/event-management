import React from 'react';

export function DeleteEvent() {
  const handleDelete = () => {
    console.log('Event Deleted');
    // Trigger deletion
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Delete Event</h1>
      <p>Are you sure you want to delete this event?</p>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Confirm Delete
      </button>
    </div>
  );
}
export default DeleteEvent;