import { 
  ExportConfig, 
  downloadCSV, 
  generatePDF,
  getStudentDetailsHeaders,
  getMarksheetHeaders,
  formatStudentForExport,
  formatMarksheetForExport
} from './ExportFormats';

export interface ExportOptions {
  type: 'student-details' | 'marksheet';
  format: 'pdf' | 'csv';
  data: any[];
  filename?: string;
  filters?: {
    grades?: string[];
    sections?: string[];
  };
}

export const exportData = async (options: ExportOptions): Promise<void> => {
  const { type, format, data, filename, filters } = options;
  
  // Generate filename if not provided
  const defaultFilename = `${type}_${format}_${new Date().toISOString().split('T')[0]}`;
  const exportFilename = filename || defaultFilename;
  
  // Prepare headers based on export type
  const headers = type === 'student-details' 
    ? getStudentDetailsHeaders() 
    : getMarksheetHeaders();
  
  // Format data for export
  const formattedData = data.map(item => 
    type === 'student-details' 
      ? formatStudentForExport(item)
      : formatMarksheetForExport(item)
  );
  
  // Create export configuration
  const config: ExportConfig = {
    filename: exportFilename,
    headers,
    data: formattedData,
    format,
    title: type === 'student-details' ? 'Student Details Report' : 'Marksheet Report',
    subtitle: filters ? `Filtered by: ${filters.grades?.join(', ')} - ${filters.sections?.join(', ')}` : 'All Records'
  };
  
  // Execute export based on format
  if (format === 'csv') {
    downloadCSV(config);
  } else {
    await generatePDF(config);
  }
};

export const validateExportOptions = (options: ExportOptions): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!options.data || options.data.length === 0) {
    errors.push('No data available for export');
  }
  
  if (!['student-details', 'marksheet'].includes(options.type)) {
    errors.push('Invalid export type');
  }
  
  if (!['pdf', 'csv'].includes(options.format)) {
    errors.push('Invalid export format');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const getExportSummary = (data: any[], type: 'student-details' | 'marksheet') => {
  if (type === 'student-details') {
    const gradeDistribution = data.reduce((acc: Record<string, number>, student: any) => {
      acc[student.grade] = (acc[student.grade] || 0) + 1;
      return acc;
    }, {});
    
    return {
      totalRecords: data.length,
      gradeDistribution,
      sections: [...new Set(data.map((s: any) => s.section))].length
    };
  } else {
    const avgPercentage = data.reduce((sum: number, m: any) => sum + m.percentage, 0) / data.length;
    const passCount = data.filter((m: any) => m.result === 'Pass').length;
    
    return {
      totalRecords: data.length,
      averagePercentage: avgPercentage.toFixed(2),
      passRate: ((passCount / data.length) * 100).toFixed(1)
    };
  }
};