export interface LeaveApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantType: 'student' | 'staff';
  leaveType: 'sick' | 'personal' | 'emergency' | 'vacation' | 'medical' | 'family';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  assignedTo?: string;
  assignedToName?: string;
  comments?: string;
  attachments?: string[];
  
  // Student specific fields
  className?: string;
  admissionNumber?: string;
  
  // Staff specific fields
  department?: string;
  designation?: string;
  employeeId?: string;
}

export interface LeaveStats {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
}

export interface ClassTeacher {
  id: string;
  name: string;
  className: string;
  email: string;
}

export interface Management {
  id: string;
  name: string;
  designation: string;
  email: string;
}