import {
  BarChart3,
  Calendar,
  Clock,
  Eye,
  FileText,
  TrendingUp
} from 'lucide-react';
import React, { useState } from 'react';
import { useTeacherTasks } from '../../contexts/TeacherTaskContext';

const TaskReports: React.FC = () => {
  const { state } = useTeacherTasks();
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('week');

  const reportMetrics = {
    totalProcessed: 47,
    approvalRate: 85,
    avgProcessingTime: 2.3,
    dutyAssignments: 23,
  };

  const reports = [
    {
      id: 'overview',
      title: 'Task Overview',
      description: 'General statistics and performance metrics',
      icon: BarChart3,
    },
    {
      id: 'leave-analysis',
      title: 'Leave Analysis',
      description: 'Student leave patterns and approval trends',
      icon: FileText,
    },
    {
      id: 'duty-distribution',
      title: 'Duty Distribution',
      description: 'Exam and extra duty assignment statistics',
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Task Reports</h1>
          <p className="text-slate-600 mt-1">Analytics and insights for teacher task management</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
          </select>
          {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button> */}
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-600">Tasks Processed</h3>
              <p className="text-2xl font-bold text-slate-900">{reportMetrics.totalProcessed}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span>+12% this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-600">Approval Rate</h3>
              <p className="text-2xl font-bold text-slate-900">{reportMetrics.approvalRate}%</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span>+3% this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-600">Avg. Processing</h3>
              <p className="text-2xl font-bold text-slate-900">{reportMetrics.avgProcessingTime}h</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span>-15min this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3 mb-2">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-600">Duty Assignments</h3>
              <p className="text-2xl font-bold text-slate-900">{reportMetrics.dutyAssignments}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-emerald-600">
            <TrendingUp className="h-4 w-4" />
            <span>+8% this week</span>
          </div>
        </div>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className={`bg-white rounded-xl border p-6 shadow-sm cursor-pointer transition-all duration-200 ${selectedReport === report.id
              ? 'border-blue-500 ring-2 ring-blue-100'
              : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            onClick={() => setSelectedReport(report.id)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${selectedReport === report.id ? 'bg-blue-100' : 'bg-slate-100'
                }`}>
                <report.icon className={`h-5 w-5 ${selectedReport === report.id ? 'text-blue-600' : 'text-slate-600'
                  }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{report.title}</h3>
                <p className="text-sm text-slate-500">{report.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Last updated: 2 hours ago</span>
              <button className="text-blue-600 hover:text-blue-700 transition-colors">
                <Eye className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Current Report View */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              {reports.find(r => r.id === selectedReport)?.title}
            </h2>
            <div className="text-sm text-slate-500">
              Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="p-6">
          {selectedReport === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Task Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Leave Approvals</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Exam Duties</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900">25%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Extra Duties</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900">15%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Weekly Trends</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Monday</span>
                      <div className="flex space-x-1">
                        {[8, 12, 6, 4, 9].map((height, i) => (
                          <div key={i} className={`w-3 bg-blue-500 rounded-sm`} style={{ height: `${height * 2}px` }}></div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Tuesday</span>
                      <div className="flex space-x-1">
                        {[6, 8, 10, 7, 5].map((height, i) => (
                          <div key={i} className={`w-3 bg-blue-500 rounded-sm`} style={{ height: `${height * 2}px` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'leave-analysis' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {state.leaveApplications.filter(app => app.status === 'approved').length}
                  </div>
                  <p className="text-sm text-slate-600">Approved Applications</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {state.leaveApplications.filter(app => app.status === 'rejected').length}
                  </div>
                  <p className="text-sm text-slate-600">Rejected Applications</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {state.leaveApplications.filter(app => app.status === 'pending').length}
                  </div>
                  <p className="text-sm text-slate-600">Pending Review</p>
                </div>
              </div>
            </div>
          )}

          {selectedReport === 'duty-distribution' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Exam Duty Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Assigned</span>
                      <span className="text-sm font-medium text-slate-900">
                        {state.examDuties.filter(d => d.status === 'assigned').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Unassigned</span>
                      <span className="text-sm font-medium text-slate-900">
                        {state.examDuties.filter(d => d.status === 'unassigned').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Completed</span>
                      <span className="text-sm font-medium text-slate-900">
                        {state.examDuties.filter(d => d.status === 'completed').length}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Extra Duty Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Assigned</span>
                      <span className="text-sm font-medium text-slate-900">
                        {state.extraDuties.filter(d => d.status === 'assigned').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Pending</span>
                      <span className="text-sm font-medium text-slate-900">
                        {state.extraDuties.filter(d => d.status === 'pending').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Completed</span>
                      <span className="text-sm font-medium text-slate-900">
                        {state.extraDuties.filter(d => d.status === 'completed').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskReports;