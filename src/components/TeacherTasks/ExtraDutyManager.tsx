import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  Users,
  BookOpen,
  Search,
  Filter,
  UserPlus,
  CheckCircle,
  Plus,
  Calendar
} from 'lucide-react';
import { useTeacherTasks } from '../../contexts/TeacherTaskContext';

const ExtraDutyManager: React.FC = () => {
  const { state, assignExtraDuty } = useTeacherTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'assigned' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Mock available teachers
  const availableTeachers = [
    { id: 'T001', name: 'Dr. Sarah Miller', subjects: ['Mathematics', 'Physics'] },
    { id: 'T005', name: 'Ms. Lisa Anderson', subjects: ['Chemistry', 'Biology'] },
    { id: 'T006', name: 'Mr. David Chen', subjects: ['English', 'History'] },
    { id: 'T007', name: 'Mrs. Emma Wilson', subjects: ['Geography', 'Social Studies'] },
  ];

  const filteredDuties = state.extraDuties.filter(duty => {
    const matchesSearch = duty.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duty.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      duty.absentTeacherName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || duty.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || duty.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAssignDuty = (dutyId: string, teacherId: string) => {
    const teacher = availableTeachers.find(t => t.id === teacherId);
    if (teacher) {
      assignExtraDuty(dutyId, teacherId, teacher.name);
    }
  };

  // const getPriorityColor = (priority: string) => {
  //   switch (priority) {
  //     case 'high': return 'bg-red-100 text-red-700 border-red-200';
  //     case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
  //     case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
  //     default: return 'bg-slate-100 text-slate-700 border-slate-200';
  //   }
  // };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Extra Duty Management</h1>
          <p className="text-slate-600 mt-1">Assign coverage for teacher absences</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Report Absence</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search duties..."
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
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <Filter className="h-4 w-4" />
            <span>{filteredDuties.length} duties</span>
          </div>
        </div>
      </div>

      {/* Urgent Duties Alert */}
      {/* {state.extraDuties.filter(d => d.status === 'pending' && d.priority === 'high').length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Urgent Action Required</h3>
              <p className="text-xs text-red-700 mt-1">
                {state.extraDuties.filter(d => d.status === 'pending' && d.priority === 'high').length} high-priority duties need immediate assignment
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* Extra Duties Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredDuties.map((duty) => (
          <div key={duty.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">{duty.subject}</h3>
                  <p className="text-sm text-slate-600">{duty.class}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(duty.priority)}`}>
                    {duty.priority}
                  </span> */}
                  {/* <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(duty.status)}`}>
                    {duty.status}
                  </span> */}
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">Teacher Absent</span>
                </div>
                <p className="text-sm text-red-700">{duty.absentTeacherName}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Date:</span>
                  <span className="text-slate-900 font-medium">{duty.date}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Period:</span>
                  <span className="text-slate-900">{duty.period}</span>
                </div>

                <div className="flex items-center space-x-3 text-sm">
                  <BookOpen className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Subject:</span>
                  <span className="text-slate-900">{duty.subject}</span>
                </div>
              </div>

              {duty.notes && (
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-1">Notes:</p>
                  <p className="text-sm text-slate-900 bg-slate-50 p-3 rounded-lg">{duty.notes}</p>
                </div>
              )}

              {duty.coverTeacherName && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm text-emerald-800">
                      <span className="font-medium">Covered by:</span> {duty.coverTeacherName}
                    </p>
                  </div>
                </div>
              )}

              {duty.status === 'pending' && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-slate-700">Available Teachers:</p>
                  <div className="grid grid-cols-1 gap-2">
                    {availableTeachers
                      .filter(teacher => teacher.subjects.includes(duty.subject))
                      .map((teacher) => (
                        <button
                          key={teacher.id}
                          onClick={() => handleAssignDuty(duty.id, teacher.id)}
                          className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-emerald-50 hover:border-emerald-300 transition-all text-left"
                        >
                          <div>
                            <p className="text-sm font-medium text-slate-900">{teacher.name}</p>
                            <p className="text-xs text-slate-500">{teacher.subjects.join(', ')}</p>
                          </div>
                          <UserPlus className="h-4 w-4 text-emerald-600" />
                        </button>
                      ))}
                  </div>
                  {availableTeachers.filter(t => t.subjects.includes(duty.subject)).length === 0 && (
                    <div className="text-center py-4 text-slate-500">
                      <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-amber-500" />
                      <p className="text-sm">No available teachers for {duty.subject}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDuties.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Users className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No extra duties found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ExtraDutyManager;