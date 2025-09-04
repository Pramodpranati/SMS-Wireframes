import React, { useState } from 'react';
import {
  Filter,
  Search,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Calendar,
  User
} from 'lucide-react';
import { useTeacherTasks } from '../../contexts/TeacherTaskContext';

const LeaveApproval: React.FC = () => {
  const { state, approveLeave, rejectLeave } = useTeacherTasks();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredApplications = state.leaveApplications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || app.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleApprove = (id: string) => {
    approveLeave(id, 'current-teacher-id');
  };

  const handleReject = (id: string) => {
    rejectLeave(id, 'current-teacher-id');
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
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leave Approval</h1>
          <p className="text-slate-600 mt-1">Review and process student leave applications</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search students..."
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
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
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
            <span>{filteredApplications.length} of {state.leaveApplications.length} applications</span>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredApplications.map((application) => (
          <div key={application.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{application.studentName}</h3>
                    <p className="text-sm text-slate-500">{application.studentClass}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(application.priority)}`}>
                    {application.priority}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span> */}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Type:</span>
                  <span className="text-slate-900 capitalize">{application.leaveType}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Period:</span>
                  <span className="text-slate-900">
                    {application.startDate} to {application.endDate}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="text-slate-600">Applied:</span>
                  <span className="text-slate-900">{application.appliedDate}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-600 mb-1">Reason:</p>
                <p className="text-sm text-slate-900 bg-slate-50 p-3 rounded-lg">{application.reason}</p>
              </div>

              {application.status === 'pending' && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleApprove(application.id)}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(application.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <XCircle className="h-4 w-4" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <FileText className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No applications found</h3>
          <p className="text-slate-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default LeaveApproval;