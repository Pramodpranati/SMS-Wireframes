import React, { useState } from 'react';
import { X, Users, GraduationCap, School } from 'lucide-react';
import { ExamWithAssignments, Grade } from '../../types/Exam';

interface ExamAssignmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  exam: ExamWithAssignments;
  grades: Grade[];
  onAssign: (assignments: any[]) => void;
}

const ExamAssignmentModal: React.FC<ExamAssignmentModalProps> = ({
  isOpen,
  onClose,
  exam,
  grades,
  onAssign
}) => {
  const [assignmentType, setAssignmentType] = useState<'grade' | 'section' | 'school'>('grade');
  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (assignmentType === 'school') {
      onAssign([{
        type: 'school',
        targetName: 'Entire School',
        studentCount: grades.reduce((sum, grade) => 
          sum + grade.sections.reduce((sectionSum, section) => sectionSum + section.studentCount, 0), 0
        )
      }]);
    } else if (selectedTargets.length > 0) {
      const assignments = selectedTargets.map(targetId => {
        if (assignmentType === 'grade') {
          const grade = grades.find(g => g.id === targetId);
          return {
            type: 'grade',
            targetId,
            targetName: grade?.name || '',
            studentCount: grade?.sections.reduce((sum, section) => sum + section.studentCount, 0) || 0
          };
        } else {
          const section = grades.flatMap(g => g.sections).find(s => s.id === targetId);
          const grade = grades.find(g => g.sections.some(s => s.id === targetId));
          return {
            type: 'section',
            targetId,
            targetName: `${grade?.name} - ${section?.name}` || '',
            studentCount: section?.studentCount || 0
          };
        }
      });
      onAssign(assignments);
    }
    
    setSelectedTargets([]);
  };

  const handleTargetSelection = (targetId: string) => {
    if (assignmentType === 'school') return;
    
    setSelectedTargets(prev => 
      prev.includes(targetId) 
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    );
  };

  const getTargetOptions = () => {
    switch (assignmentType) {
      case 'grade':
        return grades.map(grade => ({
          id: grade.id,
          name: grade.name,
          studentCount: grade.sections.reduce((sum, section) => sum + section.studentCount, 0)
        }));
      case 'section':
        return grades.flatMap(grade => 
          grade.sections.map(section => ({
            id: section.id,
            name: `${grade.name} - ${section.name}`,
            studentCount: section.studentCount
          }))
        );
      case 'school':
        return [{
          id: 'all',
          name: 'Entire School',
          studentCount: grades.reduce((sum, grade) => 
            sum + grade.sections.reduce((sectionSum, section) => sectionSum + section.studentCount, 0), 0
          )
        }];
      default:
        return [];
    }
  };

  const getTotalSelectedStudents = () => {
    if (assignmentType === 'school') {
      return grades.reduce((sum, grade) => 
        sum + grade.sections.reduce((sectionSum, section) => sectionSum + section.studentCount, 0), 0
      );
    }
    
    return selectedTargets.reduce((sum, targetId) => {
      if (assignmentType === 'grade') {
        const grade = grades.find(g => g.id === targetId);
        return sum + (grade?.sections.reduce((sectionSum, section) => sectionSum + section.studentCount, 0) || 0);
      } else {
        const section = grades.flatMap(g => g.sections).find(s => s.id === targetId);
        return sum + (section?.studentCount || 0);
      }
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Assign Exam</h2>
            <p className="text-sm text-gray-600 mt-1">{exam.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Exam Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Exam Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Subject:</span>
                <span className="ml-2 text-gray-900">{exam.subject}</span>
              </div>
              <div>
                <span className="text-gray-600">Date:</span>
                <span className="ml-2 text-gray-900">{new Date(exam.date).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-600">Time:</span>
                <span className="ml-2 text-gray-900">{exam.startTime} - {exam.endTime}</span>
              </div>
              <div>
                <span className="text-gray-600">Duration:</span>
                <span className="ml-2 text-gray-900">{exam.duration} minutes</span>
              </div>
            </div>
          </div>

          {/* Assignment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Assignment Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  setAssignmentType('grade');
                  setSelectedTargets([]);
                }}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  assignmentType === 'grade'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <GraduationCap className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">By Grade</span>
                <span className="text-xs text-center">Assign to entire grade levels</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAssignmentType('section');
                  setSelectedTargets([]);
                }}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  assignmentType === 'section'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <Users className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">By Section</span>
                <span className="text-xs text-center">Assign to specific sections</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAssignmentType('school');
                  setSelectedTargets([]);
                }}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-colors ${
                  assignmentType === 'school'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <School className="w-6 h-6 mb-2" />
                <span className="text-sm font-medium">Whole School</span>
                <span className="text-xs text-center">Assign to all students</span>
              </button>
            </div>
          </div>

          {/* Target Selection */}
          {assignmentType !== 'school' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select {assignmentType === 'grade' ? 'Grades' : 'Sections'}
              </label>
              <div className="border border-gray-300 rounded-lg max-h-64 overflow-y-auto">
                {getTargetOptions().map((option, index) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                      index !== getTargetOptions().length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTargets.includes(option.id)}
                        onChange={() => handleTargetSelection(option.id)}
                        className="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{option.name}</span>
                        <p className="text-xs text-gray-500">{option.studentCount} students</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">{option.studentCount}</span>
                      <p className="text-xs text-gray-500">students</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Assignment Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Assignment Summary</h4>
            <div className="text-sm text-blue-800">
              <p>Type: <span className="font-medium capitalize">{assignmentType}</span></p>
              {assignmentType === 'school' ? (
                <p>Target: <span className="font-medium">Entire School</span></p>
              ) : (
                <p>Selected: <span className="font-medium">{selectedTargets.length} {assignmentType}(s)</span></p>
              )}
              <p>Total Students: <span className="font-medium">{getTotalSelectedStudents()}</span></p>
            </div>
          </div>

          {/* Current Assignments */}
          {exam.assignments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Current Assignments</h4>
              <div className="space-y-2">
                {exam.assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-900">{assignment.targetName}</span>
                    <span className="text-xs text-gray-500 capitalize">{assignment.assignmentType}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={assignmentType !== 'school' && selectedTargets.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Assign Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExamAssignmentModal;