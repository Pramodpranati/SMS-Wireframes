import React, { useState } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import { useSchool } from '../../contexts/SchoolContext';
import { Grade, Section } from '../../types';

export const GradeManagement: React.FC = () => {
  const { grades, addGrade, updateGrade, deleteGrade, addSection, updateSection, deleteSection } = useSchool();
  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState<string>('');
  const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);

  const [newGrade, setNewGrade] = useState({ name: '' });
  const [newSection, setNewSection] = useState({ name: '', roomNumber: '' });

  const handleAddGrade = () => {
    if (newGrade.name.trim()) {
      addGrade({ name: newGrade.name, sections: [] });
      setNewGrade({ name: '' });
      setShowAddGradeModal(false);
    }
  };

  const handleAddSection = () => {
    if (newSection.name.trim() && newSection.roomNumber.trim() && selectedGradeId) {
      addSection({
        name: newSection.name,
        roomNumber: newSection.roomNumber,
        gradeId: selectedGradeId,
        students: []
      });
      setNewSection({ name: '', roomNumber: '' });
      setShowAddSectionModal(false);
      setSelectedGradeId('');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Grades & Sections</h1>
          <p className="text-gray-600">Manage school grades and their sections</p>
        </div>
        <button
          onClick={() => setShowAddGradeModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Grade</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {grades.map((grade) => (
          <div key={grade.id} className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">{grade.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedGradeId(grade.id);
                      setShowAddSectionModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Add Section"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingGrade(grade)}
                    className="text-gray-600 hover:text-gray-800 p-1"
                    title="Edit Grade"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteGrade(grade.id)}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete Grade"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {grade.sections.length} section{grade.sections.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="p-4">
              {grade.sections.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No sections added yet</p>
              ) : (
                <div className="space-y-3">
                  {grade.sections.map((section) => (
                    <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">{section.name}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Section {section.name}</p>
                          <p className="text-xs text-gray-500">Room: {section.roomNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{section.students.length}</span>
                        </div>
                        <button
                          onClick={() => setEditingSection(section)}
                          className="text-gray-600 hover:text-gray-800 p-1"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Grade Modal */}
      {showAddGradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Grade</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade Name</label>
                <input
                  type="text"
                  value={newGrade.name}
                  onChange={(e) => setNewGrade({ name: e.target.value })}
                  placeholder="e.g., Grade 1, Grade 2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddGradeModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGrade}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Grade
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Modal */}
      {showAddSectionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Name</label>
                <input
                  type="text"
                  value={newSection.name}
                  onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                  placeholder="e.g., A, B, C"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                <input
                  type="text"
                  value={newSection.roomNumber}
                  onChange={(e) => setNewSection({ ...newSection, roomNumber: e.target.value })}
                  placeholder="e.g., 101, 102"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddSectionModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSection}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};