import React, { useState } from 'react';
import { MessageCircle, History, Plus } from 'lucide-react';
import MessageComposer from './MessageComposer';
import MessageHistory from './MessageHistory';

// Mock data for demonstration
const mockStudents = [
  { id: '1', name: 'Alice Johnson', grade: '10', section: 'A', email: 'alice@email.com', phone: '+1234567890' },
  { id: '2', name: 'Bob Smith', grade: '10', section: 'B', email: 'bob@email.com', phone: '+1234567891' },
  { id: '3', name: 'Charlie Brown', grade: '11', section: 'A', email: 'charlie@email.com', phone: '+1234567892' },
  { id: '4', name: 'Diana Prince', grade: '11', section: 'B', email: 'diana@email.com', phone: '+1234567893' },
  { id: '5', name: 'Edward Wilson', grade: '12', section: 'A', email: 'edward@email.com', phone: '+1234567894' },
  { id: '6', name: 'Fiona Davis', grade: '12', section: 'B', email: 'fiona@email.com', phone: '+1234567895' },
  { id: '7', name: 'George Miller', grade: '9', section: 'A', email: 'george@email.com', phone: '+1234567896' },
  { id: '8', name: 'Hannah Taylor', grade: '9', section: 'B', email: 'hannah@email.com', phone: '+1234567897' },
];

const mockStaff = [
  { id: '1', name: 'Dr. Sarah Thompson', type: 'teaching' as const, department: 'Mathematics', email: 'sarah@school.edu', phone: '+1234567898' },
  { id: '2', name: 'Prof. Michael Chen', type: 'teaching' as const, department: 'Science', email: 'michael@school.edu', phone: '+1234567899' },
  { id: '3', name: 'Lisa Anderson', type: 'non-teaching' as const, department: 'Administration', email: 'lisa@school.edu', phone: '+1234567800' },
  { id: '4', name: 'John Roberts', type: 'non-teaching' as const, department: 'Maintenance', email: 'john@school.edu', phone: '+1234567801' },
  { id: '5', name: 'Dr. Emily Watson', type: 'teaching' as const, department: 'English', email: 'emily@school.edu', phone: '+1234567802' },
  { id: '6', name: 'Mark Johnson', type: 'non-teaching' as const, department: 'Security', email: 'mark@school.edu', phone: '+1234567803' },
];

const MessagesApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('compose')}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'compose'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              Compose Message
            </button>
            
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <History className="w-4 h-4" />
              Message History
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {activeTab === 'compose' ? (
          <MessageComposer students={mockStudents} staff={mockStaff} />
        ) : (
          <div className="max-w-7xl mx-auto p-6">
            <MessageHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesApp;