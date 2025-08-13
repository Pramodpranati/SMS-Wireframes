import React from 'react';
import { Calendar, Clock, Users, BookOpen, Edit, Trash2, UserPlus, MoreVertical } from 'lucide-react';
import { ExamWithAssignments } from '../../types/Exam';

interface ExamCardProps {
  exam: ExamWithAssignments;
  onEdit: () => void;
  onDelete: () => void;
  onAssign: () => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onEdit, onDelete, onAssign }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{exam.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                {exam.subject}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {exam.assignedCount} students
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(exam.status)}`}>
              {exam.status}
            </span>
            <div className="relative">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        {exam.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{exam.description}</p>
        )}

        {/* Schedule Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            <span>{formatDate(exam.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-green-500" />
            <span>{formatTime(exam.startTime)} - {formatTime(exam.endTime)}</span>
          </div>
        </div>

        {/* Marks Info */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Total Marks:</span>
            <span className="font-medium text-gray-900">{exam.totalMarks}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-gray-600">Passing Marks:</span>
            <span className="font-medium text-gray-900">{exam.passingMarks}</span>
          </div>
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium text-gray-900">{exam.duration} minutes</span>
          </div>
        </div>

        {/* Assignments */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Assigned to:</p>
          <div className="space-y-1">
            {exam.assignments.map((assignment) => (
              <div key={assignment.id} className="text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded">
                {assignment.targetName}
              </div>
            ))}
            {exam.assignments.length === 0 && (
              <p className="text-xs text-gray-500 italic">Not assigned yet</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="flex items-center px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              onClick={onAssign}
              className="flex items-center px-3 py-1.5 text-sm text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              <UserPlus className="w-4 h-4 mr-1" />
              Assign
            </button>
          </div>
          
          <button
            onClick={onDelete}
            className="flex items-center px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;