import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Event } from '../../types/Event';

interface EventCalendarProps {
  events: Event[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventSelect: (event: Event) => void;
}

const EventCalendar: React.FC<EventCalendarProps> = ({
  events,
  selectedDate,
  onDateSelect,
  onEventSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-500';
      case 'event': return 'bg-green-500';
      case 'training': return 'bg-orange-500';
      case 'meeting': return 'bg-purple-500';
      case 'holiday': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalCells = Math.ceil((daysInMonth + firstDayOfMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNumber);
      const dayEvents = isValidDay ? getEventsForDate(date) : [];

      days.push(
        <div
          key={i}
          onClick={() => isValidDay && onDateSelect(date)}
          className={`
            min-h-[120px] p-2 border border-gray-200 cursor-pointer transition-all duration-200
            ${isValidDay ? 'hover:bg-blue-50' : 'bg-gray-50 cursor-not-allowed'}
            ${isSelected(date) && isValidDay ? 'bg-blue-100 border-blue-300' : ''}
            ${isToday(date) && isValidDay ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
          `}
        >
          {isValidDay && (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${
                  isToday(date) ? 'text-blue-600' : 
                  isSelected(date) ? 'text-blue-800' : 'text-gray-900'
                }`}>
                  {dayNumber}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                    {dayEvents.length}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventSelect(event);
                    }}
                    className="group"
                  >
                    <div className={`
                      w-full p-1.5 rounded text-xs text-white truncate cursor-pointer
                      transition-all duration-200 group-hover:scale-105 group-hover:shadow-md
                      ${getCategoryColor(event.category)}
                    `}>
                      {event.title}
                    </div>
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-500 mt-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-px mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 pb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Event Categories</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-xs text-gray-600">Academic</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-xs text-gray-600">Events</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className="text-xs text-gray-600">Training</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-xs text-gray-600">Meetings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-xs text-gray-600">Holidays</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;