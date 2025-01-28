import React, { useState, useEffect } from 'react';
import { Task, generateDailyTasks } from '../utils/dailyTasks';
import { AnalysisResult } from '../utils/types';
import { DailyProgress } from './daily/DailyProgress';
import { TaskList } from './daily/TaskList';
import { EmptyState } from './daily/EmptyState';
import { Loader2, Sparkles } from 'lucide-react';

interface DailyScreenProps {
  analysisResult?: AnalysisResult | null;
}

export function DailyScreen({ analysisResult }: DailyScreenProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (analysisResult) {
      loadTasks(analysisResult);
    }
  }, [analysisResult]);

  const loadTasks = async (result: AnalysisResult) => {
    try {
      setIsLoading(true);
      const generatedTasks = await generateDailyTasks(result);
      setTasks(generatedTasks);
    } catch (error) {
      console.error('Failed to load tasks:', error);
      setError('タスクの生成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  if (!analysisResult) {
    return <EmptyState />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">パーソナライズ中</h2>
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              AIがあなたの分析結果をもとに、最適なデイリールーティンを生成しています。
            </p>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4 animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-8 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">ルーティンを生成中...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-4 space-y-4 pb-24">
        <DailyProgress tasks={tasks} />
        <TaskList tasks={tasks} onToggleTask={toggleTask} />
      </div>
    </div>
  );
}