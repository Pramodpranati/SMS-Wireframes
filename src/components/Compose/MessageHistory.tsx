import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, Calendar, Users, MoreVertical } from 'lucide-react';

interface MessageHistoryItem {
  id: string;
  subject: string;
  message: string;
  recipientCount: number;
  recipientTypes: string[];
  sentAt: string;
  methods: ('email' | 'sms')[];
  status: 'sent' | 'scheduled' | 'failed' | 'draft';
}

const mockMessages: MessageHistoryItem[] = [
  {
    id: '1',
    subject: 'Parent-Teacher Meeting Reminder',
    message: 'Dear parents, this is a reminder about the upcoming parent-teacher meeting...',
    recipientCount: 150,
    recipientTypes: ['Students Grade 10', 'Parents'],
    sentAt: '2025-01-09T14:30:00Z',
    methods: ['email', 'sms'],
    status: 'sent'
  },
  {
    id: '2',
    subject: 'School Holiday Notice',
    message: 'The school will remain closed on January 15th due to a public holiday...',
    recipientCount: 300,
    recipientTypes: ['All Students', 'All Staff'],
    sentAt: '2025-01-08T09:00:00Z',
    methods: ['email'],
    status: 'sent'
  },
  {
    id: '3',
    subject: 'Sports Day Announcement',
    message: 'We are excited to announce our annual sports day event...',
    recipientCount: 200,
    recipientTypes: ['Grade 8-12 Students'],
    sentAt: '2025-01-10T16:00:00Z',
    methods: ['email', 'sms'],
    status: 'scheduled'
  }
];

const MessageHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');

  const filteredMessages = mockMessages.filter(msg => {
    const matchesSearch = msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || msg.methods.includes(methodFilter as 'email' | 'sms');
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="sent">Sent</option>
            <option value="scheduled">Scheduled</option>
            <option value="failed">Failed</option>
            <option value="draft">Draft</option>
          </select>

          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Methods</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
      </div>

      {/* Message List */}
      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <div key={msg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{msg.subject}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(msg.status)}`}>
                    {msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3 line-clamp-2">{msg.message}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{msg.recipientCount} recipients</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(msg.sentAt)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {msg.methods.includes('email') && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        <Mail className="w-3 h-3" />
                        <span className="text-xs">Email</span>
                      </div>
                    )}
                    {msg.methods.includes('sms') && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                        <Phone className="w-3 h-3" />
                        <span className="text-xs">SMS</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2">
                    {msg.recipientTypes.map((type, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
        
        {filteredMessages.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find messages.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageHistory;