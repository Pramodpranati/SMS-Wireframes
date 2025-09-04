import React from 'react';
import { MapPin, Users, GraduationCap, Edit, MoreVertical, Phone, Mail } from 'lucide-react';

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

interface BranchCardProps {
  branch: Branch;
  onClick: () => void;
  onEdit: () => void;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch, onClick, onEdit }) => {
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
        return 'Primary';
      case 'secondary':
        return 'Secondary';
      case 'higher_secondary':
        return 'Higher Sec.';
      default:
        return 'All Levels';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1" onClick={onClick}>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(branch.type)}`}>
                {getTypeLabel(branch.type)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <span className="font-medium">Code:</span>
              <span>{branch.code}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{branch.city}, {branch.state}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 text-xs font-medium rounded-full ${
              branch.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {branch.status === 'active' ? 'Active' : 'Inactive'}
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Principal */}
        <div className="mb-4" onClick={onClick}>
          <div className="flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Principal:</span>
            <span className="font-medium text-gray-900">{branch.principal}</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-2 gap-3 mb-4" onClick={onClick}>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{branch.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="truncate">{branch.email}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100" onClick={onClick}>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{branch.studentCount}</div>
            <div className="text-xs text-gray-600">Students</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-emerald-600">{branch.teacherCount}</div>
            <div className="text-xs text-gray-600">Teachers</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4" onClick={onClick}>
          <div className="text-sm text-gray-600">
            <span>Est. {branch.establishedYear}</span>
          </div>
          <div className="text-sm font-medium text-blue-600">
            {branch.affiliation}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;