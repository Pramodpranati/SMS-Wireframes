import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface LeaveApplication {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  leaveType: 'sick' | 'personal' | 'emergency' | 'family';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  documents?: string[];
  teacherId?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface ExamDuty {
  id: string;
  examName: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  assignedTeacherId?: string;
  assignedTeacherName?: string;
  status: 'unassigned' | 'assigned' | 'completed';
  studentCount: number;
  requirements: string[];
}

export interface ExtraDuty {
  id: string;
  absentTeacherId: string;
  absentTeacherName: string;
  subject: string;
  class: string;
  date: string;
  period: string;
  coverTeacherId?: string;
  coverTeacherName?: string;
  status: 'pending' | 'assigned' | 'completed';
  priority: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface TaskSummary {
  pendingLeaveApprovals: number;
  upcomingExamDuties: number;
  pendingExtraDuties: number;
  totalTasks: number;
}

interface TeacherTaskState {
  leaveApplications: LeaveApplication[];
  examDuties: ExamDuty[];
  extraDuties: ExtraDuty[];
  taskSummary: TaskSummary;
  loading: boolean;
}

type TeacherTaskAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_LEAVE_APPLICATIONS'; payload: LeaveApplication[] }
  | { type: 'SET_EXAM_DUTIES'; payload: ExamDuty[] }
  | { type: 'SET_EXTRA_DUTIES'; payload: ExtraDuty[] }
  | { type: 'UPDATE_LEAVE_STATUS'; payload: { id: string; status: 'approved' | 'rejected'; teacherId: string } }
  | { type: 'ASSIGN_EXAM_DUTY'; payload: { id: string; teacherId: string; teacherName: string } }
  | { type: 'ASSIGN_EXTRA_DUTY'; payload: { id: string; teacherId: string; teacherName: string } };

const initialState: TeacherTaskState = {
  leaveApplications: [],
  examDuties: [],
  extraDuties: [],
  taskSummary: {
    pendingLeaveApprovals: 0,
    upcomingExamDuties: 0,
    pendingExtraDuties: 0,
    totalTasks: 0,
  },
  loading: false,
};

function teacherTaskReducer(state: TeacherTaskState, action: TeacherTaskAction): TeacherTaskState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_LEAVE_APPLICATIONS':
      return { ...state, leaveApplications: action.payload };
    
    case 'SET_EXAM_DUTIES':
      return { ...state, examDuties: action.payload };
    
    case 'SET_EXTRA_DUTIES':
      return { ...state, extraDuties: action.payload };
    
    case 'UPDATE_LEAVE_STATUS':
      return {
        ...state,
        leaveApplications: state.leaveApplications.map(app =>
          app.id === action.payload.id
            ? { ...app, status: action.payload.status, teacherId: action.payload.teacherId }
            : app
        ),
      };
    
    case 'ASSIGN_EXAM_DUTY':
      return {
        ...state,
        examDuties: state.examDuties.map(duty =>
          duty.id === action.payload.id
            ? { 
                ...duty, 
                assignedTeacherId: action.payload.teacherId,
                assignedTeacherName: action.payload.teacherName,
                status: 'assigned' 
              }
            : duty
        ),
      };
    
    case 'ASSIGN_EXTRA_DUTY':
      return {
        ...state,
        extraDuties: state.extraDuties.map(duty =>
          duty.id === action.payload.id
            ? { 
                ...duty, 
                coverTeacherId: action.payload.teacherId,
                coverTeacherName: action.payload.teacherName,
                status: 'assigned' 
              }
            : duty
        ),
      };
    
    default:
      return state;
  }
}

const TeacherTaskContext = createContext<{
  state: TeacherTaskState;
  dispatch: React.Dispatch<TeacherTaskAction>;
  approveLeave: (id: string, teacherId: string) => void;
  rejectLeave: (id: string, teacherId: string) => void;
  assignExamDuty: (dutyId: string, teacherId: string, teacherName: string) => void;
  assignExtraDuty: (dutyId: string, teacherId: string, teacherName: string) => void;
} | null>(null);

export const useTeacherTasks = () => {
  const context = useContext(TeacherTaskContext);
  if (!context) {
    throw new Error('useTeacherTasks must be used within a TeacherTaskProvider');
  }
  return context;
};

