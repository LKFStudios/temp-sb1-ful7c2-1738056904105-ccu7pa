import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Star, Sparkles, Lightbulb } from 'lucide-react';
import { DetailedScores } from '../../utils/types/scoring';
import { CATEGORY_METRICS, CATEGORY_LABELS } from '../../utils/constants/scoring';
import { ScoreBar } from './ScoreBar';

interface CategoryDetailProps {
  category: keyof DetailedScores;
  scores: DetailedScores;
  onBack: () => void;
}

export function CategoryDetail({ category, scores, onBack }: CategoryDetailProps) {
  const categoryData = scores[category];
  const metrics = CATEGORY_METRICS[category];

  if (!categoryData || !metrics) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg">
        <div className="px-6 py-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{CATEGORY_LABELS[category]}</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 gap-4">
          {metrics.map((metric) => (
            <div key={metric.key} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-600">{metric.label}</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold tabular-nums">
                    {Math.round(categoryData[metric.key] * 10)}
                  </div>
                  {categoryData[metric.key] >= 7 ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : categoryData[metric.key] <= 3 ? (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  ) : null}
                </div>
              </div>
              <ScoreBar
                label={metric.label}
                score={Math.round(categoryData[metric.key] * 10)}
                showDetails={false}
              />
            </div>
          ))}
        </div>

        {categoryData.analysis && categoryData.analysis.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-medium text-gray-900">優れている点</h3>
            </div>
            <div className="space-y-4">
              {categoryData.analysis.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-yellow-50/50 p-4 rounded-lg hover:bg-yellow-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-yellow-500" />
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {categoryData.improvement && categoryData.improvement.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-green-800">改善のアドバイス</h3>
            </div>
            <div className="space-y-4">
              {categoryData.improvement.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-white p-4 rounded-lg hover:bg-green-50/50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1">{point}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}