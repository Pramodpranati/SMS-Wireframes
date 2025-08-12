export interface User {
  id: string;
  name: string;
  email: string;
  role: 'system_admin' | 'management' | 'teacher' | 'student' | 'parent';
  avatar?: string;
}

export interface Grade {
  id: string;
  name: string;
  sections: Section[];
}

export interface Section {
  id: string;
  name: string;
  gradeId: string;
  roomNumber: string;
  students: Student[];
}

export interface Student {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  class: string;
  section: string;
  rollNumber: string;
  admissionDate: string;
  bloodGroup?: string;
  medicalConditions?: string;
  emergencyContact: string;
  status: 'active' | 'inactive' | 'graduated' | 'transferred';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  type: 'period' | 'break' | 'lunch';
  periodNumber?: number;
}

export interface TimeTableEntry {
  id: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
  timeSlotId: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  session: 'morning' | 'afternoon';
  status: 'present' | 'absent';
  markedBy: string;
}

export interface SchoolSettings {
  contactInfo: any;
  name: string;
  address: string;
  contactNumber: string;
  workingDays: boolean[]; // Index 0 = Sunday, 1 = Monday, etc.
  startTime: string;
  endTime: string;
  periodDuration: number; // in minutes
  intervalDuration: number; // in minutes
  lunchBreakDuration: number; // in minutes
  lunchBreakStart: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  roles: User['role'][];
  children?: NavigationItem[];
}