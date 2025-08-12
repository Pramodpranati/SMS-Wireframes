import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Filter, Users, AlertCircle } from 'lucide-react';
import { LeaveApplication } from '../../types/Leave';
import LeaveApplicationCard from './LeaveApplicationCard';

interface LeaveApprovalWorkflowProps {
  applications: LeaveApplication[];
  onStatusUpdate: (id: string, status: 'approved' | 'rejected', comments?: string) => void;
  userRole: 'teacher' | 'admin';
}

const LeaveApprovalWorkflow: React.FC<LeaveApprovalWorkflowProps> = ({
  applications,
  onStatusUpdate,
  userRole
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'urgent'>('pending');

  const filteredApplications = applications.filter(app => {
    if (activeFilter === 'pending') return app.status === 'pending';
    if (activeFilter === 'urgent') {
      // Consider emergency leaves or leaves starting within 2 days as urgent
      const startDate = new Date(app.startDate);
      const today = new Date();
      const daysUntilLeave = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return app.status === 'pending' && (app.leaveType === 'emergency' || daysUntilLeave <= 2);
    }
    return true;
  });

  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const urgentCount = applications.filter(app => {
    const startDate = new Date(app.startDate);
    const today = new Date();
    const daysUntilLeave = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return app.status === 'pending' && (app.leaveType === 'emergency' || daysUntilLeave <= 2);
  }).length;

  const FilterButton: React.FC<{
    filter: 'all' | 'pending' | 'urgent';
    label: string;
    count?: number;
    icon: React.ReactNode;
  }> = ({ filter, label, count, icon }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
        activeFilter === filter
          ? 'bg-blue-600 text-white border-blue-600 shadow-md'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          activeFilter === filter
            ? 'bg-white text-blue-600'
            : 'bg-blue-100 text-blue-600'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {userRole === 'teacher' ? 'Student Leave Approvals' : 'Leave Approvals'}
            </h2>
            <p className="text-gray-600 mt-1">
              {userRole === 'teacher' 
                ? 'Review and approve leave applications from your students'
                : 'Review and approve leave applications from staff members'
              }
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-2xl">
            <Users className="h-6 w-6 text-gray-500" />
            <span className="font-bold text-gray-900">{filteredApplications.length}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <FilterButton
            filter="all"
            label="All Applications"
            count={applications.length}
            icon={<Users className="h-4 w-4" />}
          />
          <FilterButton
            filter="pending"
            label="Pending Review"
            count={pendingCount}
            icon={<Clock className="h-4 w-4" />}
          />
          <FilterButton
            filter="urgent"
            label="Urgent"
            count={urgentCount}
            icon={<AlertCircle className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* Quick Actions for Pending Applications */}
      {pendingCount > 0 && activeFilter === 'pending' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-orange-800">
                {pendingCount} application{pendingCount !== 1 ? 's' : ''} awaiting your review
              </h3>
              <p className="text-sm text-orange-700 mt-1">
                Please review and take action to ensure timely responses to applicants.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No applications to review
            </h3>
            <p className="text-gray-600">
              {activeFilter === 'pending' 
                ? 'All caught up! No pending applications at the moment.'
                : 'No applications match the selected filter.'
              }
            </p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <LeaveApplicationCard
              key={application.id}
              application={application}
              onStatusUpdate={onStatusUpdate}
              showActions={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LeaveApprovalWorkflow;