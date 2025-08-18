import { Calendar, FlaskConical, GraduationCap, MessagesSquare } from 'lucide-react';

export default function NotificationManagement() {
  const notifications = [
    {
      id: '1',
      title: 'Parent-Teacher Conference',
      description: 'Quarterly parent-teacher meetings to discuss student progress',
      date: new Date(2025, 0, 15),
      createdBy: 'admin',
      createdAt: new Date(),
      color: 'bg-indigo-50 border-indigo-500',
      icon: <Calendar className="text-indigo-600 w-6 h-6" />,
    },
    {
      id: '2',
      title: 'Science Fair',
      description: 'Annual science exhibition for grades 6-12',
      date: new Date(2025, 0, 20),
      createdBy: 'admin',
      createdAt: new Date(),
      color: 'bg-green-50 border-green-500',
      icon: <FlaskConical className="text-green-600 w-6 h-6" />,
    },
    {
      id: '3',
      title: 'Staff Development Workshop',
      description: 'Professional development session on modern teaching methodologies',
      date: new Date(2025, 0, 25),
      createdBy: 'admin',
      createdAt: new Date(),
      color: 'bg-yellow-50 border-yellow-500',
      icon: <GraduationCap className="text-yellow-600 w-6 h-6" />,
    },
  ];

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className="flex items-center space-x-4 mb-8">
        <MessagesSquare className="w-10 h-10 text-blue-600" />
        <h1 className="text-3xl font-extrabold text-gray-900">Notification Manager</h1>
      </div>

      <div className="space-y-6">
        {notifications.map((note) => (
          <div
            key={note.id}
            className={`flex items-center p-6 rounded-xl border-l-4 shadow-sm transition-shadow duration-300 hover:shadow-lg ${note.color}`}
          >
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-sm">
              {note.icon}
            </div>
            <div className="ml-5 flex-1">
              <h3 className='font-bold text-xl text-gray-800'>{note.title}</h3>
              <p className='text-gray-600 mt-1'>{note.description}</p>
              <div className='flex items-center space-x-4 mt-3 text-sm text-gray-500'>
                <p>
                  <strong className='text-gray-700'>Date:</strong> {note.date.toDateString()}
                </p>
              </div>
              <p className='text-xs text-gray-400 mt-2'>
                Created by {note.createdBy} on {note.createdAt.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}