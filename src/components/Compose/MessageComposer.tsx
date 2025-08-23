import React, { useState, useEffect } from 'react';
import { Send, Calendar, Clock, Users, Mail, Phone, Filter, X, CheckCircle } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  email: string;
  phone: string;
}

interface Staff {
  id: string;
  name: string;
  type: 'teaching' | 'non-teaching';
  department: string;
  email: string;
  phone: string;
}

interface MessageComposerProps {
  students: Student[];
  staff: Staff[];
}

interface MessageData {
  recipients: (Student | Staff)[];
  subject: string;
  message: string;
  scheduledDate: string;
  scheduledTime: string;
  communicationMethods: {
    email: boolean;
    sms: boolean;
  };
}

const MessageComposer: React.FC<MessageComposerProps> = ({ students, staff }) => {
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedSections, setSections] = useState<string[]>([]);
  const [selectedStaffTypes, setSelectedStaffTypes] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [communicationMethods, setCommunicationMethods] = useState({
    email: true,
    sms: false
  });
  const [showFilters, setShowFilters] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Get unique grades and sections
  const grades = [...new Set(students.map(s => s.grade))].sort();
  const sections = [...new Set(students.map(s => s.section))].sort();

  // Filter recipients based on selections
  const getFilteredRecipients = (): (Student | Staff)[] => {
    const filteredStudents = students.filter(student => {
      const gradeMatch = selectedGrades.length === 0 || selectedGrades.includes(student.grade);
      const sectionMatch = selectedSections.length === 0 || selectedSections.includes(student.section);
      return gradeMatch && sectionMatch;
    });

    const filteredStaff = staff.filter(staffMember => {
      return selectedStaffTypes.length === 0 || selectedStaffTypes.includes(staffMember.type);
    });

    return [...filteredStudents, ...filteredStaff];
  };

  const recipients = getFilteredRecipients();

  const handleGradeToggle = (grade: string) => {
    setSelectedGrades(prev =>
      prev.includes(grade)
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const handleSectionToggle = (section: string) => {
    setSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleStaffTypeToggle = (type: string) => {
    setSelectedStaffTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || recipients.length === 0) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setMessage('');
      setSubject('');
      setScheduledDate('');
      setScheduledTime('');
    }, 3000);
  };

  const clearAllFilters = () => {
    setSelectedGrades([]);
    setSections([]);
    setSelectedStaffTypes([]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Send Message</h1>
            <p className="text-gray-600 mt-1">Compose and send messages to students and staff</p>
          </div>
          {/* <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Filters Section */}
        {showFilters && (
          <div className="lg:col-span-1 space-y-6">
            {/* Student Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Student Filters
                </h3>
              </div>

              {/* Grade Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Grades
                </label>
                <div className="flex flex-wrap gap-2">
                  {grades.map(grade => (
                    <button
                      key={grade}
                      onClick={() => handleGradeToggle(grade)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedGrades.includes(grade)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      Grade {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Sections
                </label>
                <div className="flex flex-wrap gap-2">
                  {sections.map(section => (
                    <button
                      key={section}
                      onClick={() => handleSectionToggle(section)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedSections.includes(section)
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      Section {section}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Staff Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Staff Filters
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleStaffTypeToggle('teaching')}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${selectedStaffTypes.includes('teaching')
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Teaching Staff
                </button>
                <button
                  onClick={() => handleStaffTypeToggle('non-teaching')}
                  className={`w-full px-4 py-3 rounded-lg text-left font-medium transition-all ${selectedStaffTypes.includes('non-teaching')
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Non-Teaching Staff
                </button>
              </div>
            </div>

            {/* Selected Recipients Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recipients</h3>
                {(selectedGrades.length > 0 || selectedSections.length > 0 || selectedStaffTypes.length > 0) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Total Recipients</span>
                  <span className="text-lg font-bold text-blue-600">{recipients.length}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Students</span>
                  <span className="text-sm font-medium text-gray-900">
                    {recipients.filter(r => 'grade' in r).length}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">Staff</span>
                  <span className="text-sm font-medium text-gray-900">
                    {recipients.filter(r => 'type' in r).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Message Composition */}
        <div className={showFilters ? 'lg:col-span-2' : 'lg:col-span-3'}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject and Scheduling */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Subject */}
                {/* <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter message subject..."
                  />
                </div> */}

                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    Schedule Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    Schedule Time
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Communication Methods */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Methods</h3>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={communicationMethods.email}
                    onChange={(e) => setCommunicationMethods(prev => ({
                      ...prev,
                      email: e.target.checked
                    }))}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <Mail className={`w-5 h-5 transition-colors ${communicationMethods.email ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    <span className={`font-medium transition-colors ${communicationMethods.email ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                      Email
                    </span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={communicationMethods.sms}
                    onChange={(e) => setCommunicationMethods(prev => ({
                      ...prev,
                      sms: e.target.checked
                    }))}
                    className="w-5 h-5 text-emerald-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-emerald-500"
                  />
                  <div className="flex items-center gap-2">
                    <Phone className={`w-5 h-5 transition-colors ${communicationMethods.sms ? 'text-emerald-600' : 'text-gray-400'
                      }`} />
                    <span className={`font-medium transition-colors ${communicationMethods.sms ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                      SMS
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Message Composition */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Message</h3>
                <span className="text-sm text-gray-500">
                  {message.length} / 1000 characters
                </span>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 1000))}
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Type your message here..."
                required
              />
            </div>

            {/* Send Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {scheduledDate && scheduledTime ? (
                    <span>Scheduled for {new Date(`${scheduledDate}T${scheduledTime}`).toLocaleString()}</span>
                  ) : (
                    <span>Message will be sent immediately</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!message.trim() || recipients.length === 0 || (!communicationMethods.email && !communicationMethods.sms) || isSubmitting}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full text-center transform animate-pulse">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600">
              Your message has been successfully sent to {recipients.length} recipients.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageComposer;