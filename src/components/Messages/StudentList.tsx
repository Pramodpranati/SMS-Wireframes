import React from 'react';
import { Student, ChatRoom } from '../../types/Message';

interface StudentListProps {
  students: Student[];
  chatRooms: ChatRoom[];
  selectedStudent: Student | null;
  onStudentSelect: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({
  students,
  chatRooms,
  selectedStudent,
  onStudentSelect
}) => {
  const getStudentChatRoom = (studentId: string): ChatRoom | undefined => {
    return chatRooms.find(room => room.studentId === studentId);
  };

  const formatLastMessageTime = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = diff / (1000 * 60 * 60);
    const days = diff / (1000 * 60 * 60 * 24);

    if (hours < 24) {
      return timestamp.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (days < 7) {
      return timestamp.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return timestamp.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (students.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center text-gray-500">
          <p>No students found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {students.map(student => {
        const chatRoom = getStudentChatRoom(student.id);
        const isSelected = selectedStudent?.id === student.id;
        
        return (
          <div
            key={student.id}
            onClick={() => onStudentSelect(student)}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
              isSelected 
                ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="relative">
                {student.avatar ? (
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                )}
                
                {/* Online indicator (for demo - you'd implement real presence) */}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              {/* Student Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate">
                    {student.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    {chatRoom?.lastMessage && (
                      <span className="text-xs text-gray-500">
                        {formatLastMessageTime(chatRoom.lastMessage.timestamp)}
                      </span>
                    )}
                    {chatRoom && chatRoom.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full min-w-[1.25rem] text-center">
                        {chatRoom.unreadCount > 99 ? '99+' : chatRoom.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-500">
                    Class {student.class}{student.section} • Roll #{student.rollNumber}
                  </p>
                </div>

                {/* Last Message Preview */}
                {chatRoom?.lastMessage && (
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {chatRoom.lastMessage.senderId === student.id ? '' : 'You: '}
                    {chatRoom.lastMessage.content}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StudentList;