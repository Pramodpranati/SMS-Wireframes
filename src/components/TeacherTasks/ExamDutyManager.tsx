import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Filter,
  Search,
  Plus,
  UserCheck
} from 'lucide-react';
import { useTeacherTasks } from '../../contexts/TeacherTaskContext';

const ExamDutyManager: React.FC = () => {
  const { state, assignExamDuty } = useTeacherTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unassigned' | 'assigned' | 'completed'>('all');
  const [selectedDate, setSelectedDate] = useState('');

  // Mock teacher data for assignment
  const availableTeachers = [
    { id: 'T001', name: 'Dr. Sarah Miller', department: 'Mathematics' },
    { id: 'T002', name: 'Prof. John Wilson', department: 'Physics' },
    { id: 'T005', name: 'Ms. Lisa Anderson', department: 'Chemistry' },
    { id: 'T006', name: 'Mr. David Chen', department: 'Biology' },
  ];

  const filteredDuties = state.examDuties.filter(duty => {
    const matchesSearch = duty.examName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duty.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duty.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || duty.status === statusFilter;
    const matchesDate = !selectedDate || duty.date === selectedDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleAssignDuty = (dutyId: string, teacherId: string) => {
    const teacher = availableTeachers.find(t => t.id === teacherId);
    if (teacher) {
      assignExamDuty(dutyId, teacherId, teacher.name);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'assigned': return <UserCheck className="h-4 w-4 text-emerald-600" />;
      case 'completed': return <Calendar className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-amber-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Exam Duty Management</h1>
          <p className="text-slate-600 mt-1">Assign and manage exam invigilation duties</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Schedule New Duty</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search exams or subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="unassigned">Unassigned</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Filter className="h-4 w-4" />
            <span>{filteredDuties.length} duties</span>
          </div>
        </div>
      </div>

      {/* Exam Duties Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDuties.map((duty) => (
          <div key={duty.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{duty.examName}</h3>
                  <p className="text-sm text-slate-600">{duty.subject}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(duty.status)}
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${duty.status === 'assigned' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                    duty.status === 'completed' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      'bg-amber-100 text-amber-700 border-amber-200'
                    }`}>
                    {duty.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Date:</span>
                  <span className="text-slate-900 font-medium">{duty.date}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Time:</span>
                  <span className="text-slate-900">{duty.startTime} - {duty.endTime}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Room:</span>
                  <span className="text-slate-900">{duty.room}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Students:</span>
                  <span className="text-slate-900">{duty.studentCount}</span>
                </div>
              </div>

              {duty.requirements.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-2">Requirements:</p>
                  <div className="space-y-1">
                    {duty.requirements.map((req, index) => (
                      <div key={index} className="text-xs text-slate-700 bg-slate-50 px-2 py-1 rounded">
                        • {req}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {duty.assignedTeacherName && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-800">
                    <span className="font-medium">Assigned to:</span> {duty.assignedTeacherName}
                  </p>
                </div>
              )}

              {duty.status === 'unassigned' && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-700">Assign Teacher:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {availableTeachers.map((teacher) => (
                      <button
                        key={teacher.id}
                        onClick={() => handleAssignDuty(duty.id, teacher.id)}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all text-left"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">{teacher.name}</p>
                          <p className="text-xs text-slate-500">{teacher.department}</p>
                        </div>
                        <UserCheck className="h-4 w-4 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDuties.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Calendar className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No exam duties found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ExamDutyManager;