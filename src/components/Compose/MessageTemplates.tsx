import React, { useState } from 'react';
import { FileText, Plus, Edit3, Trash2, Copy } from 'lucide-react';

interface MessageTemplate {
  id: string;
  title: string;
  subject: string;
  content: string;
  category: 'announcement' | 'reminder' | 'urgent' | 'general';
  lastUsed: string;
  usageCount: number;
}

const mockTemplates: MessageTemplate[] = [
  {
    id: '1',
    title: 'Parent-Teacher Meeting',
    subject: 'Upcoming Parent-Teacher Meeting',
    content: 'Dear parents, we would like to inform you about the upcoming parent-teacher meeting scheduled for [DATE] at [TIME]. Please make sure to attend this important meeting to discuss your child\'s academic progress.',
    category: 'reminder',
    lastUsed: '2025-01-08',
    usageCount: 15
  },
  {
    id: '2',
    title: 'Holiday Announcement',
    subject: 'School Holiday Notice',
    content: 'We would like to inform you that the school will remain closed on [DATE] due to [REASON]. Regular classes will resume on [NEXT_DATE]. Thank you for your understanding.',
    category: 'announcement',
    lastUsed: '2025-01-07',
    usageCount: 8
  },
  {
    id: '3',
    title: 'Emergency Alert',
    subject: 'URGENT: Important Notice',
    content: 'This is an urgent message regarding [SUBJECT]. Please take immediate action and contact the school office for further instructions.',
    category: 'urgent',
    lastUsed: '2025-01-05',
    usageCount: 3
  }
];

interface MessageTemplatesProps {
  onSelectTemplate: (template: MessageTemplate) => void;
}

const MessageTemplates: React.FC<MessageTemplatesProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'All Templates', color: 'gray' },
    { value: 'announcement', label: 'Announcements', color: 'blue' },
    { value: 'reminder', label: 'Reminders', color: 'emerald' },
    { value: 'urgent', label: 'Urgent', color: 'red' },
    { value: 'general', label: 'General', color: 'purple' }
  ];

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'reminder': return 'bg-emerald-100 text-emerald-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'general': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Message Templates</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          New Template
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-500" />
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                    {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2">{template.title}</h4>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{template.content}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>Used {template.usageCount} times</span>
                <span>Last used: {new Date(template.lastUsed).toLocaleDateString()}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onSelectTemplate(template)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Copy className="w-4 h-4" />
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredTemplates.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or create a new template.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageTemplates;