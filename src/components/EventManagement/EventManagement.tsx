import React, { useState } from 'react';
import { Calendar, Plus, Filter, Search, Users, User, GraduationCap, School } from 'lucide-react';
import EventCalendar from './EventCalendar';
import AddEventModal from './AddEventModal';
import EventList from './EventList';
import EventDetails from './EventDetails';
import { Event, EventTarget } from '../../types/Event';

const EventManagement: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTarget, setFilterTarget] = useState<EventTarget | 'all'>('all');

  // Mock events data - in real app this would come from your backend
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Parent-Teacher Conference',
      description: 'Quarterly parent-teacher meetings to discuss student progress',
      date: new Date(2025, 0, 15),
      startTime: '09:00',
      endTime: '17:00',
      target: 'whole-school',
      targetIds: [],
      category: 'academic',
      priority: 'high',
      location: 'Main Auditorium',
      createdBy: 'admin',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Science Fair',
      description: 'Annual science exhibition for grades 6-12',
      date: new Date(2025, 0, 20),
      startTime: '10:00',
      endTime: '16:00',
      target: 'students',
      targetIds: ['grade-6', 'grade-7', 'grade-8', 'grade-9', 'grade-10', 'grade-11', 'grade-12'],
      category: 'event',
      priority: 'medium',
      location: 'Science Block',
      createdBy: 'admin',
      createdAt: new Date(),
    },
    {
      id: '3',
      title: 'Staff Development Workshop',
      description: 'Professional development session on modern teaching methodologies',
      date: new Date(2025, 0, 25),
      startTime: '14:00',
      endTime: '17:00',
      target: 'teachers',
      targetIds: [],
      category: 'training',
      priority: 'medium',
      location: 'Conference Room A',
      createdBy: 'admin',
      createdAt: new Date(),
    },
  ]);

  const handleAddEvent = (event: Omit<Event, 'id' | 'createdAt'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setEvents([...events, newEvent]);
    setShowAddModal(false);
  };

  const handleEditEvent = (eventId: string, updatedEvent: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, ...updatedEvent } : event
    ));
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterTarget === 'all' || event.target === filterTarget;
    return matchesSearch && matchesFilter;
  });

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Calendar className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Event
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setView('calendar')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    view === 'calendar'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Calendar View
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    view === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List View
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterTarget}
                  onChange={(e) => setFilterTarget(e.target.value as EventTarget | 'all')}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Groups</option>
                  <option value="students">Students</option>
                  <option value="teachers">Teachers</option>
                  <option value="individuals">Individuals</option>
                  <option value="whole-school">Whole School</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {view === 'calendar' ? (
              <EventCalendar
                events={filteredEvents}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onEventSelect={setSelectedEvent}
              />
            ) : (
              <EventList
                events={filteredEvents}
                onEventSelect={setSelectedEvent}
                searchTerm={searchTerm}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedEvent ? (
              <EventDetails
                event={selectedEvent}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
                onClose={() => setSelectedEvent(null)}
              />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Events</h3>
                {getEventsForDate(new Date()).length > 0 ? (
                  <div className="space-y-3">
                    {getEventsForDate(new Date()).map(event => (
                      <div
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 text-sm">{event.title}</h4>
                          {getTargetIcon(event.target)}
                        </div>
                        <p className="text-xs text-gray-600 mb-1">{event.startTime} - {event.endTime}</p>
                        <p className="text-xs text-gray-500">{getTargetLabel(event.target)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No events scheduled for today</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddEvent}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default EventManagement;