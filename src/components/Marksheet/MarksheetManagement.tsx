import React, { useState, useEffect } from 'react';
import { Search, Plus, Download, Upload, Filter, Edit3, Save, X } from 'lucide-react';

interface StudentMark {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  rollNumber: string;
  subjects: {
    english: number;
    mathematics: number;
    socialScience: number;
    science: number;
    hindi: number;
  };
  totalMarks: number;
  percentage: number;
  grade: string;
  term: 'Term 1' | 'Term 2' | 'Annual';
  examType: 'Mid-term' | 'Final' | 'Unit Test';
}

const subjects = [
  { key: 'english', name: 'English', maxMarks: 100 },
  { key: 'mathematics', name: 'Mathematics', maxMarks: 100 },
  { key: 'socialScience', name: 'Social Science', maxMarks: 100 },
  { key: 'science', name: 'Science', maxMarks: 100 },
  { key: 'hindi', name: 'Hindi', maxMarks: 100 },
];

const MarksheetManagement: React.FC = () => {
  const [students, setStudents] = useState<StudentMark[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentMark[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [editedMarks, setEditedMarks] = useState<Partial<StudentMark['subjects']>>({});

  // Sample data
  useEffect(() => {
    const sampleData: StudentMark[] = [
      {
        id: '1',
        studentId: 'STU001',
        studentName: 'Abi',
        class: '10th A',
        rollNumber: '001',
        subjects: { english: 85, mathematics: 92, socialScience: 78, science: 88, hindi: 82 },
        totalMarks: 425,
        percentage: 85,
        grade: 'A',
        term: 'Term 1',
        examType: 'Final'
      },
      {
        id: '2',
        studentId: 'STU002',
        studentName: 'Priya',
        class: '10th A',
        rollNumber: '002',
        subjects: { english: 92, mathematics: 88, socialScience: 85, science: 90, hindi: 87 },
        totalMarks: 442,
        percentage: 88.4,
        grade: 'A',
        term: 'Term 1',
        examType: 'Final'
      },
      {
        id: '3',
        studentId: 'STU003',
        studentName: 'Rahul',
        class: '10th B',
        rollNumber: '003',
        subjects: { english: 76, mathematics: 82, socialScience: 79, science: 84, hindi: 78 },
        totalMarks: 399,
        percentage: 79.8,
        grade: 'B',
        term: 'Term 1',
        examType: 'Final'
      },
      {
        id: '4',
        studentId: 'STU004',
        studentName: 'Ananya',
        class: '10th A',
        rollNumber: '004',
        subjects: { english: 94, mathematics: 96, socialScience: 91, science: 93, hindi: 89 },
        totalMarks: 463,
        percentage: 92.6,
        grade: 'A+',
        term: 'Term 1',
        examType: 'Final'
      },
      {
        id: '5',
        studentId: 'STU005',
        studentName: 'Vikram',
        class: '10th B',
        rollNumber: '005',
        subjects: { english: 68, mathematics: 74, socialScience: 72, science: 76, hindi: 70 },
        totalMarks: 360,
        percentage: 72,
        grade: 'B',
        term: 'Term 1',
        examType: 'Final'
      }
    ];
    setStudents(sampleData);
    setFilteredStudents(sampleData);
  }, []);

  // Filter students based on search and filters
  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.includes(searchTerm)
      );
    }

    if (selectedClass) {
      filtered = filtered.filter(student => student.class === selectedClass);
    }

    if (selectedTerm) {
      filtered = filtered.filter(student => student.term === selectedTerm);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, selectedClass, selectedTerm]);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'text-green-600 bg-green-50';
      case 'A': return 'text-blue-600 bg-blue-50';
      case 'B': return 'text-orange-600 bg-orange-50';
      case 'C': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const calculateGrade = (percentage: number): string => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'D';
  };

  const handleEditStart = (studentId: string, subjects: StudentMark['subjects']) => {
    setEditingStudent(studentId);
    setEditedMarks(subjects);
  };

  const handleEditCancel = () => {
    setEditingStudent(null);
    setEditedMarks({});
  };

  const handleSaveMarks = (studentId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        const newSubjects = { ...student.subjects, ...editedMarks };
        const totalMarks = Object.values(newSubjects).reduce((sum, mark) => sum + mark, 0);
        const percentage = (totalMarks / 500) * 100;
        const grade = calculateGrade(percentage);
        
        return {
          ...student,
          subjects: newSubjects,
          totalMarks,
          percentage,
          grade
        };
      }
      return student;
    }));
    
    setEditingStudent(null);
    setEditedMarks({});
  };

  const handleMarkChange = (subject: string, value: number) => {
    setEditedMarks(prev => ({ ...prev, [subject]: Math.max(0, Math.min(100, value)) }));
  };

  const classes = [...new Set(students.map(s => s.class))];
  const terms = [...new Set(students.map(s => s.term))];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Student Marksheet</h1>
          <p className="text-gray-600">Manage and track student academic performance</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by student name or roll number..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>

              <select
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option value="">All Terms</option>
                {terms.map(term => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="h-4 w-4" />
              Add Student
            </button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Upload className="h-4 w-4" />
              Import
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Students</h3>
            <p className="text-2xl font-bold text-gray-900">{filteredStudents.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Average Score</h3>
            <p className="text-2xl font-bold text-gray-900">
              {filteredStudents.length > 0 
                ? Math.round(filteredStudents.reduce((sum, s) => sum + s.percentage, 0) / filteredStudents.length)
                : 0}%
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-1">A+ Students</h3>
            <p className="text-2xl font-bold text-green-600">
              {filteredStudents.filter(s => s.grade === 'A+').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-1">Classes</h3>
            <p className="text-2xl font-bold text-gray-900">{classes.length}</p>
          </div>
        </div>

        {/* Marksheet Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                  {subjects.map(subject => (
                    <th key={subject.key} className="px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {subject.name}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  {/* <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th> */}
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.studentName}</div>
                        <div className="text-sm text-gray-500">Roll: {student.rollNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.class}</td>
                    
                    {/* Subject Marks */}
                    {subjects.map(subject => (
                      <td key={subject.key} className="px-4 py-4 text-center">
                        {editingStudent === student.id ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-16 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={editedMarks[subject.key as keyof typeof editedMarks] ?? student.subjects[subject.key as keyof typeof student.subjects]}
                            onChange={(e) => handleMarkChange(subject.key, parseInt(e.target.value) || 0)}
                          />
                        ) : (
                          <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                            student.subjects[subject.key as keyof typeof student.subjects] >= 90 ? 'text-green-700 bg-green-100' :
                            student.subjects[subject.key as keyof typeof student.subjects] >= 80 ? 'text-blue-700 bg-blue-100' :
                            student.subjects[subject.key as keyof typeof student.subjects] >= 70 ? 'text-orange-700 bg-orange-100' :
                            'text-red-700 bg-red-100'
                          }`}>
                            {student.subjects[subject.key as keyof typeof student.subjects]}
                          </span>
                        )}
                      </td>
                    ))}
                    
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{student.totalMarks}</td>
                    {/* <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{student.percentage.toFixed(1)}%</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(student.grade)}`}>
                        {student.grade}
                      </span>
                    </td> */}
                    <td className="px-6 py-4 text-center">
                      {editingStudent === student.id ? (
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleSaveMarks(student.id)}
                            className="text-green-600 hover:text-green-900 transition-colors"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditStart(student.id, student.subjects)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No students found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarksheetManagement;