import React from 'react';
// import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface TaskCardProps {
  title: string;
  count: number;
  href: string;
  children: React.ReactNode;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, count, href, children }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-slate-600">{count} items</span>
            {/* <Link
              to={href}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </Link> */}
          </div>
        </div>
      </div>
      <div className="p-6 max-h-80 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default TaskCard;