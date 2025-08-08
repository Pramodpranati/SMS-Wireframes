import React, { useState } from 'react';
import { Filter, Plus, Edit, Trash2, Clock } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useAuth } from '../../contexts/AuthContext';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIME_SLOTS = [
  { id: '1', startTime: '08:00', endTime: '08:45', type: 'period', periodNumber: 1 },
  { id: '2', startTime: '08:45', endTime: '09:30', type: 'period', periodNumber: 2 },
  { id: '3', startTime: '09:30', endTime: '09:45', type: 'break', periodNumber: undefined },
  { id: '4', startTime: '09:45', endTime: '10:30', type: 'period', periodNumber: 3 },
  { id: '5', startTime: '10:30', endTime: '11:15', type: 'period', periodNumber: 4 },
  { id: '6', startTime: '11:15', endTime: '12:00', type: 'period', periodNumber: 5 },
  { id: '7', startTime: '12:00', endTime: '12:30', type: 'lunch', periodNumber: undefined },
  { id: '8', startTime: '12:30', endTime: '13:15', type: 'period', periodNumber: 6 },
  { id: '9', startTime: '13:15', endTime: '14:00', type: 'period', periodNumber: 7 },
];

export const TimeTableManagement: React.FC = () => {
  const { grades, subjects, timeTable, addTimeTableEntry, updateTimeTableEntry, deleteTimeTableEntry } = useSchool();
  const { hasRole } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState(false);

  const canEdit = hasRole(['system_admin', 'management']);

  const selectedGradeData = grades.find(g => g.id === selectedGrade);
  const selectedSectionData = selectedGradeData?.sections.find(s => s.id === selectedSection);

  const getTimeTableForSection = (sectionId: string, dayIndex: number, timeSlotId: string) => {
    return timeTable.find(entry => 
      entry.sectionId === sectionId && 
      entry.dayOfWeek === dayIndex + 1 && 
      entry.timeSlotId === timeSlotId
    );
  };

  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || 'Unknown';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Time Table Management</h1>
          <p className="text-gray-600">View and manage class schedules</p>
        </div>
        {/* {canEdit && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        )} */}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
              <select
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value);
                  setSelectedSection('');
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Grade</option>
                {grades.map(grade => (
                  <option key={grade.id} value={grade.id}>{grade.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={!selectedGrade}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Select Section</option>
                {selectedGradeData?.sections.map(section => (
                  <option key={section.id} value={section.id}>
                    Section {section.name} (Room: {section.roomNumber})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Time Table Display */}
      {selectedSection && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Time Table - {selectedGradeData?.name} Section {selectedSectionData?.name}
            </h3>
            <p className="text-sm text-gray-600">Room: {selectedSectionData?.roomNumber}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  {DAYS.map(day => (
                    <th key={day} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {TIME_SLOTS.map(timeSlot => (
                  <tr key={timeSlot.id}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {timeSlot.startTime} - {timeSlot.endTime}
                      </div>
                      <div className="text-xs text-gray-500">
                        {timeSlot.type === 'period' && `Period ${timeSlot.periodNumber}`}
                        {timeSlot.type === 'break' && 'Break'}
                        {timeSlot.type === 'lunch' && 'Lunch'}
                      </div>
                    </td>
                    {DAYS.map((day, dayIndex) => {
                      const entry = getTimeTableForSection(selectedSection, dayIndex, timeSlot.id);
                      
                      if (timeSlot.type !== 'period') {
                        return (
                          <td key={day} className="px-4 py-3 text-center">
                            <div className="text-sm text-gray-500 bg-gray-100 rounded px-2 py-1">
                              {timeSlot.type === 'break' ? 'Break' : 'Lunch'}
                            </div>
                          </td>
                        );
                      }

                      return (
                        <td key={day} className="px-4 py-3 text-center">
                          {entry ? (
                            <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1">
                              <div className="text-sm font-medium text-blue-800">
                                {getSubjectName(entry.subjectId)}
                              </div>
                              {canEdit && (
                                <div className="flex items-center justify-center space-x-1 mt-1">
                                  <button className="text-blue-600 hover:text-blue-800 p-1">
                                    <Edit className="w-3 h-3" />
                                  </button>
                                  <button 
                                    onClick={() => deleteTimeTableEntry(entry.id)}
                                    className="text-red-600 hover:text-red-800 p-1"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ) : (
                            canEdit && (
                              <button
                                onClick={() => {
                                  // Add logic to create new entry
                                }}
                                className="w-full h-12 border-2 border-dashed border-gray-300 rounded hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4 text-gray-400" />
                              </button>
                            )
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!selectedSection && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Select Grade and Section</h3>
          <p className="text-gray-600">Choose a grade and section to view or edit the time table</p>
        </div>
      )}
    </div>
  );
};