import React, { useState } from 'react';
import { X, Edit2, Trash2, Calendar, Clock, MapPin, Users, User, GraduationCap, School, AlertTriangle } from 'lucide-react';
import { Event, EventTarget } from '../../types/Event';

interface EventDetailsProps {
  event: Event;
  onEdit: (eventId: string, updatedEvent: Partial<Event>) => void;
  onDelete: (eventId: string) => void;
  onClose: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, onEdit, onDelete, onClose }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getTargetIcon = (target: EventTarget) => {
    switch (target) {
      case 'students': return <GraduationCap className="w-5 h-5" />;
      case 'teachers': return <User className="w-5 h-5" />;
      case 'individuals': return <Users className="w-5 h-5" />;
      case 'whole-school': return <School className="w-5 h-5" />;
      default: return <Users className="w-5 h-5" />;
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

  const handleDelete = () => {
    onDelete(event.id);
    setShowDeleteConfirm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(event.priority)}`}></div>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)} bg-white`}>
              {event.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{event.description}</p>
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-900">Event Details</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Date:</span>
              <span className="font-medium text-gray-900">{formatDate(event.date)}</span>
            </div>
            

            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Time:</span>
              <span className="font-medium text-gray-900">{event.startTime} - {event.endTime}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-gray-900">{event.location}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              {getTargetIcon(event.target)}
              <span className="text-gray-600">Target:</span>
              <span className="font-medium text-gray-900">{getTargetLabel(event.target)}</span>
            </div>
          </div>
        </div>

        {/* Target Audience Details */}
        {event.target !== 'whole-school' && event.targetIds.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Specific Groups</h3>
            <div className="flex flex-wrap gap-2">
              {event.targetIds.map(id => (
                <span
                  key={id}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Event Statistics */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Event Statistics</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Created by:</span>
              <p className="font-medium text-gray-900">{event.createdBy}</p>
            </div>
            <div>
              <span className="text-gray-600">Created on:</span>
              <p className="font-medium text-gray-900">
                {event.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => {/* Implement edit functionality */}}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Event
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Event</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "<strong>{event.title}</strong>"?
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;