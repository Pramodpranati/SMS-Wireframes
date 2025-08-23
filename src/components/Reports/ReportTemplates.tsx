import React from 'react';

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

interface StudentDetailsPDFProps {
  students: Student[];
  title?: string;
}

export const StudentDetailsPDFTemplate: React.FC<StudentDetailsPDFProps> = ({ 
  students, 
  title = "Student Details Report" 
}) => {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-blue-600 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-600">Generated on {new Date().toLocaleDateString()}</p>
        <div className="mt-4 text-sm text-slate-500">
          Total Records: {students.length}
        </div>
      </div>

      {/* Student Details */}
      <div className="space-y-6">
        {students.map((student, index) => (
          <div key={student.id} className="border border-slate-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-slate-900">{student.name}</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {student.studentId}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Academic Information</h4>
                <div className="space-y-1 text-sm">
                  <div><strong>Grade:</strong> {student.grade}</div>
                  <div><strong>Section:</strong> {student.section}</div>
                  <div><strong>Date of Birth:</strong> {new Date(student.dateOfBirth).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-2">Contact Information</h4>
                <div className="space-y-1 text-sm">
                  <div><strong>Email:</strong> {student.email}</div>
                  <div><strong>Phone:</strong> {student.phone}</div>
                  <div><strong>Address:</strong> {student.address}</div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium text-slate-700 mb-2">Guardian Information</h4>
                <div className="space-y-1 text-sm">
                  <div><strong>Guardian Name:</strong> {student.guardianName}</div>
                  <div><strong>Guardian Phone:</strong> {student.guardianPhone}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
        This report was generated automatically on {new Date().toLocaleString()}
      </div>
    </div>
  );
};

interface MarksheetPDFProps {
  marksheets: Marksheet[];
  title?: string;
}

export const MarksheetPDFTemplate: React.FC<MarksheetPDFProps> = ({ 
  marksheets, 
  title = "Marksheet Report" 
}) => {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 border-blue-600 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
        <p className="text-slate-600">Academic Performance Report</p>
        <div className="mt-4 text-sm text-slate-500">
          Generated on {new Date().toLocaleDateString()} | Total Records: {marksheets.length}
        </div>
      </div>

      {/* Marksheets */}
      <div className="space-y-8">
        {marksheets.map((marksheet, index) => (
          <div key={marksheet.id} className="border border-slate-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{marksheet.studentName}</h3>
                <p className="text-slate-600">{marksheet.grade} - Section {marksheet.section}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">{marksheet.examType}</div>
                <div className="text-sm text-slate-500">{new Date(marksheet.examDate).toLocaleDateString()}</div>
              </div>
            </div>
            
            {/* Subject Details */}
            <div className="mb-6">
              <h4 className="font-medium text-slate-700 mb-3">Subject-wise Performance</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 px-4 py-2 text-left">Subject</th>
                      <th className="border border-slate-300 px-4 py-2 text-center">Marks Obtained</th>
                      <th className="border border-slate-300 px-4 py-2 text-center">Total Marks</th>
                      <th className="border border-slate-300 px-4 py-2 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marksheet.subjects.map((subject, idx) => (
                      <tr key={idx}>
                        <td className="border border-slate-300 px-4 py-2">{subject.name}</td>
                        <td className="border border-slate-300 px-4 py-2 text-center">{subject.marks}</td>
                        <td className="border border-slate-300 px-4 py-2 text-center">{subject.maxMarks}</td>
                        <td className="border border-slate-300 px-4 py-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            subject.grade === 'A+' || subject.grade === 'A' 
                              ? 'bg-green-100 text-green-700'
                              : subject.grade === 'B+' || subject.grade === 'B'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {subject.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-900">{marksheet.totalMarks}</div>
                  <div className="text-sm text-slate-600">Total Marks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{marksheet.percentage}%</div>
                  <div className="text-sm text-slate-600">Percentage</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${
                    marksheet.result === 'Pass' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {marksheet.result}
                  </div>
                  <div className="text-sm text-slate-600">Result</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {marksheet.percentage >= 90 ? 'A+' : 
                     marksheet.percentage >= 80 ? 'A' :
                     marksheet.percentage >= 70 ? 'B+' :
                     marksheet.percentage >= 60 ? 'B' : 'C'}
                  </div>
                  <div className="text-sm text-slate-600">Overall Grade</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>This is an official academic report generated by the School Management System</p>
        <p>Generated on {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};