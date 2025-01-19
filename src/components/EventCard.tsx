import React from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  isRegistered?: boolean;
  onJoin?: () => void;
}

export function EventCard({ event, isRegistered, onJoin }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.name}</h3>
      <p className="text-gray-600 mb-4">{event.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>{event.registeredUsers.length} / {event.capacity} registered</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-indigo-600">{event.type}</span>
        {onJoin && !isRegistered && (
          <button
            onClick={onJoin}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Join Event
          </button>
        )}
        {isRegistered && (
          <span className="text-green-600 font-medium">Registered</span>
        )}
      </div>
    </div>
  );
}