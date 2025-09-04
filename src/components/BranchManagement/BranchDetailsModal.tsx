import React from 'react';
import { X, Edit, MapPin, Phone, Mail, Users, GraduationCap, Building2, Calendar, Award, User } from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  principal: string;
  studentCount: number;
  teacherCount: number;
  status: 'active' | 'inactive';
  establishedYear: number;
  affiliation: string;
  type: 'primary' | 'secondary' | 'higher_secondary' | 'all';
}

interface BranchDetailsModalProps {
  branch: Branch;
  onClose: () => void;
  onEdit: () => void;
}

const BranchDetailsModal: React.FC<BranchDetailsModalProps> = ({ branch, onClose, onEdit }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'primary':
        return 'bg-blue-100 text-blue-800';
      case 'secondary':
        return 'bg-green-100 text-green-800';
      case 'higher_secondary':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'primary':
        return 'Primary School';
      case 'secondary':
        return 'Secondary School';
      case 'higher_secondary':
        return 'Higher Secondary School';
      default:
        return 'All Levels';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{branch.name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm text-gray-600">Code: {branch.code}</span>
                <span className={`px-3 py-1 text-sm rounded-full ${getTypeColor(branch.type)}`}>
                  {getTypeLabel(branch.type)}
                </span>
                <span className={`px-3 py-1 text-sm rounded-full ${branch.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}>
                  {branch.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-900">{branch.studentCount}</p>
                  <p className="text-sm text-blue-700">Students</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-emerald-600" />
                <div>
                  <p className="text-2xl font-bold text-emerald-900">{branch.teacherCount}</p>
                  <p className="text-sm text-emerald-700">Teachers</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-purple-900">{new Date().getFullYear() - branch.establishedYear}</p>
                  <p className="text-sm text-purple-700">Years Old</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-lg font-bold text-orange-900">{branch.affiliation}</p>
                  <p className="text-sm text-orange-700">Affiliation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location & Contact */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Address</p>
                    <p className="text-gray-900">{branch.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">City</p>
                      <p className="text-gray-900">{branch.city}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">State</p>
                      <p className="text-gray-900">{branch.state}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Pincode</p>
                    <p className="text-gray-900">{branch.pincode}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <a href={`tel:${branch.phone}`} className="text-blue-600 hover:underline">
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <a href={`mailto:${branch.email}`} className="text-blue-600 hover:underline">
                        {branch.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrative Info */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Administration
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Principal</p>
                    <p className="text-lg font-semibold text-gray-900">{branch.principal}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Established Year</p>
                    <p className="text-gray-900">{branch.establishedYear}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Board Affiliation</p>
                    <p className="text-gray-900">{branch.affiliation}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Capacity & Performance
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{branch.studentCount}</p>
                      <p className="text-sm text-gray-600">Total Students</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <p className="text-2xl font-bold text-emerald-600">{branch.teacherCount}</p>
                      <p className="text-sm text-gray-600">Total Teachers</p>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg">
                    <p className="text-xl font-bold text-gray-900">
                      {Math.round(branch.studentCount / branch.teacherCount)}:1
                    </p>
                    <p className="text-sm text-gray-600">Student-Teacher Ratio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-xl border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Users className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Manage Students</p>
                <p className="text-sm text-gray-600">View and manage student records</p>
              </button>

              <button className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left">
                <GraduationCap className="w-6 h-6 text-emerald-600 mb-2" />
                <p className="font-medium text-gray-900">Manage Teachers</p>
                <p className="text-sm text-gray-600">View and manage teacher profiles</p>
              </button>

              <button className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Building2 className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Branch Reports</p>
                <p className="text-sm text-gray-600">Generate branch performance reports</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchDetailsModal;