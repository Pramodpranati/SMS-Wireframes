import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

interface BulkMarkEntryProps {
  onClose: () => void;
  onSubmit: (data: any[]) => void;
}

const BulkMarkEntry: React.FC<BulkMarkEntryProps> = ({ onClose, onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setErrors([]);

    try {
      const text = await file.text();
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
      
      if (lines.length === 0) {
        setErrors(['File is empty']);
        setIsProcessing(false);
        return;
      }

      // Expected format: StudentName,RollNumber,Class,English,Mathematics,SocialScience,Science,Hindi
      const headers = lines[0].split(',');
      const expectedHeaders = ['StudentName', 'RollNumber', 'Class', 'English', 'Mathematics', 'SocialScience', 'Science', 'Hindi'];
      
      if (!expectedHeaders.every(header => headers.includes(header))) {
        setErrors(['Invalid file format. Please use the template.']);
        setIsProcessing(false);
        return;
      }

      const data = [];
      const newErrors = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        
        if (values.length !== expectedHeaders.length) {
          newErrors.push(`Row ${i + 1}: Invalid number of columns`);
          continue;
        }

        const [studentName, rollNumber, className, english, mathematics, socialScience, science, hindi] = values;

        // Validate marks
        const marks = [english, mathematics, socialScience, science, hindi].map(mark => {
          const num = parseInt(mark.trim());
          return isNaN(num) || num < 0 || num > 100 ? null : num;
        });

        if (marks.some(mark => mark === null)) {
          newErrors.push(`Row ${i + 1}: Invalid marks (must be 0-100)`);
          continue;
        }

        const [englishMark, mathMark, socialMark, scienceMark, hindiMark] = marks;
        const totalMarks = englishMark! + mathMark! + socialMark! + scienceMark! + hindiMark!;
        const percentage = (totalMarks / 500) * 100;
        
        let grade = 'D';
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B';
        else if (percentage >= 60) grade = 'C';

        data.push({
          id: `bulk_${i}`,
          studentId: `STU${rollNumber.padStart(3, '0')}`,
          studentName: studentName.trim(),
          class: className.trim(),
          rollNumber: rollNumber.trim(),
          subjects: {
            english: englishMark!,
            mathematics: mathMark!,
            socialScience: socialMark!,
            science: scienceMark!,
            hindi: hindiMark!
          },
          totalMarks,
          percentage,
          grade,
          term: 'Term 1' as const,
          examType: 'Final' as const
        });
      }

      setUploadData(data);
      setErrors(newErrors);
    } catch (error) {
      setErrors(['Error processing file. Please check the format.']);
    }

    setIsProcessing(false);
  };

  const downloadTemplate = () => {
    const csvContent = 'StudentName,RollNumber,Class,English,Mathematics,SocialScience,Science,Hindi\n' +
                      'Aarav Sharma,001,10th A,85,92,78,88,82\n' +
                      'Priya Patel,002,10th A,92,88,85,90,87';
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'marksheet_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = () => {
    if (uploadData.length > 0 && errors.length === 0) {
      onSubmit(uploadData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Bulk Mark Entry</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Instructions */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Instructions:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Download the CSV template and fill in student data</li>
              <li>• Ensure all marks are between 0-100</li>
              <li>• Use the exact column headers as shown in the template</li>
              <li>• Save your file as CSV format before uploading</li>
            </ul>
          </div>

          {/* Template Download */}
          <div className="mb-6">
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Template
            </button>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Drop your CSV file here or click to browse
              </p>
              <input
                type="file"
                accept=".csv,.txt"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <FileText className="h-4 w-4" />
                Select File
              </label>
            </div>
            
            {selectedFile && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <FileText className="h-4 w-4" />
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
              </div>
            )}
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="mb-6 flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Processing file...
            </div>
          )}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 text-red-800 mb-2">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">Errors found:</span>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Preview Data */}
          {uploadData.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-green-800 mb-3">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">
                  Successfully processed {uploadData.length} student records
                </span>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left">Name</th>
                      <th className="px-3 py-2 text-left">Roll</th>
                      <th className="px-3 py-2 text-left">Class</th>
                      <th className="px-3 py-2 text-center">Eng</th>
                      <th className="px-3 py-2 text-center">Math</th>
                      <th className="px-3 py-2 text-center">SS</th>
                      <th className="px-3 py-2 text-center">Sci</th>
                      <th className="px-3 py-2 text-center">Hin</th>
                      <th className="px-3 py-2 text-center">Total</th>
                      <th className="px-3 py-2 text-center">%</th>
                      <th className="px-3 py-2 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadData.map((student, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="px-3 py-2">{student.studentName}</td>
                        <td className="px-3 py-2">{student.rollNumber}</td>
                        <td className="px-3 py-2">{student.class}</td>
                        <td className="px-3 py-2 text-center">{student.subjects.english}</td>
                        <td className="px-3 py-2 text-center">{student.subjects.mathematics}</td>
                        <td className="px-3 py-2 text-center">{student.subjects.socialScience}</td>
                        <td className="px-3 py-2 text-center">{student.subjects.science}</td>
                        <td className="px-3 py-2 text-center">{student.subjects.hindi}</td>
                        <td className="px-3 py-2 text-center font-medium">{student.totalMarks}</td>
                        <td className="px-3 py-2 text-center">{student.percentage.toFixed(1)}%</td>
                        <td className="px-3 py-2 text-center">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            student.grade === 'A+' ? 'text-green-700 bg-green-100' :
                            student.grade === 'A' ? 'text-blue-700 bg-blue-100' :
                            student.grade === 'B' ? 'text-orange-700 bg-orange-100' :
                            'text-red-700 bg-red-100'
                          }`}>
                            {student.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploadData.length === 0 || errors.length > 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Import {uploadData.length} Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkMarkEntry;