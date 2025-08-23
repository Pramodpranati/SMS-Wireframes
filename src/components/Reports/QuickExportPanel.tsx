import React, { useState } from 'react';
import { Download, Users, GraduationCap, Filter, TrendingUp } from 'lucide-react';
import ExportButton from './ExportButton';

interface QuickExportPanelProps {
  className?: string;
}

const QuickExportPanel: React.FC<QuickExportPanelProps> = ({ className = '' }) => {
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  // Mock data - replace with actual data from your state management
  const mockStudentData = [
    {
      id: '1',
      name: 'John Smith',
      studentId: 'ST001',
      grade: 'Grade 5',
      section: 'A',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, City, State 12345',
      dateOfBirth: '2015-06-15',
      guardianName: 'Robert Smith',
      guardianPhone: '(555) 987-6543'
    }
  ];

  const mockMarksheetData = [
    {
      id: '1',
      studentId: 'ST001',
      studentName: 'John Smith',
      grade: 'Grade 5',
      section: 'A',
      subjects: [
        { name: 'Mathematics', marks: 85, maxMarks: 100, grade: 'A' },
        { name: 'English', marks: 78, maxMarks: 100, grade: 'B+' }
      ],
      totalMarks: 163,
      percentage: 81.5,
      result: 'Pass',
      examType: 'Mid-term',
      examDate: '2024-10-15'
    }
  ];

  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'];
  const sections = ['A', 'B', 'C', 'D'];

  const getFilteredData = (data: any[]) => {
    if (!selectedGrade && !selectedSection) return data;
    
    return data.filter(item => {
      const gradeMatch = !selectedGrade || item.grade === selectedGrade;
      const sectionMatch = !selectedSection || item.section === selectedSection;
      return gradeMatch && sectionMatch;
    });
  };

  const currentFilters = {
    grades: selectedGrade ? [selectedGrade] : undefined,
    sections: selectedSection ? [selectedSection] : undefined
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Download className="w-5 h-5 text-blue-600" />
          Quick Export
        </h2>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <TrendingUp className="w-4 h-4" />
          Export Reports
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Quick Filters</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Grades</option>
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>

          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Sections</option>
            {sections.map(section => (
              <option key={section} value={section}>Section {section}</option>
            ))}
          </select>
        </div>

        {(selectedGrade || selectedSection) && (
          <button
            onClick={() => {
              setSelectedGrade('');
              setSelectedSection('');
            }}
            className="mt-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Export Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium text-slate-900">Student Details</div>
              <div className="text-sm text-slate-600">
                {getFilteredData(mockStudentData).length} records
              </div>
            </div>
          </div>
          <ExportButton
            data={getFilteredData(mockStudentData)}
            type="student-details"
            variant="outline"
            size="sm"
            filters={currentFilters}
          />
        </div>

        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium text-slate-900">Marksheets</div>
              <div className="text-sm text-slate-600">
                {getFilteredData(mockMarksheetData).length} records
              </div>
            </div>
          </div>
          <ExportButton
            data={getFilteredData(mockMarksheetData)}
            type="marksheet"
            variant="outline"
            size="sm"
            filters={currentFilters}
          />
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 text-center">
          Use filters to narrow down your export or export all records at once
        </div>
      </div>
    </div>
  );
};

export default QuickExportPanel;