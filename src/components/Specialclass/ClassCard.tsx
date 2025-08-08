import React from 'react';
import { Clock, Calendar, GraduationCap, BookOpen } from 'lucide-react';
import { SpecialClass } from '../../types/SpecialClass';

interface ClassCardProps {
  classData: SpecialClass;
}

const gradeColors: Record<string, string> = {
  '1': 'bg-blue-100 text-blue-800 border-blue-200',
  '2': 'bg-green-100 text-green-800 border-green-200',
  '3': 'bg-purple-100 text-purple-800 border-purple-200',
  '4': 'bg-orange-100 text-orange-800 border-orange-200',
  '5': 'bg-red-100 text-red-800 border-red-200',
  '6': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  '7': 'bg-pink-100 text-pink-800 border-pink-200',
  '8': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  '9': 'bg-teal-100 text-teal-800 border-teal-200',
  '10': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  '11': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  '12': 'bg-violet-100 text-violet-800 border-violet-200',
};

export const ClassCard: React.FC<ClassCardProps> = ({ classData }) => {
  const gradeColorClass = gradeColors[classData.grade] || 'bg-gray-100 text-gray-800 border-gray-200';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${gradeColorClass}`}>
            Grade {classData.grade}
          </div>
          <div className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            Section {classData.section}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="h-5 w-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">{classData.subject}</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">{formatDate(classData.date)}</span>
        </div>

        <div className="flex items-center space-x-3 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">
            {formatTime(classData.startTime)} - {formatTime(classData.endTime)}
          </span>
        </div>
        <div>
          <button
            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200"
          >
            Approved
          </button>
        </div>
      </div>
    </div>
  );
};