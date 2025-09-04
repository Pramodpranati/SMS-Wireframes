import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  FileText,
  GraduationCap,
  Search,
  UserCheck,
  Fuel,
  Users
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

interface Student {
  id: string;
  name: string;
  class: string;
  rollNumber: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  admissionDate: string;
}

interface Marksheet {
  id: string;
  studentName: string;
  class: string;
  rollNumber: string;
  subject: string;
  marks: number;
  grade: string;
  examType: string;
  examDate: string;
}

interface Staff {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  experience: number;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

interface Application {
  id: string;
  studentName: string;
  parentName: string;
  class: string;
  applicationDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  email: string;
  phone: string;
}

const sampleStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    class: '10th Grade',
    rollNumber: 'ST001',
    email: 'john.doe@email.com',
    phone: '+1-234-567-8901',
    status: 'Active',
    admissionDate: '2023-08-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    class: '11th Grade',
    rollNumber: 'ST002',
    email: 'jane.smith@email.com',
    phone: '+1-234-567-8902',
    status: 'Active',
    admissionDate: '2022-08-20'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    class: '9th Grade',
    rollNumber: 'ST003',
    email: 'mike.johnson@email.com',
    phone: '+1-234-567-8903',
    status: 'Inactive',
    admissionDate: '2024-01-10'
  }
];

const sampleMarksheets: Marksheet[] = [
  {
    id: '1',
    studentName: 'John Doe',
    class: '10th Grade',
    rollNumber: 'ST001',
    subject: 'Mathematics',
    marks: 95,
    grade: 'A+',
    examType: 'Final Exam',
    examDate: '2024-03-15'
  },
  {
    id: '2',
    studentName: 'Jane Smith',
    class: '11th Grade',
    rollNumber: 'ST002',
    subject: 'Physics',
    marks: 88,
    grade: 'A',
    examType: 'Mid-term',
    examDate: '2024-02-20'
  },
  {
    id: '3',
    studentName: 'Mike Johnson',
    class: '9th Grade',
    rollNumber: 'ST003',
    subject: 'English',
    marks: 92,
    grade: 'A+',
    examType: 'Final Exam',
    examDate: '2024-03-10'
  }
];

const sampleStaff: Staff[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    department: 'Mathematics',
    position: 'Senior Teacher',
    email: 'sarah.wilson@school.edu',
    phone: '+1-234-567-9001',
    experience: 12,
    joinDate: '2015-08-01',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Prof. David Brown',
    department: 'Physics',
    position: 'Department Head',
    email: 'david.brown@school.edu',
    phone: '+1-234-567-9002',
    experience: 18,
    joinDate: '2010-07-15',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    department: 'English',
    position: 'Teacher',
    email: 'emily.davis@school.edu',
    phone: '+1-234-567-9003',
    experience: 8,
    joinDate: '2018-09-01',
    status: 'On Leave'
  }
];

const sampleApplications: Application[] = [
  {
    id: '1',
    studentName: 'Alex Rodriguez',
    parentName: 'Maria Rodriguez',
    class: '6th Grade',
    applicationDate: '2024-01-15',
    status: 'Under Review',
    email: 'maria.rodriguez@email.com',
    phone: '+1-234-567-7001'
  },
  {
    id: '2',
    studentName: 'Emma Thompson',
    parentName: 'Robert Thompson',
    class: '7th Grade',
    applicationDate: '2024-01-20',
    status: 'Approved',
    email: 'robert.thompson@email.com',
    phone: '+1-234-567-7002'
  },
  {
    id: '3',
    studentName: 'Liam Chen',
    parentName: 'Wei Chen',
    class: '8th Grade',
    applicationDate: '2024-01-25',
    status: 'Pending',
    email: 'wei.chen@email.com',
    phone: '+1-234-567-7003'
  }
];

type TabType = 'students' | 'marksheets' | 'staff' | 'applications';

const StudentLists: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tabs = [
    { id: 'students' as TabType, label: 'Students', icon: Users, count: sampleStudents.length },
    { id: 'marksheets' as TabType, label: 'Marksheets', icon: FileText, count: sampleMarksheets.length },
    { id: 'staff' as TabType, label: 'Staff', icon: UserCheck, count: sampleStaff.length },
    { id: 'applications' as TabType, label: 'Applications', icon: GraduationCap, count: sampleApplications.length }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'On Leave': 'bg-yellow-100 text-yellow-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Under Review': 'bg-blue-100 text-blue-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getGradeColor = (grade: string) => {
    const colors = {
      'A+': 'bg-green-100 text-green-800',
      'A': 'bg-blue-100 text-blue-800',
      'B+': 'bg-indigo-100 text-indigo-800',
      'B': 'bg-purple-100 text-purple-800',
      'C+': 'bg-orange-100 text-orange-800',
      'C': 'bg-red-100 text-red-800'
    };
    return colors[grade as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const [filters, setFilters] = React.useState({
    name: '',
    rollNumber: '',
    class: '',
    status: '',
    admissionDateStart: '',
    admissionDateEnd: '',
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredData = useMemo(() => {
    let data: any[] = [];

    switch (activeTab) {
      case 'students':
        data = sampleStudents;
        break;
      case 'marksheets':
        data = sampleMarksheets;
        break;
      case 'staff':
        data = sampleStaff;
        break;
      case 'applications':
        data = sampleApplications;
        break;
    }

    // Apply search filter
    if (searchTerm) {
      data = data.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      data = data.filter(item => item.status === statusFilter);
    }

    // Apply class filter
    if (classFilter !== 'All') {
      data = data.filter(item => item.class === classFilter);
    }

    // Apply sorting
    if (sortField) {
      data = [...data].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return sortDirection === 'asc'
          ? aValue - bValue
          : bValue - aValue;
      });
    }

    return data;
  }, [activeTab, searchTerm, statusFilter, classFilter, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const handleDownload = (format: 'csv' | 'pdf' | 'excel') => {
    // Implementation for download functionality
    const fileName = `${activeTab}_data.${format}`;
    console.log(`Downloading ${fileName}...`);
    // In a real app, you would implement the actual download logic here
  };

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ?
      <ChevronUp className="w-4 h-4" /> :
      <ChevronDown className="w-4 h-4" />;
  };
  const [open, setOpen] = useState({
    name: "",
    val: false
  });
  const renderStudentsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {/* Column Headers */}
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            // onClick={() => handleSort('name')}
            >
              <div className="flex items-center space-x-1">
                <span>Name</span>
                <div className="bg-gray-100">
                  <div className="relative">
                    <button
                      onClick={() => setOpen((prev) => ({
                        name: "name",
                        val: prev.name === "name" ? !prev.val : true
                      }))}
                      className="p-1.5 ms-1.5 bg-gray-200 text-gray-600 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-funnel-icon lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" /></svg>
                    </button>

                    {open.name === "name" && open.val && (
                      <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <div className="p-4">

                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            // onClick={() => handleSort('rollNumber')}
            >
              <div className="flex items-center space-x-1">
                <span>Roll Number</span>
                <div className="bg-gray-100">
                  <div className="relative">
                    <button
                      onClick={() => setOpen((prev) => ({
                        name: "rollNumber",
                        val: prev.name === "rollNumber" ? !prev.val : true
                      }))}
                      className="p-1.5 ms-1.5 bg-gray-200 text-gray-600 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-funnel-icon lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" /></svg>
                    </button>

                    {open.name === "rollNumber" && open.val && (
                      <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800">Dropdown Card</h3>
                          <p className="text-sm text-gray-600">
                            This is a dropdown card content. You can place buttons, links, or other components here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            // onClick={() => handleSort('class')}
            >
              <div className="flex items-center space-x-1">
                <span>Class</span>
                <div className="bg-gray-100">
                  <div className="relative">
                    <button
                      onClick={() => setOpen((prev) => ({
                        name: "Class",
                        val: prev.name === "Class" ? !prev.val : true
                      }))}
                      className="p-1.5 ms-1.5 bg-gray-200 text-gray-600 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-funnel-icon lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" /></svg>
                    </button>

                    {open.name === "Class" && open.val && (
                      <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800">Dropdown Card</h3>
                          <p className="text-sm text-gray-600">
                            This is a dropdown card content. You can place buttons, links, or other components here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            // onClick={() => handleSort('status')}
            >
              <div className="flex items-center space-x-1">
                <span>Contact</span>
                <div className="bg-gray-100">
                  <div className="relative">
                    <button
                      onClick={() => setOpen((prev) => ({
                        name: "Contact",
                        val: prev.name === "Contact" ? !prev.val : true
                      }))}
                      className="p-1.5 ms-1.5 bg-gray-200 text-gray-600 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-funnel-icon lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" /></svg>
                    </button>

                    {open.name === "Contact" && open.val && (
                      <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800">Dropdown Card</h3>
                          <p className="text-sm text-gray-600">
                            This is a dropdown card content. You can place buttons, links, or other components here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            // onClick={() => handleSort('status')}
            >
              <div className="flex items-center space-x-1">
                <span>Status</span>
                <div className="bg-gray-100">
                  <div className="relative">
                    <button
                      onClick={() => setOpen((prev) => ({
                        name: "status",
                        val: prev.name === "status" ? !prev.val : true
                      }))}
                      className="p-1.5 ms-1.5 bg-gray-200 text-gray-600 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-funnel-icon lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" /></svg>
                    </button>

                    {open.name === "status" && open.val && (
                      <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800">Dropdown Card</h3>
                          <p className="text-sm text-gray-600">
                            This is a dropdown card content. You can place buttons, links, or other components here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
            // onClick={() => handleSort('admissionDate')}
            >
              <div className="flex items-center space-x-1">
                <span>Admission Date</span>
                <div className="bg-gray-100">
                  <div className="relative">
                    <button
                      onClick={() => setOpen((prev) => ({
                        name: "admissionDate",
                        val: prev.name === "admissionDate" ? !prev.val : true
                      }))}
                      className="p-1.5 ms-1.5 bg-gray-200 text-gray-600 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-funnel-icon lucide-funnel"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z" /></svg>
                    </button>

                    {open.name === "admissionDate" && open.val && (
                      <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-10">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-800">Dropdown Card</h3>
                          <p className="text-sm text-gray-600">
                            This is a dropdown card content. You can place buttons, links, or other components here.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </th>
          </tr>

          {/* Filter inputs below headers */}
          {/* <tr className="bg-gray-100">
            <th className="px-6 py-2">
              <input
                type="text"
                placeholder="Filter name"
                value={filters.name || ''}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              />
            </th>

            <th className="px-6 py-2">
              <input
                type="text"
                placeholder="Filter roll number"
                value={filters.rollNumber || ''}
                onChange={(e) => handleFilterChange('rollNumber', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              />
            </th>

            <th className="px-6 py-2">
              <input
                type="text"
                placeholder="Filter class"
                value={filters.class || ''}
                onChange={(e) => handleFilterChange('class', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              />
            </th>

            <th></th>

            <th className="px-6 py-2">
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </th>

            <th className="px-6 py-2 space-y-1">
              <input
                type="date"
                value={filters.admissionDateStart || ''}
                onChange={(e) => handleFilterChange('admissionDateStart', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                placeholder="Start date"
              />
              <input
                type="date"
                value={filters.admissionDateEnd || ''}
                onChange={(e) => handleFilterChange('admissionDateEnd', e.target.value)}
                className="w-full text-sm border border-gray-300 rounded px-2 py-1"
                placeholder="End date"
              />
            </th>
          </tr> */}
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((student: Student) => (
            <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{student.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.rollNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.class}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.email}</div>
                <div className="text-sm text-gray-500">{student.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(student.admissionDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );

  const renderMarksheetsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('studentName')}
            >
              <div className="flex items-center space-x-1">
                <span>Student</span>
                {renderSortIcon('studentName')}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class & Roll
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('subject')}
            >
              <div className="flex items-center space-x-1">
                <span>Subject</span>
                {renderSortIcon('subject')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('marks')}
            >
              <div className="flex items-center space-x-1">
                <span>Marks</span>
                {renderSortIcon('marks')}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grade
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('examType')}
            >
              <div className="flex items-center space-x-1">
                <span>Exam Type</span>
                {renderSortIcon('examType')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('examDate')}
            >
              <div className="flex items-center space-x-1">
                <span>Exam Date</span>
                {renderSortIcon('examDate')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((marksheet: Marksheet) => (
            <tr key={marksheet.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{marksheet.studentName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{marksheet.class}</div>
                <div className="text-sm text-gray-500">{marksheet.rollNumber}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{marksheet.subject}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{marksheet.marks}/100</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(marksheet.grade)}`}>
                  {marksheet.grade}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{marksheet.examType}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(marksheet.examDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderStaffTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center space-x-1">
                <span>Name</span>
                {renderSortIcon('name')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('department')}
            >
              <div className="flex items-center space-x-1">
                <span>Department</span>
                {renderSortIcon('department')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('position')}
            >
              <div className="flex items-center space-x-1">
                <span>Position</span>
                {renderSortIcon('position')}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('experience')}
            >
              <div className="flex items-center space-x-1">
                <span>Experience</span>
                {renderSortIcon('experience')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center space-x-1">
                <span>Status</span>
                {renderSortIcon('status')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('joinDate')}
            >
              <div className="flex items-center space-x-1">
                <span>Join Date</span>
                {renderSortIcon('joinDate')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((staff: Staff) => (
            <tr key={staff.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{staff.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{staff.department}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{staff.position}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{staff.email}</div>
                <div className="text-sm text-gray-500">{staff.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{staff.experience} years</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(staff.status)}`}>
                  {staff.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(staff.joinDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderApplicationsTable = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('studentName')}
            >
              <div className="flex items-center space-x-1">
                <span>Student Name</span>
                {renderSortIcon('studentName')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('parentName')}
            >
              <div className="flex items-center space-x-1">
                <span>Parent Name</span>
                {renderSortIcon('parentName')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('class')}
            >
              <div className="flex items-center space-x-1">
                <span>Applied Class</span>
                {renderSortIcon('class')}
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('applicationDate')}
            >
              <div className="flex items-center space-x-1">
                <span>Application Date</span>
                {renderSortIcon('applicationDate')}
              </div>
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center space-x-1">
                <span>Status</span>
                {renderSortIcon('status')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.map((application: Application) => (
            <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{application.studentName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{application.parentName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{application.class}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{application.email}</div>
                <div className="text-sm text-gray-500">{application.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(application.applicationDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                  {application.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">School Management Lists</h1>
          <p className="mt-2 text-gray-600">Comprehensive view of students, marksheets, staff, and applications</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentPage(1);
                      setSearchTerm('');
                      setStatusFilter('All');
                      setClassFilter('All');
                      setSortField('');
                    }}
                    className={`group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <Icon className={`-ml-0.5 mr-2 h-5 w-5 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`} />
                    {tab.label}
                    <span className={`ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium ${activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-900'
                      }`}>
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Class Filter */}
            {(activeTab === 'students' || activeTab === 'marksheets' || activeTab === 'applications') && (
              <div className="sm:w-48">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="All">All Classes</option>
                  <option value="6th Grade">6th Grade</option>
                  <option value="7th Grade">7th Grade</option>
                  <option value="8th Grade">8th Grade</option>
                  <option value="9th Grade">9th Grade</option>
                  <option value="10th Grade">10th Grade</option>
                  <option value="11th Grade">11th Grade</option>
                  <option value="12th Grade">12th Grade</option>
                </select>
              </div>
            )}

            {/* Download Options */}
            <div className="flex space-x-2">
              <button
                onClick={() => handleDownload('csv')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </button>
              <button
                onClick={() => handleDownload('excel')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Excel
              </button>
              <button
                onClick={() => handleDownload('pdf')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-gray-700">
            Showing {paginatedData.length} of {filteredData.length} {activeTab}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {paginatedData.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-2">No {activeTab} found</div>
              <div className="text-sm text-gray-400">Try adjusting your search or filter criteria</div>
            </div>
          ) : (
            <>
              {activeTab === 'students' && renderStudentsTable()}
              {activeTab === 'marksheets' && renderMarksheetsTable()}
              {activeTab === 'staff' && renderStaffTable()}
              {activeTab === 'applications' && renderApplicationsTable()}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + Math.max(1, currentPage - 2);
                if (page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentLists;