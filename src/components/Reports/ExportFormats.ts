export interface ExportConfig {
  filename: string;
  headers: string[];
  data: any[];
  format: 'pdf' | 'csv';
  title?: string;
  subtitle?: string;
}

export const generateCSV = (config: ExportConfig): string => {
  const { headers, data } = config;

  let csv = headers.join(',') + '\n';

  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header.toLowerCase().replace(/\s+/g, '')];
      // Escape commas and quotes in CSV
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value || '';
    });
    csv += values.join(',') + '\n';
  });

  return csv;
};

export const downloadCSV = (config: ExportConfig): void => {
  const csv = generateCSV(config);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${config.filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generatePDF = async (config: ExportConfig): Promise<void> => {
  // In a real implementation, you would use a library like jsPDF or react-pdf
  // For now, we'll simulate PDF generation

  const { filename, title, subtitle, headers, data } = config;

  // Create a simple HTML table for PDF conversion
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title || 'Report'}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .title { font-size: 24px; font-weight: bold; color: #1e293b; margin-bottom: 5px; }
        .subtitle { font-size: 16px; color: #64748b; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
        th { background-color: #f8fafc; font-weight: bold; }
        .footer { margin-top: 30px; text-align: center; color: #64748b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="title">${title || 'School Report'}</div>
        <div class="subtitle">${subtitle || 'Generated on ' + new Date().toLocaleDateString()}</div>
      </div>
      
      <table>
        <thead>
          <tr>
            ${headers.map(header => `<th>${header}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              ${headers.map(header => {
    const key = header.toLowerCase().replace(/\s+/g, '');
    return `<td>${row[key] || ''}</td>`;
  }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="footer">
        Report generated on ${new Date().toLocaleString()}
      </div>
    </body>
    </html>
  `;

  // In a real implementation, convert HTML to PDF using libraries like:
  // - html2pdf.js
  // - jsPDF with html2canvas
  // - react-pdf

  console.log('PDF would be generated with content:', htmlContent);

  // Simulate download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.html`; // In real implementation, this would be .pdf
  link.click();
};

export const getStudentDetailsHeaders = (): string[] => [
  'Student ID',
  'Name',
  'Grade',
  'Section',
  'Email',
  'Phone',
  'Date of Birth',
  'Guardian Name',
  'Guardian Phone',
  'Address'
];

export const getMarksheetHeaders = (): string[] => [
  'Student ID',
  'Student Name',
  'Grade',
  'Section',
  'Exam Type',
  'Exam Date',
  'Total Marks',
  'Percentage',
  'Result'
];

export const formatStudentForExport = (student: any) => ({
  studentid: student.studentId,
  name: student.name,
  grade: student.grade,
  section: student.section,
  email: student.email,
  phone: student.phone,
  dateofbirth: student.dateOfBirth,
  guardianname: student.guardianName,
  guardianphone: student.guardianPhone,
  address: student.address
});

export const formatMarksheetForExport = (marksheet: any) => ({
  studentid: marksheet.studentId,
  studentname: marksheet.studentName,
  grade: marksheet.grade,
  section: marksheet.section,
  examtype: marksheet.examType,
  examdate: marksheet.examDate,
  totalmarks: marksheet.totalMarks,
  percentage: `${marksheet.percentage}%`,
  result: marksheet.result
});