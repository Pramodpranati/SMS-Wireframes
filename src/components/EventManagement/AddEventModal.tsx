import { AlertCircle, Calendar, Clock, Link, MapPin, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import { Event, EventCategory, EventPriority, EventTarget } from '../../types/Event';

interface AddEventModalProps {
  onClose: () => void;
  onAdd: (event: Omit<Event, 'id' | 'createdAt'>) => void;
  selectedDate: Date;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onAdd, selectedDate }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: selectedDate.toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    target: 'whole-school' as EventTarget,
    targetIds: [] as string[],
    category: 'academic' as EventCategory,
    priority: 'medium' as EventPriority,
    location: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (formData.startTime >= formData.endTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const event = {
      ...formData,
      date: new Date(formData.date),
      createdBy: 'current-user', // In real app, get from auth context
    };

    onAdd(event);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Event</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                placeholder="Enter event description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>


            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <input
                  type='text'
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.location ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder="Enter location"
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.location}
                  </p>
                )}
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value as EventCategory)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="academic">Academic</option>
                  <option value="event">Event</option>
                  <option value="training">Training</option>
                  <option value="meeting">Meeting</option>
                  <option value="holiday">Holiday</option>
                </select>
              </div>
              </div>

              <div>
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55013.07304196852!2d80.1342680548261!3d13.013544080038772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525e1f5da86397%3A0x21092f216ee26e47!2sChennai%20International%20Airport!5e0!3m2!1sen!2sin!4v1755068132976!5m2!1sen!2sin" width="600" height="150" 
                 
                  
                ></iframe>
              </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.endTime ? 'border-red-300' : 'border-gray-300'
                    }`}
                />
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Target Audience</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Select Target Group
              </label>
              <select
                value={formData.target}
                onChange={(e) => handleInputChange('target', e.target.value as EventTarget)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="whole-school">Whole School</option>
                <option value="students">Student Only</option>
                <option value="teachers">Teachers Only</option>
                <option value="individuals">Specific Individuals</option>
              </select>
            </div>

            {formData.target === 'students' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex flex-row justify-between items-center">
                  <span>Select Student Groups</span>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="" id="" /><span className="text-sm text-gray-700">Select all</span>
                  </label>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
                    'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map(grade => (
                      <label key={grade} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={(e) => {
                            const gradeId = grade.toLowerCase().replace(' ', '-');
                            if (e.target.checked) {
                              handleInputChange('targetIds', [...formData.targetIds, gradeId]);
                            } else {
                              handleInputChange('targetIds', formData.targetIds.filter(id => id !== gradeId));
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700">{grade}</span>
                      </label>
                    ))}
                </div>
              </div>
            )}

            {formData.target === 'teachers' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex flex-row justify-between items-center">
                  <span>Select Teacher Departments</span>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="" id="" /><span className="text-sm text-gray-700">Select all</span>
                  </label>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Dr. Sarah Johnson - EMP001', 'David Chen - EMP002', 'John - EMP003', 'Jones - EMP004'].map(dept => (
                    <label key={dept} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          const deptId = dept.toLowerCase().replace(' ', '-');
                          if (e.target.checked) {
                            handleInputChange('targetIds', [...formData.targetIds, deptId]);
                          } else {
                            handleInputChange('targetIds', formData.targetIds.filter(id => id !== deptId));
                          }
                        }}
                      />
                      <span className="text-sm text-gray-700">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {formData.target === 'individuals' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search and Select Individuals
                </label>
                <input
                  type="text"
                  placeholder="Type to search for students or teachers..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Individual selection would integrate with your user management system
                </p>
              </div>
            )}
          </div>

          {/* Event Properties */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Event Properties</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value as EventCategory)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="academic">Academic</option>
                  <option value="event">Event</option>
                  <option value="training">Training</option>
                  <option value="meeting">Meeting</option>
                  <option value="holiday">Holiday</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value as EventPriority)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div> */}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;