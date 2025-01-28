import React from 'react';
import { Task } from '../../utils/dailyTasks';

interface DailyProgressProps {
  tasks: Task[];
}

export function DailyProgress({ tasks }: DailyProgressProps) {
  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter(t => t.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-5 relative overflow-hidden text-white shadow-lg">
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-3">今日の進捗</h2>
        <p className="text-white/80 mb-4">
          達成率: {calculateProgress()}%
        </p>
        <div className="h-2 bg-white/20 rounded-full">
          <div 
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>
      <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/30 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-green-500/30 rounded-full translate-y-1/2 -translate-x-1/2" />
    </div>
  );
}