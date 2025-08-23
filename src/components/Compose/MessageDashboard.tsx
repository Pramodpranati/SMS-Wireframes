import React, { useState } from 'react';
import { Send, History, FileText, Users, TrendingUp, MessageSquare, Calendar } from 'lucide-react';

interface MessageStats {
  totalSent: number;
  sentToday: number;
  scheduled: number;
  failed: number;
  emailsSent: number;
  smsSent: number;
}

const mockStats: MessageStats = {
  totalSent: 1247,
  sentToday: 23,
  scheduled: 5,
  failed: 2,
  emailsSent: 892,
  smsSent: 355
};

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

interface MessageDashboardProps {
  onNavigate: (view: string) => void;
}

const MessageDashboard: React.FC<MessageDashboardProps> = ({ onNavigate }) => {
  const quickActions: QuickAction[] = [
    {
      id: 'compose',
      title: 'Compose Message',
      description: 'Send a new message to students or staff',
      icon: <Send className="w-6 h-6" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: () => onNavigate('compose')
    },
    {
      id: 'templates',
      title: 'Message Templates',
      description: 'Use or create message templates',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      action: () => onNavigate('templates')
    },
    {
      id: 'history',
      title: 'Message History',
      description: 'View sent and scheduled messages',
      icon: <History className="w-6 h-6" />,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: () => onNavigate('history')
    },
    {
      id: 'bulk',
      title: 'Bulk Messages',
      description: 'Send messages to large groups',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-orange-600 hover:bg-orange-700',
      action: () => onNavigate('bulk')
    }
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Message sent to Grade 10 students',
      time: '2 hours ago',
      status: 'success',
      count: 45
    },
    {
      id: '2',
      action: 'Reminder scheduled for teaching staff',
      time: '4 hours ago',
      status: 'scheduled',
      count: 12
    },
    {
      id: '3',
      action: 'Holiday notice sent to all',
      time: '1 day ago',
      status: 'success',
      count: 298
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Messaging Dashboard</h1>
        <p className="text-gray-600">Manage all your school communications in one place</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.totalSent.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sent Today</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.sentToday}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-emerald-500">Active</span>
            <span className="text-gray-500 ml-1">messaging</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.scheduled}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-orange-500">Pending</span>
            <span className="text-gray-500 ml-1">delivery</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">{mockStats.failed}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <span className="text-red-500">Needs</span>
            <span className="text-gray-500 ml-1">attention</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className={`p-6 rounded-xl text-white text-left transition-all transform hover:scale-105 active:scale-95 ${action.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                {action.icon}
              </div>
              <h3 className="font-semibold mb-1">{action.title}</h3>
              <p className="text-sm opacity-90">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'scheduled' ? 'bg-blue-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">{activity.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Communication Method Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Methods</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Send className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email Messages</p>
                  <p className="text-sm text-gray-500">Primary communication method</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">{mockStats.emailsSent}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">SMS Messages</p>
                  <p className="text-sm text-gray-500">Instant notifications</p>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">{mockStats.smsSent}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageDashboard;