import React, { useMemo } from 'react';
import { Calendar, Users, BookOpen, Clock, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { ExamWithAssignments } from '../../types/Exam';

interface ExamDashboardProps {
  exams: ExamWithAssignments[];
}

const ExamDashboard: React.FC<ExamDashboardProps> = ({ exams }) => {
  const dashboardStats = useMemo(() => {
    const totalExams = exams.length;
    const scheduledExams = exams.filter(exam => exam.status === 'scheduled').length;
    const completedExams = exams.filter(exam => exam.status === 'completed').length;
    const ongoingExams = exams.filter(exam => exam.status === 'ongoing').length;
    const totalStudentsAssigned = exams.reduce((sum, exam) => sum + exam.assignedCount, 0);
    
    const upcomingExams = exams.filter(exam => {
      if (exam.status !== 'scheduled') return false;
      const examDate = new Date(exam.date);
      const today = new Date();
      const daysDiff = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      return daysDiff <= 7 && daysDiff >= 0;
    });

    const subjectDistribution = exams.reduce((acc, exam) => {
      acc[exam.subject] = (acc[exam.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalExams,
      scheduledExams,
      completedExams,
      ongoingExams,
      totalStudentsAssigned,
      upcomingExams: upcomingExams.length,
      subjectDistribution
    };
  }, [exams]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'ongoing': return <Clock className="w-5 h-5 text-green-600" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-gray-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ongoing': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const upcomingExams = exams
    .filter(exam => exam.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exams</p>
              <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalExams}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">Active</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scheduled</p>
              <p className="text-3xl font-bold text-blue-600">{dashboardStats.scheduledExams}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <AlertCircle className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-orange-600 font-medium">Upcoming: {dashboardStats.upcomingExams}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Students Assigned</p>
              <p className="text-3xl font-bold text-teal-600">{dashboardStats.totalStudentsAssigned}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 font-medium">Across all grades</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-600">{dashboardStats.completedExams}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <Clock className="w-4 h-4 text-gray-500 mr-1" />
            <span className="text-gray-600 font-medium">This term</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Exams */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Exams</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {upcomingExams.length > 0 ? (
              upcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(exam.status)}
                    <div>
                      <p className="font-medium text-gray-900">{exam.title}</p>
                      <p className="text-sm text-gray-600">{exam.subject}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(exam.date).toLocaleDateString()} at {exam.startTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(exam.status)}`}>
                      {exam.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{exam.assignedCount} students</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming exams</p>
              </div>
            )}
          </div>
        </div>

        {/* Subject Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Subject Distribution</h3>
            <BookOpen className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {Object.entries(dashboardStats.subjectDistribution).length > 0 ? (
              Object.entries(dashboardStats.subjectDistribution)
                .sort(([,a], [,b]) => b - a)
                .map(([subject, count]) => {
                  const percentage = ((count / dashboardStats.totalExams) * 100).toFixed(1);
                  return (
                    <div key={subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{subject}</span>
                        <span className="text-sm text-gray-600">{count} exam{count !== 1 ? 's' : ''} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No exam data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Exam Activity</h3>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {exams.length > 0 ? (
            exams
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .slice(0, 5)
              .map((exam) => (
                <div key={exam.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  {getStatusIcon(exam.status)}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{exam.title}</p>
                    <p className="text-sm text-gray-600">
                      {exam.subject} • {exam.assignedCount} students • {exam.totalMarks} marks
                    </p>
                    <p className="text-xs text-gray-500">
                      Updated {new Date(exam.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(exam.status)}`}>
                    {exam.status}
                  </span>
                </div>
              ))
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No recent activity</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;