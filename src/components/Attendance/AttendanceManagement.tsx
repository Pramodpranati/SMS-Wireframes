import React, { useState } from 'react';
import { Calendar, Users, Check, X, Filter } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useAuth } from '../../contexts/AuthContext';

export const AttendanceManagement: React.FC = () => {
  const { grades, students, markAttendance } = useSchool();
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSession, setSelectedSession] = useState<'morning' | 'afternoon'>('morning');
  const [attendanceData, setAttendanceData] = useState<Record<string, 'present' | 'absent'>>({});

  const selectedGradeData = grades.find(g => g.id === selectedGrade);
  const selectedSectionData = selectedGradeData?.sections.find(s => s.id === selectedSection);
  const sectionStudents = students.filter((s: any) => s?.sectionId === selectedSection);

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSelectAll = (status: 'present' | 'absent') => {
    const newData: Record<string, 'present' | 'absent'> = {};
    sectionStudents.forEach(student => {
      newData[student.id] = status;
    });
    setAttendanceData(newData);
  };

  const handleSubmitAttendance = () => {
    const records = Object.entries(attendanceData).map(([studentId, status]) => ({
      studentId,
      date: selectedDate,
      session: selectedSession,
      status,
      markedBy: user?.id || ''
    }));

    markAttendance(records);
    setAttendanceData({});
    alert('Attendance marked successfully!');
  };

  const getAttendanceCount = () => {
    const present = Object.values(attendanceData).filter(status => status === 'present').length;
    const absent = Object.values(attendanceData).filter(status => status === 'absent').length;
    return { present, absent, total: sectionStudents.length };
  };

  const counts = getAttendanceCount();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Management</h1>
          <p className="text-gray-600">Mark student attendance for morning and afternoon sessions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-800">Select Class & Date</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Grade</label>
            <select
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(e.target.value);
                setSelectedSection('');
                setAttendanceData({});
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
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setAttendanceData({});
              }}
              disabled={!selectedGrade}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">Select Section</option>
              {selectedGradeData?.sections.map(section => (
                <option key={section.id} value={section.id}>
                  Section {section.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session</label>
            <select
              value={selectedSession}
              onChange={(e) => setSelectedSession(e.target.value as 'morning' | 'afternoon')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Marking */}
      {selectedSection && sectionStudents.length > 0 && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {selectedGradeData?.name} - Section {selectedSectionData?.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedDate} • {selectedSession.charAt(0).toUpperCase() + selectedSession.slice(1)} Session
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Present: <span className="font-medium text-green-600">{counts.present}</span> |
                  Absent: <span className="font-medium text-red-600">{counts.absent}</span> |
                  Total: <span className="font-medium">{counts.total}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleSelectAll('present')}
                    className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors duration-200"
                  >
                    <Check className="w-4 h-4" />
                    <span>All Present</span>
                  </button>
                  <button
                    onClick={() => handleSelectAll('absent')}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>All Absent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectionStudents.map((student: any) => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-800">{student?.name}</h4>
                      <p className="text-sm text-gray-500">Roll: {student?.rollNumber}</p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'present')}
                      className={`flex items-center justify-center space-x-1 py-3 px-3 rounded-md transition-colors duration-200 ${attendanceData[student.id] === 'present'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700'
                        }`}
                    >
                      <Check className="w-4 h-4" />
                      {/* <span>Present</span> */}
                    </button>
                    <button
                      onClick={() => handleAttendanceChange(student.id, 'absent')}
                      className={`flex items-center justify-center space-x-1 py-3 px-3 rounded-md transition-colors duration-200 ${attendanceData[student.id] === 'absent'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-700'
                        }`}
                    >
                      <X className="w-4 h-4" />
                      {/* <span>Absent</span> */}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {Object.keys(attendanceData).length > 0 && (
              <div className="mt-6 flex items-center justify-end">
                <button
                  onClick={handleSubmitAttendance}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Submit Attendance</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedSection && sectionStudents.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Students Found</h3>
          <p className="text-gray-600">No students are enrolled in this section</p>
        </div>
      )}

      {!selectedSection && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Select Class to Mark Attendance</h3>
          <p className="text-gray-600">Choose a grade and section to start marking attendance</p>
        </div>
      )}
    </div>
  );
};