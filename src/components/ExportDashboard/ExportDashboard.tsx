import React from 'react';
import { FileText, Download, Users, GraduationCap, Calendar, TrendingUp } from 'lucide-react';
import ExportReports from '../Reports/ExportReports';
import QuickExportPanel from '../Reports/QuickExportPanel';

const ExportDashboard: React.FC = () => {
  const exportStats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Completed Marksheets',
      value: '1,156',
      change: '+8%',
      icon: GraduationCap,
      color: 'green'
    },
    {
      title: 'This Month Exports',
      value: '89',
      change: '+24%',
      icon: Download,
      color: 'purple'
    },
    {
      title: 'Report Templates',
      value: '12',
      change: '+2',
      icon: FileText,
      color: 'amber'
    }
  ];

  const recentExports = [
    {
      id: 1,
      type: 'Student Details',
      format: 'PDF',
      records: 156,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Marksheet',
      format: 'CSV',
      records: 89,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'Student Details',
      format: 'PDF',
      records: 234,
      date: '2024-01-13',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Export Dashboard</h1>
          <p className="text-slate-600">Manage and track all your export activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {exportStats.map((stat, index) => {
            const IconComponent = stat.icon;
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              green: 'bg-green-100 text-green-600',
              purple: 'bg-purple-100 text-purple-600',
              amber: 'bg-amber-100 text-amber-600'
            };

            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.title}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Quick Export Panel */}
          <div className="xl:col-span-1">
            <QuickExportPanel />
          </div>

          {/* Main Export Interface */}
          <div className="xl:col-span-2">
            <ExportReports />
          </div>
        </div>

        {/* Recent Exports */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-slate-600" />
            Recent Exports
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Report Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Format</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Records</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentExports.map(exportItem => (
                  <tr key={exportItem.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-900">{exportItem.type}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${exportItem.format === 'PDF'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                        }`}>
                        {exportItem.format}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-600">{exportItem.records}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {new Date(exportItem.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Completed
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportDashboard;