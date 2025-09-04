import { BookOpen, Calendar, Home, LogOut, User, Users } from 'lucide-react';
import { useState } from 'react';
import AdmissionDashboard from './components/Admission/AdmissionDashboard';
import { AttendanceManagement } from './components/Attendance/AttendanceManagement';
import { Dashboard } from './components/Dashboard/Dashboard';
import { GradeManagement } from './components/Grades/GradeManagement';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { LeaveManagement } from './components/LeaveManagement';
import { Settings } from './components/Settings/Settings';
import SpecialClassManagement from './components/Specialclass/SpecialClass';
import StudentManagement from './components/Students/StudentManagement';
import { SubjectManagement } from './components/Subjects/SubjectManagement';
import TeacherAssignment from './components/TeacherMasters/TeacherAssignment';
import TeacherMasters from './components/TeacherMasters/TeacherMasters';
import { TimeTableManagement } from './components/TimeTable/TimeTableManagement';
import { UserManagement } from './components/Users/UserManagement';
import { AuthProvider } from './contexts/AuthContext';
import { SchoolProvider } from './contexts/SchoolContext';
import { ExamManagement } from './components/ExamManagement';
import { EventManagement } from './components/EventManagement';
import NotificationManagement from './components/NotificationManagement/Notification';
import MessagesPage from './components/Messages/MessagesPage';
import MarksheetManagement from './components/Marksheet/MarksheetManagement';
import MessageComposer from './components/Compose/MessageComposer';
import StudentLists from './components/Reports/StudentLists';
import TeacherLeaveManager from './components/TeacherLeave/TeacherLeaveManager';
import TeacherDashboard from './components/TeacherTasks/TeacherDashboard';
import TaskReports from './components/TeacherTasks/TaskReports';
import { TeacherTaskProvider } from './contexts/TeacherTaskContext';
import LeaveApproval from './components/TeacherTasks/LeaveApproval';
import ExamDutyManager from './components/TeacherTasks/ExamDutyManager';
import ExtraDutyManager from './components/TeacherTasks/ExtraDutyManager';
import BranchManagement from './components/BranchManagement/BranchManagement';

type ActiveSection =
  | 'dashboard'
  | 'students'
  | 'admission'
  | 'attendance'
  | 'exams'
  | 'grades'
  | 'events'
  | 'messages'
  | 'leave'
  | 'timetable'
  | 'subjects'
  | 'teachers'
  | 'branches'
  | 'users'
  | 'settings';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeModule, setActiveModule] = useState('leave');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'leave', label: 'Leave Management', icon: Calendar },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'subjects', label: 'Subjects', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockStudents = [
    { id: '1', name: 'Alice Johnson', grade: '10', section: 'A', email: 'alice@email.com', phone: '+1234567890' },
    { id: '2', name: 'Bob Smith', grade: '10', section: 'B', email: 'bob@email.com', phone: '+1234567891' },
    { id: '3', name: 'Charlie Brown', grade: '11', section: 'A', email: 'charlie@email.com', phone: '+1234567892' },
    { id: '4', name: 'Diana Prince', grade: '11', section: 'B', email: 'diana@email.com', phone: '+1234567893' },
    { id: '5', name: 'Edward Wilson', grade: '12', section: 'A', email: 'edward@email.com', phone: '+1234567894' },
    { id: '6', name: 'Fiona Davis', grade: '12', section: 'B', email: 'fiona@email.com', phone: '+1234567895' },
    { id: '7', name: 'George Miller', grade: '9', section: 'A', email: 'george@email.com', phone: '+1234567896' },
    { id: '8', name: 'Hannah Taylor', grade: '9', section: 'B', email: 'hannah@email.com', phone: '+1234567897' },
    { id: '9', name: 'Ian Cooper', grade: '10', section: 'A', email: 'ian@email.com', phone: '+1234567898' },
    { id: '10', name: 'Julia Martinez', grade: '11', section: 'A', email: 'julia@email.com', phone: '+1234567899' },
  ];

  const mockStaff = [
    { id: '1', name: 'Dr. Sarah Thompson', type: 'teaching' as const, department: 'Mathematics', email: 'sarah@school.edu', phone: '+1234567900' },
    { id: '2', name: 'Prof. Michael Chen', type: 'teaching' as const, department: 'Science', email: 'michael@school.edu', phone: '+1234567901' },
    { id: '3', name: 'Lisa Anderson', type: 'non-teaching' as const, department: 'Administration', email: 'lisa@school.edu', phone: '+1234567902' },
    { id: '4', name: 'John Roberts', type: 'non-teaching' as const, department: 'Maintenance', email: 'john@school.edu', phone: '+1234567903' },
    { id: '5', name: 'Dr. Emily Watson', type: 'teaching' as const, department: 'English', email: 'emily@school.edu', phone: '+1234567904' },
    { id: '6', name: 'Mark Johnson', type: 'non-teaching' as const, department: 'Security', email: 'mark@school.edu', phone: '+1234567905' },
  ];



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
      case 'tasklist':
        return <div className='p-6'><TeacherDashboard onLeave={() => setActiveTab("leaveapproval")} onExam={() => setActiveTab("examduty")} onExtra={() => setActiveTab("extraduty")} /></div>;
      case 'leaveapproval':
        return <div className='p-6'><LeaveApproval /></div>;
      case 'examduty':
        return <div className='p-6'><ExamDutyManager /></div>;
      case 'extraduty':
        return <div className='p-6'><ExtraDutyManager /></div>;
      case 'marksheetmanagement':
        return <MarksheetManagement />;
      case 'leave':
        return <LeaveManagement />;
      case 'messageinput':
        return <MessagesPage />;
      case 'compose':
        return <MessageComposer students={mockStudents} staff={mockStaff} />;
      case 'notificationmanager':
        return <NotificationManagement />;
      case 'exam':
        return <ExamManagement />;
      case 'admissiondashboard':
        return <AdmissionDashboard />;
      case 'branches':
        return <BranchManagement />;
      case 'specialclass':
        return <SpecialClassManagement />
      case 'eventmanagement':
        return <EventManagement />
      case 'exportdashboard':
        return <StudentLists />
      case 'teacheronleave':
        return <TeacherLeaveManager />
      default:
        return <Dashboard />;
    }
  };


  // const SidebarContent = () => (
  //   <div className="flex flex-col h-full bg-white border-r border-gray-200">
  //     {/* Logo */}
  //     <div className="flex items-center h-16 px-6 border-b border-gray-200">
  //       <div className="flex items-center">
  //         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
  //           <span className="text-white font-bold text-sm">SMS</span>
  //         </div>
  //         <span className="text-xl font-bold text-gray-900">School Management</span>
  //       </div>
  //     </div>

  //     {/* Navigation */}
  //     <nav className="flex-1 px-4 py-6 space-y-2">
  //       {navigationItems.map((item) => {
  //         const Icon = item.icon;
  //         return (
  //           <button
  //             key={item.id}
  //             onClick={() => {
  //               setActiveModule(item.id);
  //               setSidebarOpen(false);
  //             }}
  //             className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${activeModule === item.id
  //               ? 'bg-blue-600 text-white shadow-md'
  //               : 'text-gray-700 hover:bg-gray-100'
  //               }`}
  //           >
  //             <Icon className="h-5 w-5 mr-3" />
  //             <span className="font-medium">{item.label}</span>
  //           </button>
  //         );
  //       })}
  //     </nav>

  //     {/* User Profile */}
  //     <div className="border-t border-gray-200 p-4">
  //       <div className="flex items-center space-x-3 mb-4">
  //         <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
  //           <User className="h-6 w-6 text-gray-600" />
  //         </div>
  //         <div>
  //           <p className="text-sm font-medium text-gray-900">John Doe</p>
  //           <p className="text-xs text-gray-600">Administrator</p>
  //         </div>
  //       </div>
  //       <button className="w-full flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
  //         <LogOut className="h-4 w-4 mr-2" />
  //         <span className="text-sm">Sign Out</span>
  //       </button>
  //     </div>
  //   </div>
  // );

  // const renderContent = () => {
  //   switch (activeModule) {
  //     case 'leave':
  //       return <LeaveManagement />;
  //     case 'dashboard':
  //       return (
  //         <div className="p-8">
  //           <div className="bg-white rounded-xl shadow-md p-8 text-center">
  //             <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
  //             <h2 className="text-xl font-bold text-gray-900 mb-2">Dashboard</h2>
  //             <p className="text-gray-600">Dashboard module coming soon...</p>
  //           </div>
  //         </div>
  //       );
  //     default:
  //       return (
  //         <div className="p-8">
  //           <div className="bg-white rounded-xl shadow-md p-8 text-center">
  //             <div className="h-12 w-12 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
  //               <span className="text-gray-500 font-bold">404</span>
  //             </div>
  //             <h2 className="text-xl font-bold text-gray-900 mb-2">Module Not Found</h2>
  //             <p className="text-gray-600">This module is under development.</p>
  //           </div>
  //         </div>
  //       );
  //   }
  // };
  return (
    <AuthProvider>
      <SchoolProvider>
        <TeacherTaskProvider>
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
        </TeacherTaskProvider>
      </SchoolProvider>
    </AuthProvider >
  );

}

export default App;
