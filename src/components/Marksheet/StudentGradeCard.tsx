import React from 'react';
import { Award, TrendingUp, User, Calendar } from 'lucide-react';

interface StudentGradeCardProps {
  student: {
    id: string;
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
    term: string;
    examType: string;
  };
}

const StudentGradeCard: React.FC<StudentGradeCardProps> = ({ student }) => {
  const subjects = [
    { key: 'english', name: 'English', maxMarks: 100 },
    { key: 'mathematics', name: 'Mathematics', maxMarks: 100 },
    { key: 'socialScience', name: 'Social Science', maxMarks: 100 },
    { key: 'science', name: 'Science', maxMarks: 100 },
    { key: 'hindi', name: 'Hindi', maxMarks: 100 },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'text-green-600 bg-green-100 border-green-200';
      case 'A': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'B': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'C': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSubjectGrade = (marks: number) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C';
    return 'D';
  };

  const getPerformanceColor = (marks: number) => {
    if (marks >= 90) return 'text-green-600 bg-green-50';
    if (marks >= 80) return 'text-blue-600 bg-blue-50';
    if (marks >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4 mb-4">
          <h2 className="text-lg font-bold">Grade Report Card</h2>
          <p className="text-blue-100">{student.term} - {student.examType}</p>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-2">
          <User className="h-5 w-5 text-gray-500" />
          <h3 className="text-xl font-bold text-gray-900">{student.studentName}</h3>
        </div>
        
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          <span>Class: {student.class}</span>
          <span>Roll: {student.rollNumber}</span>
        </div>
      </div>

      {/* Overall Performance */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Overall Performance</span>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(student.grade)}`}>
            <Award className="h-4 w-4" />
            Grade {student.grade}
          </div>
        </div>
        
        <div className="bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${student.percentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total: {student.totalMarks}/500</span>
          <span className="font-medium text-gray-900">{student.percentage.toFixed(1)}%</span>
        </div>
      </div>

      {/* Subject Wise Performance */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Subject Performance
        </h4>
        
        {subjects.map(subject => {
          const marks = student.subjects[subject.key as keyof typeof student.subjects];
          const subjectGrade = getSubjectGrade(marks);
          
          return (
            <div key={subject.key} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">{subject.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPerformanceColor(marks)}`}>
                    {marks}/100
                  </span>
                  <span className="text-xs font-medium text-gray-600">{subjectGrade}</span>
                </div>
              </div>
              
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    marks >= 90 ? 'bg-green-500' :
                    marks >= 80 ? 'bg-blue-500' :
                    marks >= 70 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${marks}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Performance Insights</h4>
        <div className="space-y-1 text-xs text-blue-800">
          {student.percentage >= 90 && (
            <p>🏆 Excellent performance! Keep up the great work.</p>
          )}
          {student.percentage >= 80 && student.percentage < 90 && (
            <p>⭐ Good performance! There's room for improvement.</p>
          )}
          {student.percentage >= 70 && student.percentage < 80 && (
            <p>📈 Average performance. Focus on weaker subjects.</p>
          )}
          {student.percentage < 70 && (
            <p>📚 Needs improvement. Consider additional support.</p>
          )}
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
          <Calendar className="h-3 w-3" />
          Generated on {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default StudentGradeCard;