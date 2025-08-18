export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  messageType: 'text' | 'file' | 'image';
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
}

export interface ChatRoom {
  id: string;
  teacherId: string;
  studentId: string;
  teacherName: string;
  studentName: string;
  studentClass: string;
  studentSection: string;
  lastMessage?: Message;
  unreadCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherAssignment {
  teacherId: string;
  teacherName: string;
  classes: ClassAssignment[];
  subjects: string[];
}

export interface ClassAssignment {
  grade: string;
  section: string;
  subject: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  section: string;
  rollNumber: string;
  avatar?: string;
}

export interface MessageThread {
  roomId: string;
  messages: Message[];
  participants: {
    teacher: {
      id: string;
      name: string;
      avatar?: string;
    };
    student: {
      id: string;
      name: string;
      class: string;
      section: string;
      avatar?: string;
    };
  };
}