import React, { useState } from 'react';
import { Search, User, GraduationCap, Briefcase, X } from 'lucide-react';

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

interface RecipientSelectorProps {
  students: Student[];
  staff: Staff[];
  selectedRecipients: (Student | Staff)[];
  onRecipientsChange: (recipients: (Student | Staff)[]) => void;
}

const RecipientSelector: React.FC<RecipientSelectorProps> = ({
  students,
  staff,
  selectedRecipients,
  onRecipientsChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'staff'>('students');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.includes(searchTerm) ||
    student.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staff.filter(staffMember =>
    staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staffMember.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleRecipient = (recipient: Student | Staff) => {
    const isSelected = selectedRecipients.some(r => r.id === recipient.id);
    
    if (isSelected) {
      onRecipientsChange(selectedRecipients.filter(r => r.id !== recipient.id));
    } else {
      onRecipientsChange([...selectedRecipients, recipient]);
    }
  };

  const isSelected = (recipient: Student | Staff) => {
    return selectedRecipients.some(r => r.id === recipient.id);
  };

  const removeRecipient = (recipientId: string) => {
    onRecipientsChange(selectedRecipients.filter(r => r.id !== recipientId));
  };

  return (
    <div className="space-y-6">
      {/* Selected Recipients */}
      {selectedRecipients.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Selected Recipients ({selectedRecipients.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedRecipients.map((recipient) => (
              <div
                key={recipient.id}
                className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg"
              >
                {'grade' in recipient ? (
                  <GraduationCap className="w-4 h-4" />
                ) : (
                  <Briefcase className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{recipient.name}</span>
                <button
                  onClick={() => removeRecipient(recipient.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipient Browser */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header with tabs */}
        <div className="border-b border-gray-200 p-6 pb-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Recipients</h3>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, grade, or department..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Tabs */}
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('students')}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                activeTab === 'students'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Students ({filteredStudents.length})
            </button>
            
            <button
              onClick={() => setActiveTab('staff')}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium text-sm transition-colors ${
                activeTab === 'staff'
                  ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Staff ({filteredStaff.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {activeTab === 'students' ? (
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => toggleRecipient(student)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    isSelected(student)
                      ? 'bg-blue-50 border-2 border-blue-200'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSelected(student) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-500">
                        Grade {student.grade} - Section {student.section}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected(student)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {isSelected(student) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              ))}
              
              {filteredStudents.length === 0 && (
                <p className="text-center text-gray-500 py-8">No students found</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredStaff.map((staffMember) => (
                <div
                  key={staffMember.id}
                  onClick={() => toggleRecipient(staffMember)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                    isSelected(staffMember)
                      ? 'bg-emerald-50 border-2 border-emerald-200'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSelected(staffMember) ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{staffMember.name}</h4>
                      <p className="text-sm text-gray-500">
                        {staffMember.department} • {staffMember.type === 'teaching' ? 'Teaching' : 'Non-Teaching'}
                      </p>
                    </div>
                  </div>
                  
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected(staffMember)
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-gray-300'
                  }`}>
                    {isSelected(staffMember) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                </div>
              ))}
              
              {filteredStaff.length === 0 && (
                <p className="text-center text-gray-500 py-8">No staff found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesApp;