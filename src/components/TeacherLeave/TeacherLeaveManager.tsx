'use client';

import { useState } from 'react';
import TeacherTimetable from './TeachersOnLeave';

// Mock Data
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TIME_SLOTS = [
  { id: '1', startTime: '08:00', endTime: '08:45', type: 'period', periodNumber: 1 },
  { id: '2', startTime: '08:45', endTime: '09:30', type: 'period', periodNumber: 2 },
  { id: '3', startTime: '09:30', endTime: '09:45', type: 'break' },
  { id: '4', startTime: '09:45', endTime: '10:30', type: 'period', periodNumber: 3 },
  { id: '5', startTime: '10:30', endTime: '11:15', type: 'period', periodNumber: 4 },
  { id: '6', startTime: '11:15', endTime: '12:00', type: 'period', periodNumber: 5 },
  { id: '7', startTime: '12:00', endTime: '12:30', type: 'lunch' },
  { id: '8', startTime: '12:30', endTime: '13:15', type: 'period', periodNumber: 6 },
  { id: '9', startTime: '13:15', endTime: '14:00', type: 'period', periodNumber: 7 },
];

const leaveTeachers = [
  { id: 1, name: 'Mr. John Doe', subject: 'Math' },
  { id: 2, name: 'Ms. Jane Smith', subject: 'Science' },
];

type Teacher = {
  id: number;
  name: string;
  subject: string;
};

export default function TeachersOnLeave() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (teacher: any) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Teachers on Leave</h2>

      <ul className="space-y-4">
        {leaveTeachers.map((teacher) => (
          <li
            key={teacher.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
          >
            <div>
              <p className="font-medium">{teacher.name}</p>
              <p className="text-sm text-gray-500">{teacher.subject}</p>
            </div>

            <button
              onClick={() => openModal(teacher)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              View Timetable
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {isModalOpen && selectedTeacher && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Timetable for {selectedTeacher?.name}
            </h3>

            <TeacherTimetable />
          </div>
        </div>
      )}
    </div>
  );
}
