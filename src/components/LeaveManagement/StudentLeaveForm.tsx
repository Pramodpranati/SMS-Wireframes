import React, { useState } from 'react';
import { Calendar, FileText, User, GraduationCap, Clock, Upload } from 'lucide-react';
import { LeaveApplication } from '../../types/Leave';

interface StudentLeaveFormProps {
  onSubmit: (application: Omit<LeaveApplication, 'id' | 'appliedDate' | 'status'>) => void;
}

const StudentLeaveForm: React.FC<StudentLeaveFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    className: '',
    admissionNumber: '',
    leaveType: 'sick' as const,
    startDate: '',
    endDate: '',
    reason: '',
    emergencyContact: '',
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

  const classes = [
    'Pre-KG', 'LKG', 'UKG', '1-A', '1-B', '2-A', '2-B', '3-A', '3-B',
    '4-A', '4-B', '5-A', '5-B', '6-A', '6-B', '7-A', '7-B', '8-A', '8-B',
    '9-A', '9-B', '9-C', '10-A', '10-B', '10-C', '11-Science', '11-Commerce',
    '11-Arts', '12-Science', '12-Commerce', '12-Arts'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.applicantName.trim()) {
      newErrors.applicantName = 'Student name is required';
    }

    if (!formData.className) {
      newErrors.className = 'Class is required';
    }

    if (!formData.admissionNumber.trim()) {
      newErrors.admissionNumber = 'Admission number is required';
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Assign to class teacher based on class
      const classTeacherAssignment = {
        'Pre-KG': { id: 'TCH001', name: 'Mrs. Sarah Johnson' },
        'LKG': { id: 'TCH002', name: 'Ms. Emma Wilson' },
        'UKG': { id: 'TCH003', name: 'Mrs. Lisa Anderson' },
        '1-A': { id: 'TCH004', name: 'Mr. David Smith' },
        '1-B': { id: 'TCH005', name: 'Mrs. Jennifer Brown' },
        // Add more class teacher mappings as needed
      };

      const assignedTeacher = classTeacherAssignment[formData.className as keyof typeof classTeacherAssignment]
        || { id: 'TCH001', name: 'Mrs. Sarah Johnson' }; // Default assignment

      onSubmit({
        applicantId: `STU${Date.now()}`,
        applicantName: formData.applicantName,
        applicantType: 'student',
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
        className: formData.className,
        admissionNumber: formData.admissionNumber,
        assignedTo: assignedTeacher.id,
        assignedToName: assignedTeacher.name,
      });

      // Reset form
      setFormData({
        applicantName: '',
        className: '',
        admissionNumber: '',
        leaveType: 'sick',
        startDate: '',
        endDate: '',
        reason: '',
        emergencyContact: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Student Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline h-4 w-4 mr-1" />
            Name
          </label>
          <input
            type="text"
            value={formData.applicantName}
            onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.applicantName ? 'border-red-500 ring-2 ring-red-200' : ''
              }`}
            placeholder="Enter student's full name"
          />
          {errors.applicantName && (
            <p className="text-red-500 text-sm mt-1">{errors.applicantName}</p>
          )}
        </div>

        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="inline h-4 w-4 mr-1" />
            Class
          </label>
          <select
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.className ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
          {errors.className && (
            <p className="text-red-500 text-sm mt-1">{errors.className}</p>
          )}
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline h-4 w-4 mr-1" />
            Staff ID/Admission No
          </label>
          <input
            type="text"
            value={formData.admissionNumber}
            onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.admissionNumber ? 'border-red-500 ring-2 ring-red-200' : ''
              }`}
            placeholder="Enter admission number"
          />
          {errors.admissionNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.admissionNumber}</p>
          )}
        </div>
      </div>


      {/* Leave Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Leave Type</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
              <span className="text-2xl mr-2">{type.icon}</span>
              <span className="text-sm font-medium">{type.label}</span>
            </label>
          ))}
        </div>
      </div>
      {/* <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <FileText className="inline h-4 w-4 mr-1" />
          Leave Type
        </label>
        <input
          type="text"
          className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.applicantName ? 'border-red-500 ring-2 ring-red-200' : ''
            }`}
          placeholder="Enter leave type"
        />
        <select

          className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 ${errors.subject ? 'border-red-300' : 'border-gray-300'
            }`}
        >
          <option>Sick / Medical Leave</option>
          <option>Family Emergency</option>
          <option>Personal Reasons</option>
          <option>Religious Holiday / Observance</option>
          <option>Marriage / Wedding Leave</option>
          <option>Maternity / Paternity Leave</option>
        </select>
      </div> */}

      {/* Date Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 ">
            <Calendar className="inline h-4 w-4 mr-1" />
            Start Date
     
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.startDate ? 'border-red-500 ring-2 ring-red-200' : ''
              }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            
          )}
                 <div className='flex flex-row gap-5'>
             <div className="flex gap-4 mt-3">
              <label className="flex flex-row gap-2">
              <input
                type="radio"
                name="startPeriod"
                value="AM"
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              FN
            </label>
            </div>
             <div className="flex gap-4 mt-3">
              <label className="flex flex-row gap-2">
              <input
                type="radio"
                name="startPeriod"
                value="AM"
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              AN
            </label>
            </div>
            </div>
         

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
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.endDate ? 'border-red-500 ring-2 ring-red-200' : ''
                }`}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
            )}
            <div className='flex flex-row gap-5'>
             <div className="flex gap-4 mt-3">
              <label className="flex flex-row gap-2">
              <input
                type="radio"
                name="endPeriod"
                value="AM"
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              FN
            </label>
            </div>
             <div className="flex gap-4 mt-3">
              <label className="flex flex-row gap-2">
              <input
                type="radio"
                name="endPeriod"
                value="AM"
                className="h-4 w-4 text-blue-600 border-gray-300"
              />
              AN
            </label>
            </div>
            </div>
          </div>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline h-4 w-4 mr-1" />
            Reason for Leave
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            rows={4}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${errors.reason ? 'border-red-500 ring-2 ring-red-200' : ''
              }`}
            placeholder="Please provide a detailed reason for your leave request..."
          />
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
          )}
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Contact (Optional)
          </label>
          <input
            type="tel"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Parent/Guardian contact number"
          />
        </div>
          <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Documents (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="community-cert"
                  />
                  <label
                    htmlFor="community-cert"
                    className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors duration-200"
                  >
                    Choose File
                  </label>
                
                </div>
              </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => setFormData({
              applicantName: '',
              className: '',
              admissionNumber: '',
              leaveType: 'sick',
              startDate: '',
              endDate: '',
              reason: '',
              emergencyContact: '',
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

export default StudentLeaveForm;