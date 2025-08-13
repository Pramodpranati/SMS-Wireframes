export interface Exam {
  id: string;
  title: string;
  subject: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  instructions?: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExamAssignment {
  id: string;
  examId: string;
  assignmentType: 'grade' | 'section' | 'school';
  targetId?: string; // grade/section ID, null for whole school
  targetName: string; // display name
  assignedBy: string;
  assignedAt: string;
}

export interface ExamWithAssignments extends Exam {
  assignments: ExamAssignment[];
  assignedCount: number;
}

export interface CreateExamData {
  title: string;
  subject: string;
  description?: string;
  date: string;
  duration:number;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
  instructions?: string;
  assignments: {
    type: 'grade' | 'section' | 'school';
    targetIds: string[];
  };
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
  studentCount: number;
}