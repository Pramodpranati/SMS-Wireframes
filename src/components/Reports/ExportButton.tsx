import React, { useState } from 'react';
import { Download, FileText, Table } from 'lucide-react';
import { exportData, validateExportOptions } from './ExportUtils';

interface ExportButtonProps {
  data: any[];
  type: 'student-details' | 'marksheet';
  className?: string;
  variant?: 'default' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  filters?: {
    grades?: string[];
    sections?: string[];
  };
}

const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  type,
  className = '',
  variant = 'default',
  size = 'md',
  filters
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showFormats, setShowFormats] = useState(false);

  const handleExport = async (format: 'pdf' | 'csv') => {
    setIsExporting(true);
    setShowFormats(false);

    const options = {
      type,
      format,
      data,
      filters
    };

    const validation = validateExportOptions(options);

    if (!validation.isValid) {
      alert(`Export failed: ${validation.errors.join(', ')}`);
      setIsExporting(false);
      return;
    }

    try {
      await exportData(options);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const buttonSizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const buttonVariants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    minimal: 'text-blue-600 hover:bg-blue-50'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFormats(!showFormats)}
        disabled={isExporting || data.length === 0}
        className={`
          inline-flex items-center gap-2 rounded-lg font-medium transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${buttonSizes[size]}
          ${buttonVariants[variant]}
          ${className}
        `}
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'Exporting...' : 'Export'}
      </button>

      {showFormats && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10 min-w-[160px]">
          <button
            onClick={() => handleExport('pdf')}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <FileText className="w-4 h-4 text-red-500" />
            Export as PDF
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Table className="w-4 h-4 text-green-500" />
            Export as CSV
          </button>
        </div>
      )}

      {showFormats && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setShowFormats(false)}
        />
      )}
    </div>
  );
};

export default ExportButton;