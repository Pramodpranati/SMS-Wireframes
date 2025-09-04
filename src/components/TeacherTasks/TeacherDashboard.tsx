import {
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  Users,
  XCircle
} from 'lucide-react';
import React from 'react';
import { useTeacherTasks } from '../../contexts/TeacherTaskContext';
import TaskCard from './TaskCard';

type TeacherDashboardProps = {
  onLeave: () => void;
  onExam: () => void;
  onExtra: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onLeave, onExam, onExtra }) => {
  const { state } = useTeacherTasks();

  const stats = [
    {
      title: 'Pending Leave Approvals',
      value: state.taskSummary.pendingLeaveApprovals,
      icon: FileText,
      color: 'bg-amber-500',
      trend: '+2 since yesterday',
    },
    {
      title: 'Unassigned Exam Duties',
      value: state.taskSummary.upcomingExamDuties,
      icon: Calendar,
      color: 'bg-blue-500',
      trend: '3 this week',
    },
    {
      title: 'Pending Extra Duties',
      value: state.taskSummary.pendingExtraDuties,
      icon: Clock,
      color: 'bg-red-500',
      trend: 'Urgent action needed',
    },
    {
      title: 'Total Active Tasks',
      value: state.taskSummary.totalTasks,
      icon: TrendingUp,
      color: 'bg-emerald-500',
      trend: 'Overall workload',
    },
  ];

  const recentLeaveApplications = state.leaveApplications
    .filter(app => app.status === 'pending')
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 5);

  const upcomingDuties = state.examDuties
    .filter(duty => duty.status === 'unassigned')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const pendingExtraDuties = state.extraDuties
    .filter(duty => duty.status === 'pending')
    .sort((a, b) => a.priority === 'high' ? -1 : 1)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Task List</h1>
          <p className="text-slate-600 mt-1">Manage student leave approvals, exam duties, and extra assignments</p>
        </div>
        {/* <div className="text-right">
          <div className="text-sm text-slate-500">Today</div>
          <div className="text-lg font-semibold text-slate-900">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div> */}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.trend}</div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-700">{stat.title}</h3>
          </div>
        ))}
      </div>

      {/* Task Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leave Applications */}
        <TaskCard
          title="Pending Leave Approvals"
          count={recentLeaveApplications.length}
          href="/leaveapproval"
        >
          <div className="space-y-3 cursor-pointer" onClick={onLeave}>
            {recentLeaveApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {/* <span className="font-medium text-slate-900">{application.studentName}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${application.priority === 'high' ? 'bg-red-100 text-red-700' :
                      application.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                      {application.priority}
                    </span> */}
                  </div>
                  <div className="text-xs text-slate-500">
                    {application.studentClass} • {application.leaveType} • {application.startDate}
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-green-100 rounded transition-colors">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </button>
                  <button className="p-1 hover:bg-red-100 rounded transition-colors">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
            {recentLeaveApplications.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                <p className="text-sm">All leave applications are processed!</p>
              </div>
            )}
          </div>
        </TaskCard>

        {/* Upcoming Exam Duties */}
        <TaskCard
          title="Unassigned Exam Duties"
          count={upcomingDuties.length}
          href="/exam-duty"
        >
          <div className="space-y-3 cursor-pointer" onClick={onExam}>
            {upcomingDuties.map((duty) => (
              <div key={duty.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">{duty.subject}</span>
                  <span className="text-xs text-slate-500">{duty.date}</span>
                </div>
                <div className="text-xs text-slate-600 mb-2">
                  {duty.startTime} - {duty.endTime} • {duty.room}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{duty.studentCount} students</span>
                  <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors">
                    Done
                  </button>
                </div>
              </div>
            ))}
            {upcomingDuties.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <p className="text-sm">All exam duties are assigned!</p>
              </div>
            )}
          </div>
        </TaskCard>

        {/* Pending Extra Duties */}
        <TaskCard
          title="Pending Extra Duties"
          count={pendingExtraDuties.length}
          href="/extra-duty"
        >
          <div className="space-y-3 cursor-pointer" onClick={onExtra}>
            {pendingExtraDuties.map((duty) => (
              <div key={duty.id} className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-slate-900">{duty.subject}</span>
                  {/* <span className={`px-2 py-1 text-xs rounded-full ${duty.priority === 'high' ? 'bg-red-100 text-red-700' :
                    duty.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                    {duty.priority}
                  </span> */}
                </div>
                <div className="text-xs text-slate-600 mb-2">
                  {duty.class} • {duty.period}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Cover for {duty.absentTeacherName}
                  </span>
                  {/* <button className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded hover:bg-emerald-200 transition-colors">
                    Assign
                  </button> */}
                </div>
              </div>
            ))}
            {pendingExtraDuties.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Users className="h-8 w-8 mx-auto mb-2 text-emerald-500" />
                <p className="text-sm">No extra duties pending!</p>
              </div>
            )}
          </div>
        </TaskCard>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">Approved leave for John Doe (8-A)</p>
                <p className="text-xs text-slate-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">Assigned Chemistry exam duty to Ms. Johnson</p>
                <p className="text-xs text-slate-500">4 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-slate-900">Extra duty assigned for Period 5 coverage</p>
                <p className="text-xs text-slate-500">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default TeacherDashboard;