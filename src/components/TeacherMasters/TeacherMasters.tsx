import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Users,
  Building,
  X,
  Save,
  User,
  Home,
  Briefcase,
  Shield
} from 'lucide-react';

interface Teacher {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    profileImage?: string;
  };
  contactInfo: {
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
  };
  professionalInfo: {
    employeeId: string;
    department: string;
    position: string;
    dateOfJoining: string;
    qualification: string;
    experience: number;
    salary: number;
  };
  roles: {
    subjects: string[];
    administrativeRoles: string[];
    permissions: string[];
    isActive: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

const DEPARTMENTS = ['Mathematics', 'English', 'Science', 'History', 'Arts', 'Physical Education', 'Music', 'Computer Science'];
const SUBJECTS = ['Mathematics', 'English Literature', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'Art', 'Music', 'Physical Education', 'Computer Science', 'Economics'];
const ADMIN_ROLES = ['Department Head', 'Vice Principal', 'Principal', 'Coordinator', 'Counselor', 'Librarian'];
const PERMISSIONS = ['View Students', 'Edit Grades', 'Manage Attendance', 'Generate Reports', 'Manage Schedules'];

const TeacherManagement: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Initialize with sample data
  useEffect(() => {
    const sampleTeachers: Teacher[] = [
      {
        id: '1',
        personalInfo: {
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.johnson@school.edu',
          phone: '+1-555-0123',
          dateOfBirth: '1985-03-15',
          gender: 'female'
        },
        contactInfo: {
          address: {
            street: '123 Oak Street',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62701',
            country: 'USA'
          },
          emergencyContact: {
            name: 'Michael Johnson',
            relationship: 'Spouse',
            phone: '+1-555-0124',
            email: 'michael.johnson@email.com'
          }
        },
        professionalInfo: {
          employeeId: 'EMP001',
          department: 'Mathematics',
          position: 'Senior Teacher',
          dateOfJoining: '2018-08-15',
          qualification: 'M.Sc Mathematics',
          experience: 8,
          salary: 65000
        },
        roles: {
          subjects: ['Mathematics', 'Physics'],
          administrativeRoles: ['Department Head'],
          permissions: ['View Students', 'Edit Grades', 'Manage Attendance'],
          isActive: true
        },
        createdAt: '2018-08-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        personalInfo: {
          firstName: 'David',
          lastName: 'Chen',
          email: 'david.chen@school.edu',
          phone: '+1-555-0125',
          dateOfBirth: '1982-07-22',
          gender: 'male'
        },
        contactInfo: {
          address: {
            street: '456 Elm Avenue',
            city: 'Springfield',
            state: 'IL',
            zipCode: '62702',
            country: 'USA'
          },
          emergencyContact: {
            name: 'Lisa Chen',
            relationship: 'Spouse',
            phone: '+1-555-0126',
            email: 'lisa.chen@email.com'
          }
        },
        professionalInfo: {
          employeeId: 'EMP002',
          department: 'English',
          position: 'Teacher',
          dateOfJoining: '2020-01-10',
          qualification: 'M.A English Literature',
          experience: 6,
          salary: 58000
        },
        roles: {
          subjects: ['English Literature'],
          administrativeRoles: ['Coordinator'],
          permissions: ['View Students', 'Edit Grades'],
          isActive: true
        },
        createdAt: '2020-01-10T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      }
    ];
    setTeachers(sampleTeachers);
    setFilteredTeachers(sampleTeachers);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = teachers;

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        `${teacher.personalInfo.firstName} ${teacher.personalInfo.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        teacher.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.professionalInfo.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDepartment !== 'all') {
      filtered = filtered.filter(teacher => teacher.professionalInfo.department === filterDepartment);
    }

    if (filterStatus !== 'all') {
      const isActive = filterStatus === 'active';
      filtered = filtered.filter(teacher => teacher.roles.isActive === isActive);
    }

    setFilteredTeachers(filtered);
  }, [teachers, searchTerm, filterDepartment, filterStatus]);

  const handleAddTeacher = (teacherData: Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTeachers([...teachers, newTeacher]);
    setShowAddModal(false);
  };

  const handleEditTeacher = (teacherData: Teacher) => {
    const updatedTeachers = teachers.map(teacher =>
      teacher.id === teacherData.id
        ? { ...teacherData, updatedAt: new Date().toISOString() }
        : teacher
    );
    setTeachers(updatedTeachers);
    setShowEditModal(false);
    setSelectedTeacher(null);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
    }
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowViewModal(true);
  };

  const handleEditClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Teachers Management</h1>
          <p className="text-gray-600">Manage teacher profiles, roles, and contact information</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-3">
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Teacher
            </button>
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onView={() => handleViewTeacher(teacher)}
              onEdit={() => handleEditClick(teacher)}
              onDelete={() => handleDeleteTeacher(teacher.id)}
            />
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No teachers found</h3>
            <p className="text-gray-500">Try adjusting your search or filters, or add a new teacher.</p>
          </div>
        )}

        {/* Modals */}
        {showAddModal && (
          <TeacherModal
            mode="add"
            onClose={() => setShowAddModal(false)}
            onSave={handleAddTeacher}
          />
        )}

        {showEditModal && selectedTeacher && (
          <TeacherModal
            mode="edit"
            teacher={selectedTeacher}
            onClose={() => {
              setShowEditModal(false);
              setSelectedTeacher(null);
            }}
            onSave={handleEditTeacher}
          />
        )}

        {showViewModal && selectedTeacher && (
          <TeacherViewModal
            teacher={selectedTeacher}
            onClose={() => {
              setShowViewModal(false);
              setSelectedTeacher(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

// Teacher Card Component
const TeacherCard: React.FC<{
  teacher: Teacher;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ teacher, onView, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {teacher.personalInfo.firstName} {teacher.personalInfo.lastName}
              </h3>
              <p className="text-sm text-gray-500">{teacher.professionalInfo.employeeId}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${teacher.roles.isActive
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                }`}
            >
              {teacher.roles.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            {teacher.professionalInfo.department}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-2" />
            {teacher.professionalInfo.position}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {teacher.personalInfo.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {teacher.personalInfo.phone}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Subjects:</p>
          <div className="flex flex-wrap gap-1">
            {teacher.roles.subjects.slice(0, 2).map((subject) => (
              <span
                key={subject}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
              >
                {subject}
              </span>
            ))}
            {teacher.roles.subjects.length > 2 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                +{teacher.roles.subjects.length - 2} more
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">
          <button
            onClick={onView}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Teacher Modal Component
const TeacherModal: React.FC<{
  mode: 'add' | 'edit';
  teacher?: Teacher;
  onClose: () => void;
  onSave: (teacher: any) => void;
}> = ({ mode, teacher, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Teacher, 'id' | 'createdAt' | 'updatedAt'>>({
    personalInfo: {
      firstName: teacher?.personalInfo.firstName || '',
      lastName: teacher?.personalInfo.lastName || '',
      email: teacher?.personalInfo.email || '',
      phone: teacher?.personalInfo.phone || '',
      dateOfBirth: teacher?.personalInfo.dateOfBirth || '',
      gender: teacher?.personalInfo.gender || 'male'
    },
    contactInfo: {
      address: {
        street: teacher?.contactInfo.address.street || '',
        city: teacher?.contactInfo.address.city || '',
        state: teacher?.contactInfo.address.state || '',
        zipCode: teacher?.contactInfo.address.zipCode || '',
        country: teacher?.contactInfo.address.country || 'USA'
      },
      emergencyContact: {
        name: teacher?.contactInfo.emergencyContact.name || '',
        relationship: teacher?.contactInfo.emergencyContact.relationship || '',
        phone: teacher?.contactInfo.emergencyContact.phone || '',
        email: teacher?.contactInfo.emergencyContact.email || ''
      }
    },
    professionalInfo: {
      employeeId: teacher?.professionalInfo.employeeId || '',
      department: teacher?.professionalInfo.department || '',
      position: teacher?.professionalInfo.position || '',
      dateOfJoining: teacher?.professionalInfo.dateOfJoining || '',
      qualification: teacher?.professionalInfo.qualification || '',
      experience: teacher?.professionalInfo.experience || 0,
      salary: teacher?.professionalInfo.salary || 0
    },
    roles: {
      subjects: teacher?.roles.subjects || [],
      administrativeRoles: teacher?.roles.administrativeRoles || [],
      permissions: teacher?.roles.permissions || [],
      isActive: teacher?.roles.isActive ?? true
    }
  });

  const [activeTab, setActiveTab] = useState('personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'edit' && teacher) {
      onSave({ ...teacher, ...formData });
    } else {
      onSave(formData);
    }
  };

  const handleSubjectToggle = (subject: string) => {
    const updatedSubjects = formData.roles.subjects.includes(subject)
      ? formData.roles.subjects.filter(s => s !== subject)
      : [...formData.roles.subjects, subject];

    setFormData({
      ...formData,
      roles: { ...formData.roles, subjects: updatedSubjects }
    });
  };

  const handleRoleToggle = (role: string) => {
    const updatedRoles = formData.roles.administrativeRoles.includes(role)
      ? formData.roles.administrativeRoles.filter(r => r !== role)
      : [...formData.roles.administrativeRoles, role];

    setFormData({
      ...formData,
      roles: { ...formData.roles, administrativeRoles: updatedRoles }
    });
  };

  const handlePermissionToggle = (permission: string) => {
    const updatedPermissions = formData.roles.permissions.includes(permission)
      ? formData.roles.permissions.filter(p => p !== permission)
      : [...formData.roles.permissions, permission];

    setFormData({
      ...formData,
      roles: { ...formData.roles, permissions: updatedPermissions }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'add' ? 'Add New Teacher' : 'Edit Teacher'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'contact', label: 'Contact Info', icon: Home },
              { id: 'professional', label: 'Professional', icon: Briefcase },
              { id: 'roles', label: 'Roles & Permissions', icon: Shield }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'personal' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.firstName}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, firstName: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.personalInfo.lastName}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, lastName: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.personalInfo.email}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, email: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.personalInfo.phone}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, phone: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.personalInfo.gender}
                    onChange={(e) => setFormData({
                      ...formData,
                      personalInfo: { ...formData.personalInfo, gender: e.target.value as 'male' | 'female' | 'other' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo.address.street}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            address: { ...formData.contactInfo.address, street: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo.address.city}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            address: { ...formData.contactInfo.address, city: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo.address.state}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            address: { ...formData.contactInfo.address, state: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo.address.zipCode}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            address: { ...formData.contactInfo.address, zipCode: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo.address.country}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            address: { ...formData.contactInfo.address, country: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo.emergencyContact.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            emergencyContact: { ...formData.contactInfo.emergencyContact, name: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo.emergencyContact.relationship}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            emergencyContact: { ...formData.contactInfo.emergencyContact, relationship: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.contactInfo.emergencyContact.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            emergencyContact: { ...formData.contactInfo.emergencyContact, phone: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.contactInfo.emergencyContact.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            emergencyContact: { ...formData.contactInfo.emergencyContact, email: e.target.value }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'professional' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.professionalInfo.employeeId}
                    onChange={(e) => setFormData({
                      ...formData,
                      professionalInfo: { ...formData.professionalInfo, employeeId: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    required
                    value={formData.professionalInfo.department}
                    onChange={(e) => setFormData({
                      ...formData,
                      professionalInfo: { ...formData.professionalInfo, department: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={formData.professionalInfo.position}
                    onChange={(e) => setFormData({
                      ...formData,
                      professionalInfo: { ...formData.professionalInfo, position: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Joining
                  </label>
                  <input
                    type="date"
                    value={formData.professionalInfo.dateOfJoining}
                    onChange={(e) => setFormData({
                      ...formData,
                      professionalInfo: { ...formData.professionalInfo, dateOfJoining: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={formData.professionalInfo.qualification}
                    onChange={(e) => setFormData({
                      ...formData,
                      professionalInfo: { ...formData.professionalInfo, qualification: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.professionalInfo.experience}
                    onChange={(e) => setFormData({
                      ...formData,
                      professionalInfo: { ...formData.professionalInfo, experience: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.professionalInfo.salary}
                    onChange={(e) => setFormData({
                      ...formData,
                      professionalInfo: { ...formData.professionalInfo, salary: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {activeTab === 'roles' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Subject Assignments</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {SUBJECTS.map(subject => (
                      <label key={subject} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.roles.subjects.includes(subject)}
                          onChange={() => handleSubjectToggle(subject)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Administrative Roles</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {ADMIN_ROLES.map(role => (
                      <label key={role} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.roles.administrativeRoles.includes(role)}
                          onChange={() => handleRoleToggle(role)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {PERMISSIONS.map(permission => (
                      <label key={permission} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.roles.permissions.includes(permission)}
                          onChange={() => handlePermissionToggle(permission)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.roles.isActive}
                      onChange={(e) => setFormData({
                        ...formData,
                        roles: { ...formData.roles, isActive: e.target.checked }
                      })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Active Teacher</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              {mode === 'add' ? 'Add Teacher' : 'Update Teacher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Teacher View Modal Component
const TeacherViewModal: React.FC<{
  teacher: Teacher;
  onClose: () => void;
}> = ({ teacher, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Teacher Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-sm text-gray-900">
                  {teacher.personalInfo.firstName} {teacher.personalInfo.lastName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-sm text-gray-900">{teacher.personalInfo.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone</label>
                <p className="text-sm text-gray-900">{teacher.personalInfo.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                <p className="text-sm text-gray-900">
                  {new Date(teacher.personalInfo.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <p className="text-sm text-gray-900 capitalize">{teacher.personalInfo.gender}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Contact Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                <p className="text-sm text-gray-700">
                  {teacher.contactInfo.address.street}<br />
                  {teacher.contactInfo.address.city}, {teacher.contactInfo.address.state} {teacher.contactInfo.address.zipCode}<br />
                  {teacher.contactInfo.address.country}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="text-sm text-gray-900">{teacher.contactInfo.emergencyContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Relationship</label>
                    <p className="text-sm text-gray-900">{teacher.contactInfo.emergencyContact.relationship}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-sm text-gray-900">{teacher.contactInfo.emergencyContact.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <p className="text-sm text-gray-900">{teacher.contactInfo.emergencyContact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Professional Information
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Employee ID</label>
                <p className="text-sm text-gray-900">{teacher.professionalInfo.employeeId}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Department</label>
                <p className="text-sm text-gray-900">{teacher.professionalInfo.department}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Position</label>
                <p className="text-sm text-gray-900">{teacher.professionalInfo.position}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Date of Joining</label>
                <p className="text-sm text-gray-900">
                  {new Date(teacher.professionalInfo.dateOfJoining).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Qualification</label>
                <p className="text-sm text-gray-900">{teacher.professionalInfo.qualification}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Experience</label>
                <p className="text-sm text-gray-900">{teacher.professionalInfo.experience} years</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Salary</label>
                <p className="text-sm text-gray-900">${teacher.professionalInfo.salary.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Roles and Permissions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Roles & Permissions
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Status</label>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${teacher.roles.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}
                >
                  {teacher.roles.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Subjects</label>
                <div className="flex flex-wrap gap-2">
                  {teacher.roles.subjects.map(subject => (
                    <span
                      key={subject}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {teacher.roles.administrativeRoles.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Administrative Roles</label>
                  <div className="flex flex-wrap gap-2">
                    {teacher.roles.administrativeRoles.map(role => (
                      <span
                        key={role}
                        className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-md"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Permissions</label>
                <div className="flex flex-wrap gap-2">
                  {teacher.roles.permissions.map(permission => (
                    <span
                      key={permission}
                      className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-md"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherManagement;