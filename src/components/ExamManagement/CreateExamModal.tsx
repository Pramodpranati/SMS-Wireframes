import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, Users } from 'lucide-react';
import { CreateExamData, Grade } from '../../types/Exam';

interface CreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateExamData) => void;
  grades: Grade[];
}

const CreateExamModal: React.FC<CreateExamModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  grades
}) => {
  const [formData, setFormData] = useState<Partial<CreateExamData>>({
    title: '',
    subject: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    totalMarks: 100,
    passingMarks: 40,
    instructions: '',
    assignments: {
      type: 'grade',
      targetIds: []
    }
  });

  const [selectedTargets, setSelectedTargets] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.subject || !formData.date || !formData.startTime || !formData.endTime) {
      alert('Please fill in all required fields');
      return;
    }

    const duration = calculateDuration(formData.startTime!, formData.endTime!);

    onSubmit({
      ...formData as CreateExamData,
      duration,
      assignments: {
        ...formData.assignments!,
        targetIds: selectedTargets
      }
    });

    // Reset form
    setFormData({
      title: '',
      subject: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      totalMarks: 100,
      passingMarks: 40,
      instructions: '',
      assignments: {
        type: 'grade',
        targetIds: []
      }
    });
    setSelectedTargets([]);
  };

  const calculateDuration = (startTime: string, endTime: string): number => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  };

  const handleTargetSelection = (targetId: string) => {
    setSelectedTargets(prev =>
      prev.includes(targetId)
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    );
  };

  const getTargetOptions = () => {
    switch (formData.assignments?.type) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Create New Exam</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exam Title *
                </label>
                {/* <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mid-Term Mathematics Exam"
                  required
                /> */}
                <select

                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="split_unit_test">Select Title</option>
                  <option value="split_unit_test">Slip/Unit Test</option>
                  <option value="mid_term_1">Mid Term I</option>
                  <option value="mid_term_2">Mid Term II</option>
                  <option value="mid_term_3">Mid Term III</option>
                  <option value="quarterly">Quarterly Exam</option>
                  <option value="half_yearly">Half-Yearly Exam</option>
                  <option value="annual">Annual Exam</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                {/* <input
                  type="text"
                  value={formData.subject || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Mathematics"
                  required
                /> */}
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="english">Select subject</option>
                  <option value="english">English</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="hindi">Hindi</option>
                  <option value="social_science">Social Science</option>
                  <option value="science">Science</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Brief description of the exam..."
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Schedule
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.startTime || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time *
                </label>
                <input
                  type="time"
                  value={formData.endTime || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {formData.startTime && formData.endTime && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Duration: {calculateDuration(formData.startTime, formData.endTime)} minutes
                </p>
              </div>
            )}
          </div>

          {/* Marks */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Marks Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Marks
                </label>
                <input
                  type="number"
                  value={formData.totalMarks || 100}
                  onChange={(e) => setFormData(prev => ({ ...prev, totalMarks: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passing Marks
                </label>
                <input
                  type="number"
                  value={formData.passingMarks || 40}
                  onChange={(e) => setFormData(prev => ({ ...prev, passingMarks: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max={formData.totalMarks || 100}
                />
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Assignment
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade *
              </label>
             
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Grade</option>
                <option value="Grade I">Grade I</option>
                <option value="Grade II">Grade II</option>
                <option value="Grade III">Grade III</option>
                <option value="Grade IV">Grade IV</option>
                <option value="Grade V">Grade V</option>
              </select>
            </div>
            {/* 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign to:
              </label>
              <div className="flex space-x-4">
                {(['grade', 'section', 'school'] as const).map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      name="assignmentType"
                      value={type}
                      checked={formData.assignments?.type === type}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          assignments: {
                            type: e.target.value as any,
                            targetIds: []
                          }
                        }));
                        setSelectedTargets([]);
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.assignments?.type && formData.assignments.type !== 'school' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select {formData.assignments.type}(s):
                </label>
                <div className="border border-gray-300 rounded-lg max-h-48 overflow-y-auto">
                  {getTargetOptions().map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedTargets.includes(option.id)}
                          onChange={() => handleTargetSelection(option.id)}
                          className="mr-3"
                        />
                        <span className="text-sm text-gray-700">{option.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{option.studentCount} students</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {formData.assignments?.type === 'school' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-800">
                  This exam will be assigned to all students in the school.
                </p>
              </div>
            )} */}
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instructions
            </label>
            <textarea
              value={formData.instructions || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Special instructions for students..."
            />
          </div>

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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create Exam
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExamModal;