import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Grade, Section, Subject, TimeTableEntry, AttendanceRecord, SchoolSettings, Student } from '../types';

interface SchoolContextType {
  grades: Grade[];
  subjects: Subject[];
  timeTable: TimeTableEntry[];
  attendance: AttendanceRecord[];
  settings: SchoolSettings;
  students: Student[];
  
  // Actions
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  updateGrade: (id: string, grade: Partial<Grade>) => void;
  deleteGrade: (id: string) => void;
  
  addSection: (section: Omit<Section, 'id'>) => void;
  updateSection: (id: string, section: Partial<Section>) => void;
  deleteSection: (id: string) => void;
  
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  
  addTimeTableEntry: (entry: Omit<TimeTableEntry, 'id'>) => void;
  updateTimeTableEntry: (id: string, entry: Partial<TimeTableEntry>) => void;
  deleteTimeTableEntry: (id: string) => void;
  
  markAttendance: (records: Omit<AttendanceRecord, 'id'>[]) => void;
  updateSettings: (settings: Partial<SchoolSettings>) => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (context === undefined) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};

interface SchoolProviderProps {
  children: ReactNode;
}

export const SchoolProvider: React.FC<SchoolProviderProps> = ({ children }) => {
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: '1',
      name: 'Grade 1',
      sections: [
        { id: '1', name: 'A', gradeId: '1', roomNumber: '101', students: [] },
        { id: '2', name: 'B', gradeId: '1', roomNumber: '102', students: [] }
      ]
    },
    {
      id: '2',
      name: 'Grade 2',
      sections: [
        { id: '3', name: 'A', gradeId: '2', roomNumber: '201', students: [] },
        { id: '4', name: 'B', gradeId: '2', roomNumber: '202', students: [] }
      ]
    }
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'English', code: 'ENG' },
    { id: '2', name: 'Hindi', code: 'HIN' },
    { id: '3', name: 'Mathematics', code: 'MATH' },
    { id: '4', name: 'Science', code: 'SCI' },
    { id: '5', name: 'Social Studies', code: 'SS' }
  ]);

  const [timeTable, setTimeTable] = useState<TimeTableEntry[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Alice Johnson', rollNumber: '001', sectionId: '1' },
    { id: '2', name: 'Bob Smith', rollNumber: '002', sectionId: '1' },
    { id: '3', name: 'Charlie Brown', rollNumber: '003', sectionId: '2' }
  ]);

  const [settings, setSettings] = useState<SchoolSettings>({
    name: 'Greenwood Elementary School',
    address: '123 Education Street, Learning City, LC 12345',
    contactNumber: '+1 (555) 123-4567',
    workingDays: [false, true, true, true, true, true, true], // Sun-Sat
    startTime: '08:00',
    endTime: '15:00',
    periodDuration: 45,
    intervalDuration: 10,
    lunchBreakDuration: 30,
    lunchBreakStart: '12:00'
  });

  // Grade actions
  const addGrade = (grade: Omit<Grade, 'id'>) => {
    const newGrade = { ...grade, id: Date.now().toString() };
    setGrades(prev => [...prev, newGrade]);
  };

  const updateGrade = (id: string, updatedGrade: Partial<Grade>) => {
    setGrades(prev => prev.map(grade => 
      grade.id === id ? { ...grade, ...updatedGrade } : grade
    ));
  };

  const deleteGrade = (id: string) => {
    setGrades(prev => prev.filter(grade => grade.id !== id));
  };

  // Section actions
  const addSection = (section: Omit<Section, 'id'>) => {
    const newSection = { ...section, id: Date.now().toString() };
    setGrades(prev => prev.map(grade => 
      grade.id === section.gradeId 
        ? { ...grade, sections: [...grade.sections, newSection] }
        : grade
    ));
  };

  const updateSection = (id: string, updatedSection: Partial<Section>) => {
    setGrades(prev => prev.map(grade => ({
      ...grade,
      sections: grade.sections.map(section =>
        section.id === id ? { ...section, ...updatedSection } : section
      )
    })));
  };

  const deleteSection = (id: string) => {
    setGrades(prev => prev.map(grade => ({
      ...grade,
      sections: grade.sections.filter(section => section.id !== id)
    })));
  };

  // Subject actions
  const addSubject = (subject: Omit<Subject, 'id'>) => {
    const newSubject = { ...subject, id: Date.now().toString() };
    setSubjects(prev => [...prev, newSubject]);
  };

  const updateSubject = (id: string, updatedSubject: Partial<Subject>) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, ...updatedSubject } : subject
    ));
  };

  const deleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  };

  // TimeTable actions
  const addTimeTableEntry = (entry: Omit<TimeTableEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    setTimeTable(prev => [...prev, newEntry]);
  };

  const updateTimeTableEntry = (id: string, updatedEntry: Partial<TimeTableEntry>) => {
    setTimeTable(prev => prev.map(entry => 
      entry.id === id ? { ...entry, ...updatedEntry } : entry
    ));
  };

  const deleteTimeTableEntry = (id: string) => {
    setTimeTable(prev => prev.filter(entry => entry.id !== id));
  };

  // Attendance actions
  const markAttendance = (records: Omit<AttendanceRecord, 'id'>[]) => {
    const newRecords = records.map(record => ({
      ...record,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }));
    setAttendance(prev => [...prev, ...newRecords]);
  };

  // Settings actions
  const updateSettings = (updatedSettings: Partial<SchoolSettings>) => {
    setSettings(prev => ({ ...prev, ...updatedSettings }));
  };

  return (
    <SchoolContext.Provider value={{
      grades,
      subjects,
      timeTable,
      attendance,
      settings,
      students,
      addGrade,
      updateGrade,
      deleteGrade,
      addSection,
      updateSection,
      deleteSection,
      addSubject,
      updateSubject,
      deleteSubject,
      addTimeTableEntry,
      updateTimeTableEntry,
      deleteTimeTableEntry,
      markAttendance,
      updateSettings
    }}>
      {children}
    </SchoolContext.Provider>
  );
};