export const TeacherTaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(teacherTaskReducer, initialState);

  const generateMockData = () => {
    const mockLeaveApplications: LeaveApplication[] = [
      {
        id: '1',
        studentId: 'S001',
        studentName: 'Alice Johnson',
        studentClass: '10-A',
        leaveType: 'sick',
        startDate: '2025-01-20',
        endDate: '2025-01-22',
        reason: 'Fever and flu symptoms',
        status: 'pending',
        appliedDate: '2025-01-18',
        priority: 'high',
      },
      {
        id: '2',
        studentId: 'S002',
        studentName: 'Bob Smith',
        studentClass: '9-B',
        leaveType: 'family',
        startDate: '2025-01-25',
        endDate: '2025-01-26',
        reason: 'Family wedding',
        status: 'pending',
        appliedDate: '2025-01-17',
        priority: 'medium',
      },
      {
        id: '3',
        studentId: 'S003',
        studentName: 'Carol Davis',
        studentClass: '11-C',
        leaveType: 'personal',
        startDate: '2025-01-23',
        endDate: '2025-01-23',
        reason: 'Medical appointment',
        status: 'approved',
        appliedDate: '2025-01-16',
        teacherId: 'T001',
        priority: 'low',
      },
    ];

    const mockExamDuties: ExamDuty[] = [
      {
        id: 'E001',
        examName: 'Mid Term Examination',
        subject: 'Mathematics',
        date: '2025-01-28',
        startTime: '09:00',
        endTime: '12:00',
        room: 'Room 101',
        status: 'unassigned',
        studentCount: 35,
        requirements: ['Calculator allowed', 'Graph paper required'],
      },
      {
        id: 'E002',
        examName: 'Mid Term Examination',
        subject: 'Physics',
        date: '2025-01-29',
        startTime: '14:00',
        endTime: '17:00',
        room: 'Lab 1',
        assignedTeacherId: 'T002',
        assignedTeacherName: 'Dr. Wilson',
        status: 'assigned',
        studentCount: 28,
        requirements: ['Formula sheet provided'],
      },
    ];

    const mockExtraDuties: ExtraDuty[] = [
      {
        id: 'D001',
        absentTeacherId: 'T003',
        absentTeacherName: 'Ms. Brown',
        subject: 'English',
        class: '8-A',
        date: '2025-01-21',
        period: 'Period 3 (11:00-11:45)',
        status: 'pending',
        priority: 'high',
        notes: 'Continue with chapter 5 exercises',
      },
      {
        id: 'D002',
        absentTeacherId: 'T004',
        absentTeacherName: 'Mr. Taylor',
        subject: 'History',
        class: '7-B',
        date: '2025-01-22',
        period: 'Period 1 (08:00-08:45)',
        coverTeacherId: 'T005',
        coverTeacherName: 'Ms. Anderson',
        status: 'assigned',
        priority: 'medium',
      },
    ];

    dispatch({ type: 'SET_LEAVE_APPLICATIONS', payload: mockLeaveApplications });
    dispatch({ type: 'SET_EXAM_DUTIES', payload: mockExamDuties });
    dispatch({ type: 'SET_EXTRA_DUTIES', payload: mockExtraDuties });
  };

  useEffect(() => {
    generateMockData();
  }, []);

  useEffect(() => {
    const pendingLeaves = state.leaveApplications.filter(app => app.status === 'pending').length;
    const unassignedDuties = state.examDuties.filter(duty => duty.status === 'unassigned').length;
    const pendingExtraDuties = state.extraDuties.filter(duty => duty.status === 'pending').length;

    const taskSummary: TaskSummary = {
      pendingLeaveApprovals: pendingLeaves,
      upcomingExamDuties: unassignedDuties,
      pendingExtraDuties: pendingExtraDuties,
      totalTasks: pendingLeaves + unassignedDuties + pendingExtraDuties,
    };

    dispatch({ type: 'SET_LOADING', payload: false });
  }, [state.leaveApplications, state.examDuties, state.extraDuties]);

  const approveLeave = (id: string, teacherId: string) => {
    dispatch({ type: 'UPDATE_LEAVE_STATUS', payload: { id, status: 'approved', teacherId } });
  };

  const rejectLeave = (id: string, teacherId: string) => {
    dispatch({ type: 'UPDATE_LEAVE_STATUS', payload: { id, status: 'rejected', teacherId } });
  };

  const assignExamDuty = (dutyId: string, teacherId: string, teacherName: string) => {
    dispatch({ type: 'ASSIGN_EXAM_DUTY', payload: { id: dutyId, teacherId, teacherName } });
  };

  const assignExtraDuty = (dutyId: string, teacherId: string, teacherName: string) => {
    dispatch({ type: 'ASSIGN_EXTRA_DUTY', payload: { id: dutyId, teacherId, teacherName } });
  };

  const value = {
    state: {
      ...state,
      taskSummary: {
        pendingLeaveApprovals: state.leaveApplications.filter(app => app.status === 'pending').length,
        upcomingExamDuties: state.examDuties.filter(duty => duty.status === 'unassigned').length,
        pendingExtraDuties: state.extraDuties.filter(duty => duty.status === 'pending').length,
        totalTasks: state.leaveApplications.filter(app => app.status === 'pending').length +
                   state.examDuties.filter(duty => duty.status === 'unassigned').length +
                   state.extraDuties.filter(duty => duty.status === 'pending').length,
      },
    },
    dispatch,
    approveLeave,
    rejectLeave,
    assignExamDuty,
    assignExtraDuty,
  };

  return (
    <TeacherTaskContext.Provider value={value}>
      {children}
    </TeacherTaskContext.Provider>
  );
};