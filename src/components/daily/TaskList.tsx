import React from 'react';
import { Calendar, Activity, Droplet, Brain, TrendingUp } from 'lucide-react';
import { Task } from '../../utils/dailyTasks';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export function TaskList({ tasks, onToggleTask }: TaskListProps) {
  const getTaskIcon = (category: string) => {
    switch (category) {
      case 'skincare':
        return <Droplet className="w-4 h-4 text-blue-500" />;
      case 'exercise':
        return <Activity className="w-4 h-4 text-green-500" />;
      case 'diet':
        return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'mental':
        return <Brain className="w-4 h-4 text-purple-500" />;
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-3 text-gray-900">パーソナライズされたタスク</h2>
      <div className="bg-gray-50 rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Calendar className="w-5 h-5 text-green-600" />
          <h3 className="text-base font-medium text-gray-900">
            あなたに最適化されたルーティン
          </h3>
        </div>
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg p-3 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center">
                  {getTaskIcon(task.category)}
                </div>
                <div className="flex-1">
                  <span className="text-sm text-gray-800 font-medium">{task.title}</span>
                  <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                </div>
              </div>
              <label className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="w-5 h-5 rounded-md border-2 border-green-500 text-green-500 focus:ring-green-500 cursor-pointer"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}