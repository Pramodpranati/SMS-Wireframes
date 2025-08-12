import React, { useState } from 'react';
import { Calendar, FileText, User, Briefcase, Clock, Upload } from 'lucide-react';
import { LeaveApplication } from '../../types/Leave';

interface StaffLeaveFormProps {
  onSubmit: (application: Omit<LeaveApplication, 'id' | 'appliedDate' | 'status'>) => void;
}

const StaffLeaveForm: React.FC<StaffLeaveFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    employeeId: '',
    department: '',
    designation: '',
    leaveType: 'personal' as const,
    startDate: '',
    endDate: '',
    reason: '',
    attachments: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const leaveTypes = [
    { value: 'personal', label: 'Personal Leave', icon: '👤' },
    { value: 'sick', label: 'Sick Leave', icon: '🤒' },
    { value: 'vacation', label: 'Vacation', icon: '🏖️' },
    { value: 'emergency', label: 'Emergency', icon: '🚨' },
    { value: 'medical', label: 'Medical Leave', icon: '🏥' },
    { value: 'family', label: 'Family Leave', icon: '👨‍👩‍👧‍👦' },
  ];

  const departments = [
    'Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science',
    'Physical Education', 'Arts', 'Music', 'Administration', 'Counseling',
    'Library', 'Laboratory', 'Maintenance', 'Security'
  ];

  const designations = [
    'Principal', 'Vice Principal', 'Head of Department', 'Senior Teacher',
    'Teacher', 'Assistant Teacher', 'Lab Assistant', 'Librarian',
    'Counselor', 'Administrative Officer', 'Clerk', 'Security Guard',
    'Maintenance Staff'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Full name is required';
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.designation) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'End date must be after start date';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason is required';
    }

    if (formData.reason.trim().length < 10) {
      newErrors.reason = 'Please provide a detailed reason (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Assign to management based on leave type and designation
      const managementAssignment = {
        id: 'ADM001',
        name: 'Principal Dr. Anderson'
      };

      onSubmit({
        applicantId: formData.employeeId,
        applicantName: formData.applicantName,
        applicantType: 'staff',
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        department: formData.department,
        designation: formData.designation,
        employeeId: formData.employeeId,
        assignedTo: managementAssignment.id,
        assignedToName: managementAssignment.name,
        attachments: formData.attachments,
      });

      // Reset form
      setFormData({
        applicantName: '',
        employeeId: '',
        department: '',
        designation: '',
        leaveType: 'personal',
        startDate: '',
        endDate: '',
        reason: '',
        attachments: [],
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const fileNames = files.map(file => file.name);
    setFormData({ ...formData, attachments: [...formData.attachments, ...fileNames] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline h-4 w-4 mr-1" />
            Full Name
          </label>
          <input
            type="text"
            value={formData.applicantName}
            onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.applicantName ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
            placeholder="Enter your full name"
          />
          {errors.applicantName && (
            <p className="text-red-500 text-sm mt-1">{errors.applicantName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="inline h-4 w-4 mr-1" />
            Employee ID
          </label>
          <input
            type="text"
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.employeeId ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
            placeholder="Enter employee ID"
          />
          {errors.employeeId && (
            <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.department ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1">{errors.department}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
          <select
            value={formData.designation}
            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.designation ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
          >
            <option value="">Select Designation</option>
            {designations.map((designation) => (
              <option key={designation} value={designation}>{designation}</option>
            ))}
          </select>
          {errors.designation && (
            <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
          )}
        </div>
      </div>

      {/* Leave Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Leave Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {leaveTypes.map((type) => (
            <label
              key={type.value}
              className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                formData.leaveType === type.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="leaveType"
                value={type.value}
                checked={formData.leaveType === type.value}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value as any })}
                className="sr-only"
              />
              <span className="text-2xl mr-3">{type.icon}</span>
              <span className="text-sm font-medium">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.startDate ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline h-4 w-4 mr-1" />
            End Date
          </label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            min={formData.startDate || new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.endDate ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Reason */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline h-4 w-4 mr-1" />
          Detailed Reason
        </label>
        <textarea
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          rows={5}
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
            errors.reason ? 'border-red-500 ring-2 ring-red-200' : ''
          }`}
          placeholder="Please provide a comprehensive reason for your leave request, including any relevant details..."
        />
        {errors.reason && (
          <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
        )}
        <p className="text-gray-500 text-xs mt-1">
          Minimum 10 characters required. Current: {formData.reason.length}
        </p>
      </div>

      {/* Attachments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Upload className="inline h-4 w-4 mr-1" />
          Supporting Documents (Optional)
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Click to upload supporting documents
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOC, DOCX, JPG, PNG up to 5MB each
            </p>
          </label>
        </div>
        
        {formData.attachments.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-gray-700">Uploaded files:</p>
            {formData.attachments.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="text-sm text-gray-700">{file}</span>
                <button
                  type="button"
                  onClick={() => setFormData({
                    ...formData,
                    attachments: formData.attachments.filter((_, i) => i !== index)
                  })}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <Clock className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Application Process</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Your leave application will be forwarded to the management for approval.</p>
              <p className="mt-1">Processing time: 2-3 business days for regular leaves, 24 hours for emergency requests.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={() => setFormData({
            applicantName: '',
            employeeId: '',
            department: '',
            designation: '',
            leaveType: 'personal',
            startDate: '',
            endDate: '',
            reason: '',
            attachments: [],
          })}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Clear Form
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
        >
          <Clock className="h-4 w-4" />
          <span>Submit Application</span>
        </button>
      </div>
    </form>
  );
};

export default StaffLeaveForm;