import React, { useState, useEffect } from 'react';
import { Calendar, Users, FileText, Clock, Filter, Search, Plus } from 'lucide-react';
import StudentLeaveForm from './StudentLeaveForm';
import StaffLeaveForm from './StaffLeaveForm';
import LeaveApplicationCard from './LeaveApplicationCard';
import LeaveApprovalWorkflow from './LeaveApprovalWorkflow';
import { LeaveApplication, LeaveStats } from '../../types/Leave';

const LeaveManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'apply' | 'approve'>('dashboard');
  const [userRole, setUserRole] = useState<'student' | 'staff' | 'teacher' | 'admin'>('student');
  const [showForm, setShowForm] = useState(false);
  const [applications, setApplications] = useState<LeaveApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<LeaveApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [stats, setStats] = useState<LeaveStats>({
    totalApplications: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
  });

  // Mock data for demonstration
  useEffect(() => {
    const mockApplications: LeaveApplication[] = [
      {
        id: '1',
        applicantId: 'STU001',
        applicantName: 'John Smith',
        applicantType: 'student',
        leaveType: 'sick',
        startDate: '2025-01-20',
        endDate: '2025-01-22',
        reason: 'Fever and cold symptoms',
        status: 'pending',
        appliedDate: '2025-01-15',
        className: '10-A',
        admissionNumber: 'ADM2024001',
        assignedTo: 'TCH001',
        assignedToName: 'Mrs. Sarah Johnson'
      },
      {
        id: '2',
        applicantId: 'STF001',
        applicantName: 'Robert Wilson',
        applicantType: 'staff',
        leaveType: 'personal',
        startDate: '2025-01-25',
        endDate: '2025-01-26',
        reason: 'Family function',
        status: 'approved',
        appliedDate: '2025-01-10',
        department: 'Mathematics',
        designation: 'Senior Teacher',
        employeeId: 'EMP2023015',
        assignedTo: 'ADM001',
        assignedToName: 'Principal Dr. Anderson',
        comments: 'Approved with substitute teacher arrangement'
      },
      {
        id: '3',
        applicantId: 'STU002',
        applicantName: 'Emily Davis',
        applicantType: 'student',
        leaveType: 'medical',
        startDate: '2025-01-18',
        endDate: '2025-01-19',
        reason: 'Dental appointment',
        status: 'rejected',
        appliedDate: '2025-01-17',
        className: '9-B',
        admissionNumber: 'ADM2024089',
        assignedTo: 'TCH005',
        assignedToName: 'Mr. Michael Brown',
        comments: 'Please reschedule to non-exam days'
      }
    ];

    setApplications(mockApplications);
    setFilteredApplications(mockApplications);

    // Calculate stats
    const stats: LeaveStats = {
      totalApplications: mockApplications.length,
      pendingApplications: mockApplications.filter(app => app.status === 'pending').length,
      approvedApplications: mockApplications.filter(app => app.status === 'approved').length,
      rejectedApplications: mockApplications.filter(app => app.status === 'rejected').length,
    };
    setStats(stats);
  }, []);

  // Filter applications based on search and status
  useEffect(() => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.className && app.className.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (app.admissionNumber && app.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  }, [applications, searchTerm, statusFilter]);

  const handleNewApplication = (application: Omit<LeaveApplication, 'id' | 'appliedDate' | 'status'>) => {
    const newApp: LeaveApplication = {
      ...application,
      id: Date.now().toString(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setApplications(prev => [newApp, ...prev]);
    setShowForm(false);
  };

  const handleStatusUpdate = (id: string, status: 'approved' | 'rejected', comments?: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status, comments } : app
      )
    );
  };

  const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({
    title, value, icon, color
  }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color} hover:shadow-lg transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('border-l-', 'bg-').replace('-500', '-100')}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
            </div>
            
            {/* Role Selector */}
            {/* <div className="flex items-center space-x-4">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div> */}
          </div>
          
          {/* Navigation Tabs */}
          <div className="flex space-x-8 -mb-px">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'apply'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Apply for Leave
            </button>
            {(userRole === 'teacher' || userRole === 'admin') && (
              <button
                onClick={() => setActiveTab('approve')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'approve'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Approve Leaves
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Applications"
                value={stats.totalApplications}
                icon={<FileText className="h-6 w-6 text-blue-600" />}
                color="border-l-blue-500"
              />
              <StatCard
                title="Pending"
                value={stats.pendingApplications}
                icon={<Clock className="h-6 w-6 text-orange-600" />}
                color="border-l-orange-500"
              />
              <StatCard
                title="Approved"
                value={stats.approvedApplications}
                icon={<Users className="h-6 w-6 text-green-600" />}
                color="border-l-green-500"
              />
              <StatCard
                title="Rejected"
                value={stats.rejectedApplications}
                icon={<FileText className="h-6 w-6 text-red-600" />}
                color="border-l-red-500"
              />
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search applications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('apply');
                    setShowForm(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Application</span>
                </button>
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No leave applications found</h3>
                  <p className="text-gray-600">Start by creating your first leave application.</p>
                </div>
              ) : (
                filteredApplications.map((application) => (
                  <LeaveApplicationCard
                    key={application.id}
                    application={application}
                    onStatusUpdate={handleStatusUpdate}
                    showActions={userRole === 'teacher' || userRole === 'admin'}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* Apply Tab */}
        {activeTab === 'apply' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Apply for Leave</h2>
                <p className="text-blue-100 mt-1">
                  {userRole === 'student' 
                    ? 'Submit your leave application to your class teacher'
                    : 'Submit your leave application to management'
                  }
                </p>
              </div>
              
              <div className="p-6">
                {userRole === 'student' ? (
                  <StudentLeaveForm onSubmit={handleNewApplication} />
                ) : (
                  <StaffLeaveForm onSubmit={handleNewApplication} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Approve Tab */}
        {activeTab === 'approve' && (userRole === 'teacher' || userRole === 'admin') && (
          <LeaveApprovalWorkflow
            applications={applications.filter(app => 
              userRole === 'admin' || 
              (userRole === 'teacher' && app.applicantType === 'student')
            )}
            onStatusUpdate={handleStatusUpdate}
            userRole={userRole}
          />
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;