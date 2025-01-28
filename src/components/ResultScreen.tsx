import React from 'react';
import { X } from 'lucide-react';
import { RatingBar } from './RatingBar';
import { AnalysisResult } from '../types';

interface ResultScreenProps {
  onBack: () => void;
  image: string | null;
  result: AnalysisResult | null;
}

export function ResultScreen({ onBack, image, result }: ResultScreenProps) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-400">
            <X size={24} />
          </button>
          <h2 className="text-xl font-bold">分析結果</h2>
          <div className="w-6"></div>
        </div>
        
        {image && (
          <div className="mb-6">
            <img src={image} alt="Uploaded" className="w-24 h-24 rounded-full mx-auto object-cover" />
          </div>
        )}

        <div className="bg-gray-900 rounded-lg p-6">
          {result && (
            <div className="space-y-4">
              <RatingBar label="ポテンシャル" value={result.potential} color="green" />
              <RatingBar label="体型" value={result.physicalShape} color="red" />
              <RatingBar label="肌質" value={result.skinQuality} color="orange" />
              <RatingBar label="男性らしさ" value={result.masculinity} color="green" />
              <RatingBar label="エラ" value={result.jawline} color="yellow" />
              <RatingBar label="頬骨" value={result.cheekbones} color="green" />
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors">
            保存
          </button>
          <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors">
            次へ
          </button>
        </div>
      </div>
    </div>
  );
}