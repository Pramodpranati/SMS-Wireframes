import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { SchoolProvider } from './contexts/SchoolContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { UserManagement } from './components/Users/UserManagement';
import { GradeManagement } from './components/Grades/GradeManagement';
import { SubjectManagement } from './components/Subjects/SubjectManagement';
import { TimeTableManagement } from './components/TimeTable/TimeTableManagement';
import { AttendanceManagement } from './components/Attendance/AttendanceManagement';
import { Settings } from './components/Settings/Settings';
import TeacherMasters from './components/TeacherMasters/TeacherMasters';
import StudentManagement from './components/Students/StudentManagement';
import TeacherAssignment from './components/TeacherMasters/TeacherAssignment';
import AdmissionDashboard from './components/Admission/AdmissionDashboard';
import SpecialClassManagement from './components/Specialclass/SpecialClass';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'grades':
        return <GradeManagement />;
      case 'subjects':
        return <SubjectManagement />;
      case 'timetable':
        return <TimeTableManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'settings':
        return <Settings />;
      case 'teachers':
        return <TeacherMasters />
      case 'students':
        return <StudentManagement />;
      case 'teachersassignment':
        return <TeacherAssignment />;
      case 'admissiondashboard':
        return <AdmissionDashboard />;
      case 'specialclass':
        return <SpecialClassManagement/>
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <SchoolProvider>
        <div className="min-h-screen bg-gray-50 flex">
          <div>
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 overflow-auto">
              {renderContent()}
            </main>
          </div>
        </div>
      </SchoolProvider>
    </AuthProvider >
  );
}

export default App;
