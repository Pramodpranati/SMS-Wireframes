import React, { useState } from 'react';
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Plus,
  BadgeCheck
} from 'lucide-react';
import AdmissionForm from './AdmissionForm';
import AdmissionStatus from './AdmissionStatus';
import ApprovalWorkflow from './ApprovalWorkflow';

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  thisMonthApplications: number;
  averageProcessingTime: number;
}

interface RecentActivity {
  id: string;
  type: 'application_submitted' | 'application_approved' | 'application_rejected' | 'document_uploaded';
  studentName: string;
  applicationNumber: string;
  timestamp: string;
  details: string;
}

export default function AdmissionDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');
  const [showForm, setShowForm] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState(false)

  // Mock data - in real app, this would come from your backend
  const stats: DashboardStats = {
    totalApplications: 156,
    pendingApplications: 24,
    approvedApplications: 118,
    rejectedApplications: 14,
    thisMonthApplications: 45,
    averageProcessingTime: 7
  };

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'application_submitted',
      studentName: 'Rahul Kumar',
      applicationNumber: 'ADM2024045',
      timestamp: '2024-01-23T10:30:00',
      details: 'New admission application submitted for Class 9'
    },
    {
      id: '2',
      type: 'application_approved',
      studentName: 'Priya Sharma',
      applicationNumber: 'ADM2024044',
      timestamp: '2024-01-23T09:15:00',
      details: 'Application approved by Principal for Class 6'
    },
    {
      id: '3',
      type: 'document_uploaded',
      studentName: 'Arjun Patel',
      applicationNumber: 'ADM2024043',
      timestamp: '2024-01-23T08:45:00',
      details: 'Community certificate uploaded'
    },
    {
      id: '4',
      type: 'application_rejected',
      studentName: 'Sneha Gupta',
      applicationNumber: 'ADM2024042',
      timestamp: '2024-01-22T16:20:00',
      details: 'Application rejected due to incomplete documents'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'application_submitted':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'application_approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'application_rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'document_uploaded':
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="mx-auto">
          <button
            onClick={() => setShowForm(false)}
            className="mb-4 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>
          <AdmissionForm />
        </div>
      </div>
    );
  }

  if (showStatus) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="mx-auto">
          <button
            onClick={() => setShowStatus(false)}
            className="mb-4 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>
          <AdmissionStatus />
        </div>
      </div>
    );
  }

  if (approvalStatus) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="mx-auto">
          <button
            onClick={() => setApprovalStatus(false)}
            className="mb-4 px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>
          <ApprovalWorkflow />
        </div>
      </div>
    );
  }




  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admission Dashboard</h1>
          <p className="text-gray-600">Overview of admission applications and approval process</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Applications"
            value={stats.totalApplications}
            subtitle="All time"
            color="bg-blue-500"
          />
          <StatCard
            icon={Clock}
            title="Pending Review"
            value={stats.pendingApplications}
            subtitle="Awaiting approval"
            color="bg-amber-500"
          />
          <StatCard
            icon={CheckCircle}
            title="Approved"
            value={stats.approvedApplications}
            subtitle="Successfully admitted"
            color="bg-green-500"
          />
          <StatCard
            icon={TrendingUp}
            title="This Month"
            value={stats.thisMonthApplications}
            subtitle="New applications"
            color="bg-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="text-sm border border-gray-300 rounded px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="today">Today</option>
                      <option value="this_week">This Week</option>
                      <option value="this_month">This Month</option>
                    </select>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <div className="mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-800">{activity.studentName}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(activity.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                        <p className="text-xs text-gray-400 mt-1">App #: {activity.applicationNumber}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => setShowForm(true)} // Set state to show the form
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Application
                </button>
                <button onClick={() => setApprovalStatus(true)} className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <BadgeCheck className="w-4 h-4 mr-2" />
                  Admission Approval
                </button>
                <button onClick={() => setShowStatus(true)} className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <FileText className="w-4 h-4 mr-2" />
                  View All Applications
                </button>
              </div>
            </div>

            {/* Processing Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Processing Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Average Processing Time</span>
                  <span className="font-semibold text-gray-800">{stats.averageProcessingTime} days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Approval Rate</span>
                  <span className="font-semibold text-green-600">
                    {Math.round((stats.approvedApplications / stats.totalApplications) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pending Reviews</span>
                  <span className="font-semibold text-amber-600">{stats.pendingApplications}</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <Calendar className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Admission Deadline</p>
                    <p className="text-xs text-red-600">Class 11 - Feb 15, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Document Submission</p>
                    <p className="text-xs text-amber-600">Pending - Jan 30, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}