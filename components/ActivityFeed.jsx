"use client";

import { useAppContext } from '@/context/AppContext';
import { 
  PlusCircle, 
  CheckCircle2, 
  UserPlus, 
  Zap, 
  Clock 
} from 'lucide-react';

const ActivityFeed = () => {
  const { activityFeed } = useAppContext();

  const getIcon = (type) => {
    switch (type) {
      case 'need': return <PlusCircle size={16} className="text-[#e76f51]" />;
      case 'resolved': return <CheckCircle2 size={16} className="text-[#2a9d8f]" />;
      case 'volunteer': return <UserPlus size={16} className="text-blue-500" />;
      case 'match': return <Zap size={16} className="text-[#f4a261]" />;
      default: return <Clock size={16} className="text-stone-400" />;
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000); // seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 flex flex-col h-full">
      <h3 className="text-lg font-bold text-stone-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {activityFeed.map((item) => (
          <div key={item.id} className="flex gap-4 relative">
            <div className="mt-1 flex-shrink-0">
              {getIcon(item.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm text-stone-800 leading-snug">{item.message}</p>
              <p className="text-xs text-stone-400 mt-1">{formatTime(item.time)}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-stone-50 text-center">
        <button className="text-xs font-bold text-[#e76f51] hover:underline uppercase tracking-wider">
          View All Logs
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
