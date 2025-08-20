import React, { useState, useEffect } from 'react';
import { Search, Users, MessageCircle, Send, MoreVertical } from 'lucide-react';
import StudentList from './StudentList';
import ChatWindow from './ChatWindow';
import { ChatRoom, Student, TeacherAssignment } from '../../types/Message';

// Mock data - In real app, this would come from API
const mockTeacherAssignments: TeacherAssignment = {
  teacherId: 'teacher-1',
  teacherName: 'John Smith',
  classes: [
    { grade: '10', section: 'A', subject: 'Mathematics' },
    { grade: '10', section: 'B', subject: 'Mathematics' },
    { grade: '9', section: 'A', subject: 'Physics' }
  ],
  subjects: ['Mathematics', 'Physics']
};

const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Alice Johnson Grade 11',
    email: 'alice.johnson@school.edu',
    class: '10',
    section: 'A',
    rollNumber: '101',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150'
  },
  {
    id: 'student-2',
    name: 'Bob Wilson Grade 9',
    email: 'bob.wilson@school.edu',
    class: '10',
    section: 'A',
    rollNumber: '102'
  },
  {
    id: 'student-3',
    name: 'Carol Davis Grade 11',
    email: 'carol.davis@school.edu',
    class: '10',
    section: 'B',
    rollNumber: '103',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150'
  },
  {
    id: 'student-4',
    name: 'Shamila Grade 10',
    email: 'david.brown@school.edu',
    class: '9',
    section: 'A',
    rollNumber: '201'
  },
  {
    id: 'student-5',
    name: 'Ravi Grade 10',
    email: 'emma.taylor@school.edu',
    class: '10',
    section: 'A',
    rollNumber: '104',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150'
  },
  {
    id: 'Group Grade 10',
    name: 'Group Grade 10',
    email: 'emma.taylor@school.edu',
    class: '10',
    section: 'A',
    rollNumber: '104',
    avatar: ''
  }
];

const mockChatRooms: ChatRoom[] = [
  {
    id: 'room-1',
    teacherId: 'teacher-1',
    studentId: 'student-1',
    teacherName: 'John Smith',
    studentName: 'Alice Johnson',
    studentClass: '10',
    studentSection: 'A',
    unreadCount: 2,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    lastMessage: {
      id: 'msg-1',
      senderId: 'student-1',
      receiverId: 'teacher-1',
      content: 'Thank you for explaining the quadratic equations!',
      timestamp: new Date('2024-01-20T10:30:00'),
      read: false,
      messageType: 'text'
    }
  },
  {
    id: 'room-2',
    teacherId: 'teacher-1',
    studentId: 'student-3',
    teacherName: 'John Smith',
    studentName: 'Carol Davis',
    studentClass: '10',
    studentSection: 'B',
    unreadCount: 0,
    isActive: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-19'),
    lastMessage: {
      id: 'msg-2',
      senderId: 'teacher-1',
      receiverId: 'student-3',
      content: 'Please submit your homework by tomorrow.',
      timestamp: new Date('2024-01-19T15:45:00'),
      read: true,
      messageType: 'text'
    }
  }
];

const MessagesPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(mockChatRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [isMobileView, setIsMobileView] = useState(false);
  const [showStudentList, setShowStudentList] = useState(true);

  // Filter students based on teacher's assignments
  const assignedStudents = mockStudents.filter(student => {
    return mockTeacherAssignments.classes.some(
      assignment => assignment.grade === student.class && assignment.section === student.section
    );
  });

  // Filter students based on search and class selection
  const filteredStudents = assignedStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.includes(searchTerm);
    const matchesClass = selectedClass === 'all' || 
                        `${student.class}-${student.section}` === selectedClass;
    
    return matchesSearch && matchesClass;
  });

  // Get unique classes for filter dropdown
  const assignedClasses = Array.from(
    new Set(
      mockTeacherAssignments.classes.map(c => `${c.grade}-${c.section}`)
    )
  );

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    if (window.innerWidth < 768) {
      setShowStudentList(false);
    }
  };

  const handleBackToList = () => {
    setShowStudentList(true);
    setSelectedStudent(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowStudentList(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Student List Sidebar */}
      <div className={`${
        isMobileView && !showStudentList ? 'hidden' : 'block'
      } w-full md:w-80 bg-white border-r border-gray-200 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900 flex items-center">
              <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
              Messages
            </h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Class Filter */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="All Groups">Groups</option>
            {/* {assignedClasses.map(classCode => (
              <option key={classCode} value={classCode}>
                Class {classCode.replace('-', ' - Section ')}
              </option>
            ))} */}
          </select>
        </div>

        {/* Teacher Assignment Info */}
        <div className="p-3 bg-blue-50 border-b border-gray-200">
          <div className="text-sm text-blue-800">
            <div className="font-medium">Your Classes:</div>
            <div className="text-blue-600">
              {mockTeacherAssignments.classes.map(c => 
                `${c.grade}${c.section}`
              ).join(', ')}
            </div>
          </div>
        </div>

        {/* Students List */}
        <StudentList
          students={filteredStudents}
          chatRooms={chatRooms}
          selectedStudent={selectedStudent}
          onStudentSelect={handleStudentSelect}
        />
      </div>

      {/* Chat Window */}
      <div className={`${
        isMobileView && showStudentList ? 'hidden' : 'flex'
      } flex-1 flex flex-col h-full`}>
        {selectedStudent ? (
          <ChatWindow
            student={selectedStudent}
            teacherAssignments={mockTeacherAssignments}
            onBack={isMobileView ? handleBackToList : undefined}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a Student to Start Messaging
              </h3>
              <p className="text-gray-500 max-w-sm">
                Choose a student from your assigned classes to begin a conversation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;