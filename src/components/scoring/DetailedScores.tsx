import React from 'react';
import { DetailedScores as DetailedScoresType } from '../../utils/types/scoring';
import { CATEGORY_SCORES } from '../../utils/constants/scoring';
import { ScoreBar } from './ScoreBar';

interface DetailedScoresViewProps {
  scores: DetailedScoresType;
  onSelectCategory: (category: string) => void;
}

export function DetailedScoresView({ scores, onSelectCategory }: DetailedScoresViewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-6">パーツ別分析</h3>
        <div className="space-y-6">
          {Object.entries(CATEGORY_SCORES).map(([key, config]) => (
            <button
              key={key}
              onClick={() => onSelectCategory(key)}
              className="w-full text-left"
            >
              <ScoreBar
                label={config.label}
                score={calculateCategoryScore(scores[key as keyof DetailedScoresType], config.metrics)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function calculateCategoryScore(category: any, metrics: string[]): number {
  if (!category) return 0;
  const scores = metrics.map(metric => category[metric] || 0);
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10);
}