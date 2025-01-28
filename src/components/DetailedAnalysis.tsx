import React from 'react';
import { DetailedScores } from '../utils/types';
import { ScoreBar } from './ScoreBar';

interface DetailedAnalysisProps {
  scores: DetailedScores;
  onSelectCategory: (category: string) => void;
}

export function DetailedAnalysis({ scores, onSelectCategory }: DetailedAnalysisProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">パーツ別分析</h3>
        <div className="space-y-4">
          {Object.entries(DETAILED_LABELS).map(([key, label]) => (
            <button
              key={key}
              className="w-full text-left"
              onClick={() => onSelectCategory(key)}
            >
              <ScoreBar
                label={label}
                score={scores[key as keyof DetailedScores]}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const DETAILED_LABELS: Record<string, string> = {
  overall: '全体的な印象',
  skin: '肌質',
  eyes: '目の形状',
  eyebrows: '眉の形状',
  nose: '鼻筋',
  mouth: '口元',
  jawline: '輪郭',
  cheekbones: '頬骨'
};