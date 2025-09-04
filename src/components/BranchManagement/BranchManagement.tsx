import React, { useState } from 'react';
import { Plus, Search, Filter, MapPin, Users, Building2, Phone } from 'lucide-react';
import BranchCard from './BranchCard';
import AddBranchModal from './AddBranchModal';
import BranchDetailsModal from './BranchDetailsModal';

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

const mockBranches: Branch[] = [
  {
    id: '1',
    name: 'Central Campus',
    code: 'CC001',
    address: '123 Education Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    phone: '+91 9876543210',
    email: 'central@school.edu',
    principal: 'Dr. Rajesh Kumar',
    studentCount: 1250,
    teacherCount: 85,
    status: 'active',
    establishedYear: 1995,
    affiliation: 'CBSE',
    type: 'all'
  },
  {
    id: '2',
    name: 'North Branch',
    code: 'NB002',
    address: '456 Learning Avenue',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    phone: '+91 9876543211',
    email: 'north@school.edu',
    principal: 'Mrs. Priya Sharma',
    studentCount: 980,
    teacherCount: 68,
    status: 'active',
    establishedYear: 2005,
    affiliation: 'CBSE',
    type: 'secondary'
  },
  {
    id: '3',
    name: 'South Campus',
    code: 'SC003',
    address: '789 Knowledge Road',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    phone: '+91 9876543212',
    email: 'south@school.edu',
    principal: 'Mr. Arun Patel',
    studentCount: 1450,
    teacherCount: 92,
    status: 'active',
    establishedYear: 2010,
    affiliation: 'ICSE',
    type: 'all'
  },
  {
    id: '4',
    name: 'East Branch',
    code: 'EB004',
    address: '321 Wisdom Lane',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700001',
    phone: '+91 9876543213',
    email: 'east@school.edu',
    principal: 'Dr. Meena Roy',
    studentCount: 750,
    teacherCount: 52,
    status: 'inactive',
    establishedYear: 2015,
    affiliation: 'State Board',
    type: 'primary'
  }
];

const BranchManagement: React.FC = () => {
  const [branches] = useState<Branch[]>(mockBranches);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'primary' | 'secondary' | 'higher_secondary'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredBranches = branches.filter(branch => {
    const matchesSearch = branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         branch.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || branch.status === statusFilter;
    const matchesType = typeFilter === 'all' || branch.type === typeFilter || branch.type === 'all';
    return matchesSearch && matchesStatus && matchesType;
  });

  const activeBranches = branches.filter(b => b.status === 'active').length;
  const totalStudents = branches.reduce((sum, b) => sum + b.studentCount, 0);
  const totalTeachers = branches.reduce((sum, b) => sum + b.teacherCount, 0);

  const handleBranchClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setShowDetailsModal(true);
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Branch Management</h1>
            <p className="text-gray-600 mt-1">Manage individual schools and their details</p>
          </div>
          <button
            onClick={() => {
              setSelectedBranch(null);
              setShowAddModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Branch
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Branches</p>
                <p className="text-2xl font-bold text-gray-900">{branches.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Branches</p>
                <p className="text-2xl font-bold text-green-600">{activeBranches}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-purple-600">{totalStudents.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-2xl font-bold text-orange-600">{totalTeachers}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search branches by name, code, or city..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="higher_secondary">Higher Secondary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Branch Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBranches.map((branch) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              onClick={() => handleBranchClick(branch)}
              onEdit={() => handleEditBranch(branch)}
            />
          ))}
        </div>

        {filteredBranches.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No branches found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Add/Edit Branch Modal */}
      {showAddModal && (
        <AddBranchModal
          branch={selectedBranch}
          onClose={() => {
            setShowAddModal(false);
            setSelectedBranch(null);
          }}
          onSave={(branchData) => {
            console.log('Save branch:', branchData);
            setShowAddModal(false);
            setSelectedBranch(null);
          }}
        />
      )}

      {/* Branch Details Modal */}
      {showDetailsModal && selectedBranch && (
        <BranchDetailsModal
          branch={selectedBranch}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedBranch(null);
          }}
          onEdit={() => {
            setShowDetailsModal(false);
            setShowAddModal(true);
          }}
        />
      )}
    </div>
  );
};

export default BranchManagement;