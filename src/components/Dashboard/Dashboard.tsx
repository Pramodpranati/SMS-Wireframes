import React from 'react';
import { Users, GraduationCap, BookOpen, Calendar } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { grades, subjects, students } = useSchool();
  const { user } = useAuth();

  const totalSections = grades.reduce((acc, grade) => acc + grade.sections.length, 0);
  const totalStudents = students.length;

  const stats = [
    {
      title: 'Total Grades',
      value: grades.length,
      icon: GraduationCap,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Sections',
      value: totalSections,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Subjects',
      value: subjects.length,
      icon: BookOpen,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Here's what's happening at your school today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Time table updated</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">New student enrolled</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">Subject added</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
              <Calendar className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-blue-800">View Time Table</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
              <Users className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-medium text-green-800">Mark Attendance</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
              <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-purple-800">Manage Grades</p>
            </button>
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200">
              <BookOpen className="w-6 h-6 text-orange-600 mb-2" />
              <p className="text-sm font-medium text-orange-800">Add Subject</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};