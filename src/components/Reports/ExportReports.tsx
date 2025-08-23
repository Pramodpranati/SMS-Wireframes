import React, { useState, useEffect } from 'react';
import { Download, FileText, Table, Filter, Users, GraduationCap, BookOpen, Eye, X, Check, Clock } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  studentId: string;
  grade: string;
  section: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  guardianName: string;
  guardianPhone: string;
}

interface Marksheet {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  subjects: Array<{
    name: string;
    marks: number;
    maxMarks: number;
    grade: string;
  }>;
  totalMarks: number;
  percentage: number;
  result: string;
  examType: string;
  examDate: string;
}

interface ExportJob {
  id: string;
  type: 'student-details' | 'marksheet';
  format: 'pdf' | 'csv';
  filter: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  downloadUrl?: string;
}

const ExportReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student-details' | 'marksheet'>('student-details');
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv'>('pdf');
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedSections, setSections] = useState<string[]>([]);
  const [exportType, setExportType] = useState<'all' | 'filtered'>('all');
  const [showPreview, setShowPreview] = useState(false);
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // Mock data - replace with actual API calls
  const grades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10'];
  const sections = ['A', 'B', 'C', 'D'];

  const sampleStudents: Student[] = [
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
    },
    {
      id: '2',
      name: 'Emily Johnson',
      studentId: 'ST002',
      grade: 'Grade 5',
      section: 'B',
      email: 'emily.johnson@email.com',
      phone: '(555) 234-5678',
      address: '456 Oak Ave, City, State 12345',
      dateOfBirth: '2015-08-22',
      guardianName: 'Sarah Johnson',
      guardianPhone: '(555) 876-5432'
    }
  ];

  const sampleMarksheets: Marksheet[] = [
    {
      id: '1',
      studentId: 'ST001',
      studentName: 'John Smith',
      grade: 'Grade 5',
      section: 'A',
      subjects: [
        { name: 'Mathematics', marks: 85, maxMarks: 100, grade: 'A' },
        { name: 'English', marks: 78, maxMarks: 100, grade: 'B+' },
        { name: 'Science', marks: 92, maxMarks: 100, grade: 'A+' }
      ],
      totalMarks: 255,
      percentage: 85.0,
      result: 'Pass',
      examType: 'Mid-term',
      examDate: '2024-10-15'
    }
  ];

  const handleGradeChange = (grade: string) => {
    setSelectedGrades(prev =>
      prev.includes(grade)
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const handleSectionChange = (section: string) => {
    setSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const getFilteredData = () => {
    if (exportType === 'all') {
      return activeTab === 'student-details' ? sampleStudents : sampleMarksheets;
    }

    const gradeFilter = selectedGrades.length === 0 ? grades : selectedGrades;
    const sectionFilter = selectedSections.length === 0 ? sections : selectedSections;

    if (activeTab === 'student-details') {
      return sampleStudents.filter(student =>
        gradeFilter.includes(student.grade) && sectionFilter.includes(student.section)
      );
    } else {
      return sampleMarksheets.filter(marksheet =>
        gradeFilter.includes(marksheet.grade) && sectionFilter.includes(marksheet.section)
      );
    }
  };

  const handleExport = async () => {
    setIsExporting(true);

    const newJob: ExportJob = {
      id: `export_${Date.now()}`,
      type: activeTab,
      format: selectedFormat,
      filter: exportType === 'all' ? 'All Records' : `${selectedGrades.join(', ')} - ${selectedSections.join(', ')}`,
      status: 'processing',
      progress: 0,
      createdAt: new Date().toISOString()
    };

    setExportJobs(prev => [newJob, ...prev]);

    // Simulate export process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setExportJobs(prev => prev.map(job =>
        job.id === newJob.id ? { ...job, progress: i } : job
      ));
    }

    // Complete the job
    setExportJobs(prev => prev.map(job =>
      job.id === newJob.id
        ? {
          ...job,
          status: 'completed',
          progress: 100,
          downloadUrl: `/downloads/${newJob.id}.${selectedFormat}`
        }
        : job
    ));

    setIsExporting(false);
    setShowPreview(false);
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Export Reports</h1>
          <p className="text-slate-600">Generate and download student details and marksheet reports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Export Configuration Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Report Type Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Select Report Type
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('student-details')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${activeTab === 'student-details'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Student Details</div>
                  <div className="text-sm opacity-75">Personal information and contact details</div>
                </button>

                <button
                  onClick={() => setActiveTab('marksheet')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${activeTab === 'marksheet'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                >
                  <GraduationCap className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Marksheet</div>
                  <div className="text-sm opacity-75">Academic performance and grades</div>
                </button>
              </div>
            </div>

            {/* Format Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Export Format</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedFormat('pdf')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedFormat === 'pdf'
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                >
                  <FileText className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">PDF Format</div>
                  <div className="text-sm opacity-75">Professional formatted report</div>
                </button>

                <button
                  onClick={() => setSelectedFormat('csv')}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${selectedFormat === 'csv'
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                >
                  <Table className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">CSV Format</div>
                  <div className="text-sm opacity-75">Spreadsheet compatible data</div>
                </button>
              </div>
            </div>

            {/* Filter Options */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-600" />
                Filter Options
              </h2>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => setExportType('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${exportType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    Export All
                  </button>
                  <button
                    onClick={() => setExportType('filtered')}
                    className={`px-4 py-2 rounded-lg transition-colors ${exportType === 'filtered'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    Filter by Grade & Section
                  </button>
                </div>

                {exportType === 'filtered' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Grades</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3">
                        {grades.map(grade => (
                          <label key={grade} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedGrades.includes(grade)}
                              onChange={() => handleGradeChange(grade)}
                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-700">{grade}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Sections</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg p-3">
                        {sections.map(section => (
                          <label key={section} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedSections.includes(section)}
                              onChange={() => handleSectionChange(section)}
                              className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-slate-700">Section {section}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Export Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowPreview(true)}
                  disabled={exportType === 'filtered' && selectedGrades.length === 0 && selectedSections.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Eye className="w-5 h-5" />
                  Preview Data ({filteredData.length} records)
                </button>

                <button
                  onClick={handleExport}
                  disabled={isExporting || (exportType === 'filtered' && selectedGrades.length === 0 && selectedSections.length === 0)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-5 h-5" />
                  {isExporting ? 'Exporting...' : `Export ${selectedFormat.toUpperCase()}`}
                </button>
              </div>
            </div>
          </div>

          {/* Export History Panel */}
          {/* <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Export History</h2>

            <div className="space-y-3">
              {exportJobs.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No exports yet</p>
                  <p className="text-sm">Your export history will appear here</p>
                </div>
              ) : (
                exportJobs.map(job => (
                  <div key={job.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-medium text-slate-900 capitalize">
                          {job.type.replace('-', ' ')} - {job.format.toUpperCase()}
                        </div>
                        <div className="text-sm text-slate-600">{job.filter}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        {job.status === 'processing' && (
                          <Clock className="w-4 h-4 text-amber-500 animate-spin" />
                        )}
                        {job.status === 'completed' && (
                          <Check className="w-4 h-4 text-green-500" />
                        )}
                        {job.status === 'failed' && (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </div>

                    {job.status === 'processing' && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{job.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-500">
                        {new Date(job.createdAt).toLocaleString()}
                      </div>

                      {job.status === 'completed' && job.downloadUrl && (
                        <a
                          href={job.downloadUrl}
                          download
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div> */}
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900">
                  Preview: {activeTab === 'student-details' ? 'Student Details' : 'Marksheet'} Export
                </h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="p-6 overflow-auto max-h-[60vh]">
                <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-4 text-sm text-blue-700">
                    <span>Records to export: <strong>{filteredData.length}</strong></span>
                    <span>Format: <strong>{selectedFormat.toUpperCase()}</strong></span>
                    <span>Filter: <strong>{exportType === 'all' ? 'All Records' : 'Custom Filter'}</strong></span>
                  </div>
                </div>

                {activeTab === 'student-details' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border border-slate-300 px-4 py-2 text-left">Student ID</th>
                          <th className="border border-slate-300 px-4 py-2 text-left">Name</th>
                          <th className="border border-slate-300 px-4 py-2 text-left">Grade</th>
                          <th className="border border-slate-300 px-4 py-2 text-left">Section</th>
                          <th className="border border-slate-300 px-4 py-2 text-left">Guardian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(filteredData as Student[]).slice(0, 5).map(student => (
                          <tr key={student.id}>
                            <td className="border border-slate-300 px-4 py-2">{student.studentId}</td>
                            <td className="border border-slate-300 px-4 py-2">{student.name}</td>
                            <td className="border border-slate-300 px-4 py-2">{student.grade}</td>
                            <td className="border border-slate-300 px-4 py-2">{student.section}</td>
                            <td className="border border-slate-300 px-4 py-2">{student.guardianName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredData.length > 5 && (
                      <p className="text-sm text-slate-500 mt-2">
                        Showing first 5 records. {filteredData.length - 5} more records will be included in export.
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border border-slate-300 px-4 py-2 text-left">Student</th>
                          <th className="border border-slate-300 px-4 py-2 text-left">Grade</th>
                          <th className="border border-slate-300 px-4 py-2 text-left">Total Marks</th>
                          <th className="border border-slate-300 px-4 py-2 text-left">Percentage</th>
                          <th className="border border-slate-300 px-4 py-2 text-left">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(filteredData as Marksheet[]).slice(0, 5).map(marksheet => (
                          <tr key={marksheet.id}>
                            <td className="border border-slate-300 px-4 py-2">{marksheet.studentName}</td>
                            <td className="border border-slate-300 px-4 py-2">{marksheet.grade}</td>
                            <td className="border border-slate-300 px-4 py-2">{marksheet.totalMarks}</td>
                            <td className="border border-slate-300 px-4 py-2">{marksheet.percentage}%</td>
                            <td className="border border-slate-300 px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${marksheet.result === 'Pass'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                                }`}>
                                {marksheet.result}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredData.length > 5 && (
                      <p className="text-sm text-slate-500 mt-2">
                        Showing first 5 records. {filteredData.length - 5} more records will be included in export.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isExporting ? 'Exporting...' : 'Export Now'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportReports;