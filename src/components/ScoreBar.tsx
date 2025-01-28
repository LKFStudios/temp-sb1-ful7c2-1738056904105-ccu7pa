import React from 'react';
import { getScoreColor } from '../utils/scoring';

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
}

export function ScoreBar({ label, score, maxScore = 100 }: ScoreBarProps) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="group hover:bg-gray-100 p-3 -mx-3 rounded-lg transition-colors">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors">
          {label}
        </span>
        <span className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
          {score}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getScoreColor(score)} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}