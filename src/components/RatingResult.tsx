import React, { useState } from 'react';
import { X, Share2 } from 'lucide-react';
import { AnalysisResult } from '../utils/types';
import { DetailedScores, CategoryDetail } from './scoring';
import { ShareMenu } from './common/ShareMenu';
import { calculatePercentile } from '../utils/scoring';
import { DetailedScores as DetailedScoresType } from '../utils/types/scoring';
import { RadarChart } from './charts/RadarChart';
import { Button } from './common/Button';

interface RatingResultProps {
  imageUrl?: string | null;
  onClose?: () => void;
  analysisResult: AnalysisResult;
  onGetPro?: () => void;
}

export function RatingResult({ imageUrl, onClose, analysisResult, onGetPro }: RatingResultProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const totalScore = analysisResult.scores.total;
  const percentile = calculatePercentile(totalScore);

  if (selectedCategory) {
    return (
      <CategoryDetail
        category={selectedCategory as keyof DetailedScoresType}
        scores={analysisResult.detailedScores}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">分析結果</h1>
        <button onClick={() => setShowShareMenu(true)}>
          <Share2 className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 py-8">
        {imageUrl && (
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img 
              src={imageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="text-center mb-8">
          <div className="text-7xl font-bold mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            {totalScore}
          </div>
          <p className="text-gray-600">上位{percentile}%</p>
        </div>

        <div className="mb-8">
          <RadarChart
            scores={{
              eyes: analysisResult.scores.eyes,
              nose: analysisResult.scores.nose,
              skin: analysisResult.scores.skin,
              jawline: analysisResult.scores.jawline,
              hair: analysisResult.scores.hair
            }}
            size={300}
            className="mx-auto"
          />
        </div>

        <DetailedScores
          scores={analysisResult.detailedScores}
          onSelectCategory={setSelectedCategory}
        />

        {onGetPro && (
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg border-t border-gray-200">
            <Button
              onClick={onGetPro}
              className="w-full"
              size="lg"
            >
              プレミアム会員になって詳細を見る
            </Button>
          </div>
        )}
      </div>

      {showShareMenu && (
        <ShareMenu
          title="ビジュマックス分析結果"
          text={`ビジュマックスで分析したら、総合スコア${totalScore}点で上位${percentile}%の評価を獲得しました！`}
          url={window.location.href}
          onClose={() => setShowShareMenu(false)}
          onShare={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
}