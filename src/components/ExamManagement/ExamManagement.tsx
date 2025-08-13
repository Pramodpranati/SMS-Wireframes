import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, Calendar, BookOpen, Users, Clock } from 'lucide-react';
import { ExamWithAssignments, Grade, Section } from '../../types/Exam';
import CreateExamModal from './CreateExamModal';
import ExamCard from './ExamCard';
import ExamAssignmentModal from './ExamAssignmentModal';
import ExamDashboard from './ExamDashboard';

// Mock data - in a real app, this would come from your backend
const mockGrades: Grade[] = [
  {
    id: '1',
    name: 'Grade 1',
    sections: [
      { id: '1-A', name: 'Section A', gradeId: '1', studentCount: 25 },
      { id: '1-B', name: 'Section B', gradeId: '1', studentCount: 28 },
    ]
  },
  {
    id: '2',
    name: 'Grade 2',
    sections: [
      { id: '2-A', name: 'Section A', gradeId: '2', studentCount: 30 },
      { id: '2-B', name: 'Section B', gradeId: '2', studentCount: 27 },
    ]
  },
  {
    id: '3',
    name: 'Grade 3',
    sections: [
      { id: '3-A', name: 'Section A', gradeId: '3', studentCount: 29 },
      { id: '3-B', name: 'Section B', gradeId: '3', studentCount: 26 },
      { id: '3-C', name: 'Section C', gradeId: '3', studentCount: 24 },
    ]
  },
];

const mockExams: ExamWithAssignments[] = [
  {
    id: '1',
    title: 'Mid-Term Mathematics Exam',
    subject: 'Mathematics',
    description: 'Mid-term examination covering chapters 1-5',
    date: '2025-02-15',
    startTime: '09:00',
    endTime: '11:00',
    duration: 120,
    totalMarks: 100,
    passingMarks: 40,
    instructions: 'Use only blue or black pen. Calculators are not allowed.',
    status: 'scheduled',
    createdBy: 'John Smith',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
    assignments: [
      {
        id: 'a1',
        examId: '1',
        assignmentType: 'grade',
        targetId: '1',
        targetName: 'Grade 1',
        assignedBy: 'John Smith',
        assignedAt: '2025-01-15T10:00:00Z'
      }
    ],
    assignedCount: 53
  },
  {
    id: '2',
    title: 'Science Quiz',
    subject: 'Science',
    description: 'General science knowledge quiz',
    date: '2025-02-10',
    startTime: '14:00',
    endTime: '15:00',
    duration: 60,
    totalMarks: 50,
    passingMarks: 25,
    status: 'scheduled',
    createdBy: 'Sarah Johnson',
    createdAt: '2025-01-10T14:00:00Z',
    updatedAt: '2025-01-10T14:00:00Z',
    assignments: [
      {
        id: 'a2',
        examId: '2',
        assignmentType: 'school',
        targetName: 'Entire School',
        assignedBy: 'Sarah Johnson',
        assignedAt: '2025-01-10T14:00:00Z'
      }
    ],
    assignedCount: 180
  },
  {
    id: '3',
    title: 'English Literature Test',
    subject: 'English',
    description: 'Test on poetry and prose from the syllabus',
    date: '2025-02-08',
    startTime: '10:30',
    endTime: '12:00',
    duration: 90,
    totalMarks: 75,
    passingMarks: 30,
    status: 'completed',
    createdBy: 'Michael Brown',
    createdAt: '2025-01-05T09:00:00Z',
    updatedAt: '2025-02-08T12:30:00Z',
    assignments: [
      {
        id: 'a3',
        examId: '3',
        assignmentType: 'section',
        targetId: '2-A',
        targetName: 'Grade 2 - Section A',
        assignedBy: 'Michael Brown',
        assignedAt: '2025-01-05T09:00:00Z'
      }
    ],
    assignedCount: 30
  }
];

const ExamManagement: React.FC = () => {
  const [exams, setExams] = useState<ExamWithAssignments[]>(mockExams);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<ExamWithAssignments | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [currentView, setCurrentView] = useState<'dashboard' | 'list'>('dashboard');

  // Get unique subjects for filter
  const subjects = useMemo(() => {
    const uniqueSubjects = Array.from(new Set(exams.map(exam => exam.subject)));
    return uniqueSubjects.sort();
  }, [exams]);

  // Filter exams based on search and filters
  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           exam.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
      const matchesSubject = subjectFilter === 'all' || exam.subject === subjectFilter;
      
      return matchesSearch && matchesStatus && matchesSubject;
    });
  }, [exams, searchQuery, statusFilter, subjectFilter]);

  const handleCreateExam = (examData: any) => {
    const newExam: ExamWithAssignments = {
      id: Date.now().toString(),
      ...examData,
      status: 'scheduled' as const,
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignments: [],
      assignedCount: 0
    };

    setExams(prev => [newExam, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleAssignExam = (assignments: any[]) => {
    if (!selectedExam) return;

    const newAssignments = assignments.map(assignment => ({
      id: Date.now().toString() + Math.random(),
      examId: selectedExam.id,
      assignmentType: assignment.type,
      targetId: assignment.targetId,
      targetName: assignment.targetName,
      assignedBy: 'Current User',
      assignedAt: new Date().toISOString()
    }));

    setExams(prev => prev.map(exam => 
      exam.id === selectedExam.id 
        ? { 
            ...exam, 
            assignments: [...exam.assignments, ...newAssignments],
            assignedCount: exam.assignedCount + assignments.reduce((sum, a) => sum + (a.studentCount || 0), 0)
          }
        : exam
    ));

    setIsAssignModalOpen(false);
    setSelectedExam(null);
  };

  const handleDeleteExam = (examId: string) => {
    setExams(prev => prev.filter(exam => exam.id !== examId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Exam Management</h1>
              <p className="text-gray-600 mt-2">Create, assign and manage examinations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('list')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Exam List
                </button>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Create Exam</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <ExamDashboard exams={exams} />
        )}

        {/* List View */}
        {currentView === 'list' && (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search exams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-gray-400" />
                    <select
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Subjects</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredExams.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  onEdit={() => {
                    setSelectedExam(exam);
                    setIsAssignModalOpen(true);
                  }}
                  onDelete={() => handleDeleteExam(exam.id)}
                  onAssign={() => {
                    setSelectedExam(exam);
                    setIsAssignModalOpen(true);
                  }}
                />
              ))}
            </div>

            {filteredExams.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No exams found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== 'all' || subjectFilter !== 'all'
                    ? 'Try adjusting your search criteria or filters'
                    : 'Get started by creating your first exam'
                  }
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create First Exam</span>
                </button>
              </div>
            )}
          </>
        )}

        {/* Modals */}
        {isCreateModalOpen && (
          <CreateExamModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onSubmit={handleCreateExam}
            grades={mockGrades}
          />
        )}

        {isAssignModalOpen && selectedExam && (
          <ExamAssignmentModal
            isOpen={isAssignModalOpen}
            onClose={() => {
              setIsAssignModalOpen(false);
              setSelectedExam(null);
            }}
            exam={selectedExam}
            grades={mockGrades}
            onAssign={handleAssignExam}
          />
        )}
      </div>
    </div>
  );
};

export default ExamManagement;