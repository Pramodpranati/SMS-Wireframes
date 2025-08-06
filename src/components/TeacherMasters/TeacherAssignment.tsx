import React, { useState, useEffect } from 'react';
import {
    Users,
    BookOpen,
    GraduationCap,
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Save,
    X,
    UserCheck,
    Calendar,
    Clock,
    MapPin,
    ChevronDown,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    Edit
} from 'lucide-react';

interface Teacher {
    id: string;
    name: string;
    email: string;
    employeeId: string;
    department: string;
    subjects: string[];
    status: 'active' | 'inactive';
    avatar?: string;
}

interface Subject {
    id: string;
    name: string;
    code: string;
    department: string;
    credits: number;
}

interface Grade {
    id: string;
    name: string;
    level: number;
    sections: string[];
}

interface Assignment {
    id: string;
    teacherId: string;
    teacherName: string;
    gradeId: string;
    gradeName: string;
    section: string;
    subjectId: string;
    subjectName: string;
    subjectCode: string;
    schedule: {
        day: string;
        startTime: string;
        endTime: string;
        room: string;
    }[];
    academicYear: string;
    semester: string;
    status: 'active' | 'pending' | 'completed';
    assignedDate: string;
}

const TeacherAssignment: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [grades, setGrades] = useState<Grade[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGrade, setSelectedGrade] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [expandedGrades, setExpandedGrades] = useState<Set<string>>(new Set());

    // Sample data initialization
    useEffect(() => {
        // Initialize sample teachers
        const sampleTeachers: Teacher[] = [
            {
                id: '1',
                name: 'Dr. Sarah Johnson',
                email: 'sarah.johnson@school.edu',
                employeeId: 'EMP001',
                department: 'Mathematics',
                subjects: ['Algebra', 'Calculus', 'Statistics'],
                status: 'active'
            },
            {
                id: '2',
                name: 'Prof. Michael Chen',
                email: 'michael.chen@school.edu',
                employeeId: 'EMP002',
                department: 'Science',
                subjects: ['Physics', 'Chemistry'],
                status: 'active'
            },
            {
                id: '3',
                name: 'Ms. Emily Rodriguez',
                email: 'emily.rodriguez@school.edu',
                employeeId: 'EMP003',
                department: 'English',
                subjects: ['Literature', 'Writing', 'Grammar'],
                status: 'active'
            },
            {
                id: '4',
                name: 'Mr. David Wilson',
                email: 'david.wilson@school.edu',
                employeeId: 'EMP004',
                department: 'History',
                subjects: ['World History', 'Geography'],
                status: 'active'
            }
        ];

        // Initialize sample subjects
        const sampleSubjects: Subject[] = [
            { id: '1', name: 'Algebra', code: 'MATH101', department: 'Mathematics', credits: 3 },
            { id: '2', name: 'Calculus', code: 'MATH201', department: 'Mathematics', credits: 4 },
            { id: '3', name: 'Physics', code: 'SCI101', department: 'Science', credits: 4 },
            { id: '4', name: 'Chemistry', code: 'SCI102', department: 'Science', credits: 4 },
            { id: '5', name: 'Literature', code: 'ENG101', department: 'English', credits: 3 },
            { id: '6', name: 'World History', code: 'HIST101', department: 'History', credits: 3 },
            { id: '7', name: 'Geography', code: 'HIST102', department: 'History', credits: 2 }
        ];

        // Initialize sample grades
        const sampleGrades: Grade[] = [
            { id: '1', name: 'Grade 9', level: 9, sections: ['A', 'B', 'C'] },
            { id: '2', name: 'Grade 10', level: 10, sections: ['A', 'B', 'C', 'D'] },
            { id: '3', name: 'Grade 11', level: 11, sections: ['A', 'B'] },
            { id: '4', name: 'Grade 12', level: 12, sections: ['A', 'B'] }
        ];

        // Initialize sample assignments
        const sampleAssignments: Assignment[] = [
            {
                id: '1',
                teacherId: '1',
                teacherName: 'Dr. Sarah Johnson',
                gradeId: '1',
                gradeName: 'Grade 9',
                section: 'A',
                subjectId: '1',
                subjectName: 'Algebra',
                subjectCode: 'MATH101',
                schedule: [
                    { day: 'Monday', startTime: '09:00', endTime: '10:00', room: 'Room 101' },
                    { day: 'Wednesday', startTime: '10:00', endTime: '11:00', room: 'Room 101' },
                    { day: 'Friday', startTime: '09:00', endTime: '10:00', room: 'Room 101' }
                ],
                academicYear: '2024-2025',
                semester: 'Fall',
                status: 'active',
                assignedDate: '2024-01-15'
            },
            {
                id: '2',
                teacherId: '2',
                teacherName: 'Prof. Michael Chen',
                gradeId: '2',
                gradeName: 'Grade 10',
                section: 'B',
                subjectId: '3',
                subjectName: 'Physics',
                subjectCode: 'SCI101',
                schedule: [
                    { day: 'Tuesday', startTime: '11:00', endTime: '12:00', room: 'Lab 201' },
                    { day: 'Thursday', startTime: '11:00', endTime: '12:00', room: 'Lab 201' }
                ],
                academicYear: '2024-2025',
                semester: 'Fall',
                status: 'active',
                assignedDate: '2024-01-16'
            },
            {
                id: '3',
                teacherId: '3',
                teacherName: 'Ms. Emily Rodriguez',
                gradeId: '3',
                gradeName: 'Grade 11',
                section: 'A',
                subjectId: '5',
                subjectName: 'Literature',
                subjectCode: 'ENG101',
                schedule: [
                    { day: 'Monday', startTime: '14:00', endTime: '15:00', room: 'Room 301' },
                    { day: 'Wednesday', startTime: '14:00', endTime: '15:00', room: 'Room 301' }
                ],
                academicYear: '2024-2025',
                semester: 'Fall',
                status: 'active',
                assignedDate: '2024-01-17'
            }
        ];

        setTeachers(sampleTeachers);
        setSubjects(sampleSubjects);
        setGrades(sampleGrades);
        setAssignments(sampleAssignments);
    }, []);

    // Filter assignments based on search and filters
    const filteredAssignments = assignments.filter(assignment => {
        const matchesSearch = assignment.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            assignment.gradeName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGrade = !selectedGrade || assignment.gradeId === selectedGrade;
        const matchesSubject = !selectedSubject || assignment.subjectId === selectedSubject;
        const matchesTeacher = !selectedTeacher || assignment.teacherId === selectedTeacher;

        return matchesSearch && matchesGrade && matchesSubject && matchesTeacher;
    });

    // Group assignments by grade for hierarchical view
    const groupedAssignments = filteredAssignments.reduce((acc, assignment) => {
        if (!acc[assignment.gradeId]) {
            acc[assignment.gradeId] = {
                grade: grades.find(g => g.id === assignment.gradeId)!,
                assignments: []
            };
        }
        acc[assignment.gradeId].assignments.push(assignment);
        return acc;
    }, {} as Record<string, { grade: Grade; assignments: Assignment[] }>);

    const handleCreateAssignment = () => {
        setEditingAssignment(null);
        setShowAssignModal(true);
    };

    const handleEditAssignment = (assignment: Assignment) => {
        setEditingAssignment(assignment);
        setShowAssignModal(true);
    };

    const handleDeleteAssignment = (assignmentId: string) => {
        if (window.confirm('Are you sure you want to delete this assignment?')) {
            setAssignments(prev => prev.filter(a => a.id !== assignmentId));
        }
    };

    const handleSaveAssignment = (assignmentData: Partial<Assignment>) => {
        if (editingAssignment) {
            // Update existing assignment
            setAssignments(prev => prev.map(a =>
                a.id === editingAssignment.id
                    ? { ...a, ...assignmentData }
                    : a
            ));
        } else {
            // Create new assignment
            const newAssignment: Assignment = {
                // id: Date.now().toString(),
                ...assignmentData as Assignment,
                assignedDate: new Date().toISOString().split('T')[0],
                status: 'active'
            };
            setAssignments(prev => [...prev, newAssignment]);
        }
        setShowAssignModal(false);
    };

    const toggleGradeExpansion = (gradeId: string) => {
        setExpandedGrades(prev => {
            const newSet = new Set(prev);
            if (newSet.has(gradeId)) {
                newSet.delete(gradeId);
            } else {
                newSet.add(gradeId);
            }
            return newSet;
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <UserCheck className="w-8 h-8 text-blue-600" />
                                Teacher Assignments
                            </h1>
                            <p className="text-gray-600 mt-2">Manage teacher assignments for grades and subjects</p>
                        </div>
                        <button
                            onClick={handleCreateAssignment}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            New Assignment
                        </button>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search assignments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Grade Filter */}
                        <select
                            value={selectedGrade}
                            onChange={(e) => setSelectedGrade(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Grades</option>
                            {grades.map(grade => (
                                <option key={grade.id} value={grade.id}>{grade.name}</option>
                            ))}
                        </select>

                        {/* Subject Filter */}
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Subjects</option>
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            ))}
                        </select>

                        {/* Teacher Filter */}
                        <select
                            value={selectedTeacher}
                            onChange={(e) => setSelectedTeacher(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">All Teachers</option>
                            {teachers.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                            ))}
                        </select>

                        {/* View Mode Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${viewMode === 'table'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Table
                            </button>
                        </div>
                    </div>
                </div>

                {/* Assignments Display */}
                {viewMode === 'grid' ? (
                    /* Hierarchical Grid View */
                    <div className="space-y-6">
                        {Object.entries(groupedAssignments).map(([gradeId, { grade, assignments }]) => (
                            <div key={gradeId} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div
                                    className="bg-gray-50 px-6 py-4 border-b cursor-pointer hover:bg-gray-100 transition-colors"
                                    onClick={() => toggleGradeExpansion(gradeId)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {expandedGrades.has(gradeId) ? (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-gray-500" />
                                            )}
                                            <GraduationCap className="w-6 h-6 text-blue-600" />
                                            <h3 className="text-lg font-semibold text-gray-900">{grade.name}</h3>
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                                                {assignments.length} assignments
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {expandedGrades.has(gradeId) && (
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {assignments.map(assignment => (
                                                <div key={assignment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <BookOpen className="w-5 h-5 text-blue-600" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900">{assignment.subjectName}</h4>
                                                                <p className="text-sm text-gray-600">{assignment.subjectCode}</p>
                                                            </div>
                                                        </div>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                                            {assignment.status}
                                                        </span>
                                                    </div>

                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Users className="w-4 h-4" />
                                                            <span>{assignment.teacherName}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <GraduationCap className="w-4 h-4" />
                                                            <span>{assignment.gradeName} - Section {assignment.section}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{assignment.academicYear} ({assignment.semester})</span>
                                                        </div>
                                                    </div>

                                                    {assignment.schedule.length > 0 && (
                                                        <div className="mb-4">
                                                            <h5 className="text-sm font-medium text-gray-700 mb-2">Schedule:</h5>
                                                            <div className="space-y-1">
                                                                {assignment.schedule.slice(0, 2).map((schedule, index) => (
                                                                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                                                                        <Clock className="w-3 h-3" />
                                                                        <span>{schedule.day}: {schedule.startTime}-{schedule.endTime}</span>
                                                                        <MapPin className="w-3 h-3 ml-2" />
                                                                        <span>{schedule.room}</span>
                                                                    </div>
                                                                ))}
                                                                {assignment.schedule.length > 2 && (
                                                                    <p className="text-xs text-gray-500">+{assignment.schedule.length - 2} more sessions</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleEditAssignment(assignment)}
                                                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAssignment(assignment.id)}
                                                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Table View */
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teacher</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade & Section</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredAssignments.map(assignment => (
                                        <tr key={assignment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                        <Users className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{assignment.teacherName}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{assignment.subjectName}</div>
                                                <div className="text-sm text-gray-500">{assignment.subjectCode}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{assignment.gradeName}</div>
                                                <div className="text-sm text-gray-500">Section {assignment.section}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {assignment.schedule.length} sessions/week
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                                                    {assignment.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditAssignment(assignment)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAssignment(assignment.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Assignment Modal */}
                {showAssignModal && (
                    <AssignmentModal
                        assignment={editingAssignment}
                        teachers={teachers}
                        subjects={subjects}
                        grades={grades}
                        onSave={handleSaveAssignment}
                        onClose={() => setShowAssignModal(false)}
                    />
                )}
            </div>
        </div>
    );
};

// Assignment Modal Component
interface AssignmentModalProps {
    assignment: Assignment | null;
    teachers: Teacher[];
    subjects: Subject[];
    grades: Grade[];
    onSave: (assignment: Partial<Assignment>) => void;
    onClose: () => void;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({
    assignment,
    teachers,
    subjects,
    grades,
    onSave,
    onClose
}) => {
    const [formData, setFormData] = useState({
        teacherId: assignment?.teacherId || '',
        gradeId: assignment?.gradeId || '',
        section: assignment?.section || '',
        subjectId: assignment?.subjectId || '',
        academicYear: assignment?.academicYear || '2024-2025',
        semester: assignment?.semester || 'Fall',
        schedule: assignment?.schedule || [{ day: '', startTime: '', endTime: '', room: '' }]
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleScheduleChange = (index: number, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            schedule: prev.schedule.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addScheduleSlot = () => {
        setFormData(prev => ({
            ...prev,
            schedule: [...prev.schedule, { day: '', startTime: '', endTime: '', room: '' }]
        }));
    };

    const removeScheduleSlot = (index: number) => {
        setFormData(prev => ({
            ...prev,
            schedule: prev.schedule.filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.teacherId) newErrors.teacherId = 'Teacher is required';
        if (!formData.gradeId) newErrors.gradeId = 'Grade is required';
        if (!formData.section) newErrors.section = 'Section is required';
        if (!formData.subjectId) newErrors.subjectId = 'Subject is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        const teacher = teachers.find(t => t.id === formData.teacherId);
        const grade = grades.find(g => g.id === formData.gradeId);
        const subject = subjects.find(s => s.id === formData.subjectId);

        const assignmentData: Partial<Assignment> = {
            ...formData,
            teacherName: teacher?.name || '',
            gradeName: grade?.name || '',
            subjectName: subject?.name || '',
            subjectCode: subject?.code || ''
        };

        onSave(assignmentData);
    };

    const selectedGrade = grades.find(g => g.id === formData.gradeId);

    const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const TIME_SLOTS = [
        { id: '1', startTime: '08:00', endTime: '08:45', type: 'period', periodNumber: 1 },
        { id: '2', startTime: '08:45', endTime: '09:30', type: 'period', periodNumber: 2 },
        { id: '3', startTime: '09:30', endTime: '09:45', type: 'break', periodNumber: undefined },
        { id: '4', startTime: '09:45', endTime: '10:30', type: 'period', periodNumber: 3 },
        { id: '5', startTime: '10:30', endTime: '11:15', type: 'period', periodNumber: 4 },
        { id: '6', startTime: '11:15', endTime: '12:00', type: 'period', periodNumber: 5 },
        { id: '7', startTime: '12:00', endTime: '12:30', type: 'lunch', periodNumber: undefined },
        { id: '8', startTime: '12:30', endTime: '13:15', type: 'period', periodNumber: 6 },
        { id: '9', startTime: '13:15', endTime: '14:00', type: 'period', periodNumber: 7 },
    ];

    //   const canEdit = hasRole(['system_admin', 'management']);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {assignment ? 'Edit Assignment' : 'Create New Assignment'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Teacher Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Teacher *
                            </label>
                            <select
                                value={formData.teacherId}
                                onChange={(e) => handleInputChange('teacherId', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.teacherId ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select Teacher</option>
                                {teachers.map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name} - {teacher.employeeId}
                                    </option>
                                ))}
                            </select>
                            {errors.teacherId && (
                                <p className="mt-1 text-sm text-red-600">{errors.teacherId}</p>
                            )}
                        </div>

                        {/* Subject Selection */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject *
                            </label>
                            <select
                                value={formData.subjectId}
                                onChange={(e) => handleInputChange('subjectId', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.subjectId ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name} ({subject.code})
                                    </option>
                                ))}
                            </select>
                            {errors.subjectId && (
                                <p className="mt-1 text-sm text-red-600">{errors.subjectId}</p>
                            )}
                        </div> */}

                        {/* Grade Selection */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Grade *
                            </label>
                            <select
                                value={formData.gradeId}
                                onChange={(e) => handleInputChange('gradeId', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.gradeId ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            >
                                <option value="">Select Grade</option>
                                {grades.map(grade => (
                                    <option key={grade.id} value={grade.id}>
                                        {grade.name}
                                    </option>
                                ))}
                            </select>
                            {errors.gradeId && (
                                <p className="mt-1 text-sm text-red-600">{errors.gradeId}</p>
                            )}
                        </div> */}

                        {/* Section Selection */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Section *
                            </label>
                            <select
                                value={formData.section}
                                onChange={(e) => handleInputChange('section', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.section ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                disabled={!selectedGrade}
                            >
                                <option value="">Select Section</option>
                                {selectedGrade?.sections.map(section => (
                                    <option key={section} value={section}>
                                        Section {section}
                                    </option>
                                ))}
                            </select>
                            {errors.section && (
                                <p className="mt-1 text-sm text-red-600">{errors.section}</p>
                            )}
                        </div> */}

                        {/* Academic Year */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Academic Year
                            </label>
                            <input
                                type="text"
                                value={formData.academicYear}
                                onChange={(e) => handleInputChange('academicYear', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="2024-2025"
                            />
                        </div>

                        {/* Semester */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Semester
                            </label>
                            <select
                                value={formData.semester}
                                onChange={(e) => handleInputChange('semester', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Fall">Fall</option>
                                <option value="Spring">Spring</option>
                                <option value="Summer">Summer</option>
                            </select>
                        </div> */}
                    </div>

                    {/* Schedule Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Class Schedule</h3>
                            <button
                                type="button"
                                onClick={addScheduleSlot}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Time Slot
                            </button>
                        </div>

                        {/* <div className="space-y-4">
                            {formData.schedule.map((slot, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 rounded-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                                        <select
                                            value={slot.day}
                                            onChange={(e) => handleScheduleChange(index, 'day', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select Day</option>
                                            <option value="Monday">Monday</option>
                                            <option value="Tuesday">Tuesday</option>
                                            <option value="Wednesday">Wednesday</option>
                                            <option value="Thursday">Thursday</option>
                                            <option value="Friday">Friday</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                                        <input
                                            type="time"
                                            value={slot.startTime}
                                            onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                                        <input
                                            type="time"
                                            value={slot.endTime}
                                            onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                    {/* <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                                        <input
                                            type="text"
                                            value={slot.room}
                                            onChange={(e) => handleScheduleChange(index, 'room', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Room 101"
                                        />
                                    </div> 
                                    <div className="flex items-end">
                                        <button
                                            type="button"
                                            onClick={() => removeScheduleSlot(index)}
                                            className="w-full bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                            disabled={formData.schedule.length === 1}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div> */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Time
                                        </th>
                                        {DAYS.map(day => (
                                            <th key={day} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {TIME_SLOTS.map(timeSlot => (
                                        <tr key={timeSlot.id}>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {timeSlot.startTime} - {timeSlot.endTime}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {timeSlot.type === 'period' && `Period ${timeSlot.periodNumber}`}
                                                    {timeSlot.type === 'break' && 'Break'}
                                                    {timeSlot.type === 'lunch' && 'Lunch'}
                                                </div>
                                            </td>
                                            {DAYS.map((day, dayIndex) => {
                                                // const entry = getTimeTableForSection(selectedSection, dayIndex, timeSlot.id);

                                                if (timeSlot.type !== 'period') {
                                                    return (
                                                        <td key={day} className="px-4 py-3 text-center">
                                                            <div className="text-sm text-gray-500 bg-gray-100 rounded px-2 py-1">
                                                                {timeSlot.type === 'break' ? 'Break' : 'Lunch'}
                                                            </div>
                                                        </td>
                                                    );
                                                }

                                                return (
                                                    <td key={day} className="px-4 py-3 text-center">
                                                        {(
                                                            <div className="bg-blue-50 border border-blue-200 rounded px-2 py-1">
                                                                <div className="cursor-pointer text-sm font-medium text-blue-300 flex items-center justify-center">
                                                                    <Plus className='self-center'/>
                                                                </div>                                                                
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {assignment ? 'Update Assignment' : 'Create Assignment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherAssignment;