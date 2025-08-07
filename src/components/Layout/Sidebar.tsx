import React from 'react';
import {
  Users,
  Calendar,
  UserCheck,
  Settings,
  BookOpen,
  GraduationCap,
  Clock,
  School
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { NavigationItem } from '../../types';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'School',
    roles: ['system_admin', 'management', 'teacher', 'student', 'parent']
  },
  {
    id: 'users',
    label: 'User Management',
    icon: 'Users',
    roles: ['system_admin', 'management']
  },
  {
    id: 'admissiondashboard',
    label: 'Admission Management',
    icon: 'GraduationCap',
    roles: ['system_admin', 'management']
  },
  {
    id: 'students',
    label: 'Students Management',
    icon: 'GraduationCap',
    roles: ['system_admin', 'management']
  },
  {
    id: 'teachers',
    label: 'Staffs Management',
    icon: 'UserCheck',
    roles: ['system_admin', 'management']
  },
  {
    id: 'grades',
    label: 'Grades & Sections',
    icon: 'GraduationCap',
    roles: ['system_admin', 'management', 'teacher']
  },
  {
    id: 'subjects',
    label: 'Subjects',
    icon: 'BookOpen',
    roles: ['system_admin', 'management', 'teacher']
  },
  {
    id: 'timetable',
    label: 'Time Table',
    icon: 'Clock',
    roles: ['system_admin', 'management', 'teacher', 'student', 'parent']
  },
  {
    id: 'attendance',
    label: 'Attendance',
    icon: 'UserCheck',
    roles: ['system_admin', 'management', 'teacher']
  },
  {
    id: 'teachersassignment',
    label: 'Teachers Assignment',
    icon: 'UserCheck',
    roles: ['system_admin', 'management', 'teacher']
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    roles: ['system_admin', 'management']
  }
];

const iconMap = {
  School,
  Users,
  GraduationCap,
  BookOpen,
  Clock,
  UserCheck,
  Settings
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { hasRole } = useAuth();

  const filteredItems = navigationItems.filter(item => hasRole(item.roles));

  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img src="/Logo.svg" alt="" className='w-8 h-8' />
          <h1 className="text-xl font-bold text-gray-800">Pranati SMS</h1>
        </div>
      </div>

      <nav className="mt-6">
        {filteredItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors duration-200 ${activeTab === item.id
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};