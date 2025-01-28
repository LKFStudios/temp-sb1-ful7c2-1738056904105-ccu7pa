import React from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Star, Sparkles, Lightbulb, Crown, ChevronRight } from 'lucide-react';
import { calculatePotentialScore } from '../utils/scoring';

interface ScoreDetailProps {
  category: string;
  scores: any;
  onBack: () => void;
  imageUrl?: string | null;
}

export function ScoreDetail({ category, scores, onBack, imageUrl }: ScoreDetailProps) {
  const getCategoryData = () => {
    const data = scores[category];
    if (!data) return null;

    const labels: Record<string, string> = {
      size: 'サイズ',
      shape: '形状',
      balance: 'バランス',
      height: '高さ',
      bridge: '鼻筋',
      texture: 'テクスチャー',
      tone: '色調',
      clarity: '透明感',
      definition: '輪郭の通り',
      quality: '質感',
      volume: 'ボリューム',
      style: 'スタイル'
    };

    return Object.entries(data)
      .filter(([key]) => typeof data[key] === 'number')
      .map(([key, value]) => ({
        label: labels[key] || key,
        score: value as number * 10
      }));
  };

  const details = getCategoryData();
  if (!details) return null;

  const averageScore = Math.round(
    details.reduce((sum, detail) => sum + detail.score, 0) / details.length
  );
  const potentialScore = calculatePotentialScore(averageScore);

  const categoryData = scores[category];
  const analysisPoints = Array.isArray(categoryData?.analysis) ? categoryData.analysis : [];
  const improvementPoints = Array.isArray(categoryData?.improvement) ? categoryData.improvement : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg">
        <div className="px-6 py-4 flex items-center gap-4 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{getCategoryLabel(category)}</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {imageUrl && (
          <div className="relative">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
              <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 right-1/2 translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
              Score: {averageScore}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {details.map((detail, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-600">{detail.label}</div>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold tabular-nums">
                    {Math.round(detail.score)}
                  </div>
                  {detail.score >= 70 ? (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  ) : detail.score <= 30 ? (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  ) : null}
                </div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    detail.score >= 81 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                    detail.score >= 61 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, detail.score))}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Crown className="w-5 h-5" />
                改善の可能性
              </h3>
              <div className="text-3xl font-bold">{potentialScore}</div>
            </div>
            <p className="text-white/80 text-sm">
              適切なケアと習慣づけで、さらなる魅力アップが期待できます
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        {analysisPoints.length > 0 && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-6 h-6 text-yellow-400" />
              <h3 className="text-lg font-medium text-gray-900">優れている点</h3>
            </div>
            <div className="space-y-6">
              {analysisPoints.map((point, index) => (
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

        {improvementPoints.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-green-800">アドバイス</h3>
            </div>
            <div className="space-y-6">
              {improvementPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 bg-white p-4 rounded-lg hover:bg-green-50/50 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1 group-hover:text-green-700 transition-colors">{point}</p>
                  <ChevronRight className="w-5 h-5 text-green-400 group-hover:text-green-600 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    eyes: '目の分析',
    nose: '鼻の分析',
    skin: '肌の分析',
    jawline: 'フェイスラインの分析',
    hair: '髪型の分析'
  };
  return labels[category] || category;
}