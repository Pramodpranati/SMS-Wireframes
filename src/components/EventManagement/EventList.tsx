import React from 'react';
import { Calendar, Clock, MapPin, Users, User, GraduationCap, School } from 'lucide-react';
import { Event, EventTarget } from '../../types/Event';

interface EventListProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
  searchTerm: string;
}

const EventList: React.FC<EventListProps> = ({ events, onEventSelect, searchTerm }) => {
  const getTargetIcon = (target: EventTarget) => {
    switch (target) {
      case 'students': return <GraduationCap className="w-4 h-4" />;
      case 'teachers': return <User className="w-4 h-4" />;
      case 'individuals': return <Users className="w-4 h-4" />;
      case 'whole-school': return <School className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getTargetLabel = (target: EventTarget) => {
    switch (target) {
      case 'students': return 'Students';
      case 'teachers': return 'Teachers';
      case 'individuals': return 'Individuals';
      case 'whole-school': return 'Whole School';
      default: return 'All';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'event': return 'bg-green-100 text-green-800 border-green-200';
      case 'training': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'meeting': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'holiday': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupEventsByDate = (events: Event[]) => {
    const grouped: Record<string, Event[]> = {};
    events.forEach(event => {
      const dateKey = event.date.toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    return grouped;
  };

  const groupedEvents = groupEventsByDate(events);
  const sortedDates = Object.keys(groupedEvents).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-500">
          {searchTerm ? 'No events match your search criteria.' : 'No events scheduled.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map(dateKey => {
        const date = new Date(dateKey);
        const dayEvents = groupedEvents[dateKey];

        return (
          <div key={dateKey} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {formatDate(date)}
              </h3>
              <p className="text-sm text-gray-600">{dayEvents.length} event(s)</p>
            </div>

            <div className="divide-y divide-gray-200">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onEventSelect(event)}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-medium text-gray-900">{event.title}</h4>
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`}></div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                      </div>

                      <p className="text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.startTime} - {event.endTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getTargetIcon(event.target)}
                          <span>{getTargetLabel(event.target)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;