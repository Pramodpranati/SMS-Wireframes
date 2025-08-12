import React, { useState } from 'react';
import { Calendar, User, Clock, MessageCircle, GraduationCap, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { LeaveApplication } from '../../types/Leave';

interface LeaveApplicationCardProps {
  application: LeaveApplication;
  onStatusUpdate: (id: string, status: 'approved' | 'rejected', comments?: string) => void;
  showActions: boolean;
}

const LeaveApplicationCard: React.FC<LeaveApplicationCardProps> = ({
  application,
  onStatusUpdate,
  showActions
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [comments, setComments] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case 'sick': return '🤒';
      case 'personal': return '👤';
      case 'emergency': return '🚨';
      case 'vacation': return '🏖️';
      case 'medical': return '🏥';
      case 'family': return '👨‍👩‍👧‍👦';
      default: return '📋';
    }
  };

  const calculateDays = () => {
    const start = new Date(application.startDate);
    const end = new Date(application.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleApproval = (status: 'approved' | 'rejected') => {
    onStatusUpdate(application.id, status, comments);
    setShowApprovalForm(false);
    setComments('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {application.applicantType === 'student' ? (
                <GraduationCap className="h-8 w-8 text-blue-600" />
              ) : (
                <Briefcase className="h-8 w-8 text-green-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{application.applicantName}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {application.applicantType === 'student' 
                    ? `Class ${application.className} • ${application.admissionNumber}`
                    : `${application.designation} • ${application.department}`
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Leave Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getLeaveTypeIcon(application.leaveType)}</span>
            <div>
              <p className="text-sm font-medium text-gray-900 capitalize">{application.leaveType} Leave</p>
              <p className="text-xs text-gray-600">{calculateDays()} day(s)</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {new Date(application.startDate).toLocaleDateString()} - {new Date(application.endDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-600">Leave Period</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {new Date(application.appliedDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-600">Applied On</p>
            </div>
          </div>
        </div>

        {/* Reason Preview */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 line-clamp-2">{application.reason}</p>
        </div>

        {/* Assigned To */}
        {application.assignedToName && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Assigned to:</span> {application.assignedToName}
            </p>
          </div>
        )}

        {/* Comments */}
        {application.comments && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <MessageCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Comments:</p>
                <p className="text-sm text-yellow-700 mt-1">{application.comments}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <span>{showDetails ? 'Hide' : 'Show'} Details</span>
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showActions && application.status === 'pending' && (
            <div className="flex space-x-2">
              <button
                onClick={() => setShowApprovalForm(!showApprovalForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
              >
                Review
              </button>
            </div>
          )}
        </div>

        {/* Detailed View */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Full Reason:</p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{application.reason}</p>
            </div>
            
            {application.attachments && application.attachments.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Attachments:</p>
                <div className="space-y-1">
                  {application.attachments.map((file, index) => (
                    <div key={index} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                      📎 {file}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Approval Form */}
        {showApprovalForm && (
          <div className="mt-4 pt-4 border-t">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Review Application</h4>
              
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Comments (Optional)</label>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Add any comments or instructions..."
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleApproval('approved')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval('rejected')}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                >
                  Reject
                </button>
                <button
                  onClick={() => setShowApprovalForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveApplicationCard;