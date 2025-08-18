import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Phone, Video, MoreVertical, Send, Paperclip, Smile } from 'lucide-react';
import { Student, TeacherAssignment, Message, MessageThread } from '../../types/Message';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

interface ChatWindowProps {
  student: Student;
  teacherAssignments: TeacherAssignment;
  onBack?: () => void;
}

// Mock messages for demonstration
const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'teacher-1',
    receiverId: 'student-1',
    content: 'Hi Alice! I noticed you missed yesterday\'s class. Do you need help with the quadratic equations we covered?',
    timestamp: new Date('2024-01-20T09:00:00'),
    read: true,
    messageType: 'text'
  },
  {
    id: 'msg-2',
    senderId: 'student-1',
    receiverId: 'teacher-1',
    content: 'Yes sir, I was not feeling well. Could you please explain the discriminant part again?',
    timestamp: new Date('2024-01-20T09:15:00'),
    read: true,
    messageType: 'text'
  },
  {
    id: 'msg-3',
    senderId: 'teacher-1',
    receiverId: 'student-1',
    content: 'Of course! The discriminant is b² - 4ac. It helps us determine the nature of roots. If it\'s positive, we have two real roots. If zero, one real root. If negative, no real roots.',
    timestamp: new Date('2024-01-20T09:18:00'),
    read: true,
    messageType: 'text'
  },
  {
    id: 'msg-4',
    senderId: 'student-1',
    receiverId: 'teacher-1',
    content: 'Thank you for explaining! That makes it much clearer. I\'ll practice some problems now.',
    timestamp: new Date('2024-01-20T09:22:00'),
    read: true,
    messageType: 'text'
  },
  {
    id: 'msg-5',
    senderId: 'student-1',
    receiverId: 'teacher-1',
    content: 'Thank you for explaining the quadratic equations!',
    timestamp: new Date('2024-01-20T10:30:00'),
    read: false,
    messageType: 'text'
  }
];

const ChatWindow: React.FC<ChatWindowProps> = ({
  student,
  teacherAssignments,
  onBack
}) => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentTeacherId = teacherAssignments.teacherId;

  // Get teacher's subject for this student's class
  const teacherSubject = teacherAssignments.classes.find(
    c => c.grade === student.class && c.section === student.section
  )?.subject;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentTeacherId,
      receiverId: student.id,
      content,
      timestamp: new Date(),
      read: false,
      messageType: 'text'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate typing indicator for student response (demo only)
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate a student reply (in real app, this would come via websocket/polling)
        if (Math.random() > 0.7) {
          const responses = [
            "Thank you, sir!",
            "Got it, thanks for clarifying!",
            "I'll work on that.",
            "Understood, thank you for your help!",
            "I'll review this and get back to you if I have questions."
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          const studentReply: Message = {
            id: `msg-${Date.now()}-student`,
            senderId: student.id,
            receiverId: currentTeacherId,
            content: randomResponse,
            timestamp: new Date(),
            read: false,
            messageType: 'text'
          };
          
          setMessages(prev => [...prev, studentReply]);
        }
      }, 2000);
    }, 1000);
  };

  const formatTime = (timestamp: Date): string => {
    return timestamp.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          
          <div className="relative">
            {student.avatar ? (
              <img
                src={student.avatar}
                alt={student.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-medium">
                  {student.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">{student.name}</h2>
            <p className="text-sm text-gray-500">
              Class {student.class}{student.section} • {teacherSubject} • Online
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Phone className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Video className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => {
          const isLastMessage = index === messages.length - 1;
          const isNextMessageFromSameSender = 
            index < messages.length - 1 && 
            messages[index + 1].senderId === message.senderId;
          const isPreviousMessageFromSameSender = 
            index > 0 && 
            messages[index - 1].senderId === message.senderId;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={message.senderId === currentTeacherId}
              showAvatar={!isNextMessageFromSameSender}
              showTimestamp={!isNextMessageFromSameSender || isLastMessage}
              senderName={message.senderId === currentTeacherId ? 'You' : student.name}
              senderAvatar={message.senderId === currentTeacherId ? undefined : student.avatar}
            />
          );
        })}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">
                {student.name.charAt(0)}
              </span>
            </div>
            <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;