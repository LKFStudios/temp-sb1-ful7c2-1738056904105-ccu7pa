import React from 'react';
import { X, Users } from 'lucide-react';
import { AnalysisResult } from '../utils/types';
import { Button } from './common/Button';

interface PaywallScreenProps {
  onGetPro: () => void;
  onInviteFriends: () => void;
  imageUrl?: string | null;
  analysisResult: AnalysisResult;
}

export function PaywallScreen({ onGetPro, onInviteFriends, imageUrl, analysisResult }: PaywallScreenProps) {
  const scoreItems = Object.entries(analysisResult.scores).map(([key, value]) => ({
    label: getScoreLabel(key),
    value: Math.round(value)
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4 flex items-center justify-between">
        <button onClick={onInviteFriends}>
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">分析結果</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 py-4">
        {imageUrl && (
          <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-8">
          {scoreItems.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 relative overflow-hidden">
              <div className="text-sm text-gray-500">{item.label}</div>
              <div className="text-3xl font-bold mt-1 relative">
                {item.value}
                {/* 強いモザイク効果 */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
              </div>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="h-full bg-green-500 rounded-full relative"
                  style={{ width: `${item.value}%` }}
                >
                  {/* 強いモザイク効果 */}
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* レーダーチャートのモザイク */}
        <div className="relative mb-8">
          <div className="w-full aspect-square rounded-2xl bg-gray-50 border border-gray-100">
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
          </div>
        </div>

        <div className="text-center text-gray-600 mb-8">
          結果を確認するには以下のいずれかを選択してください
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg border-t border-gray-200">
        <div className="space-y-4">
          <Button
            onClick={onGetPro}
            className="w-full"
            size="lg"
          >
            プレミアムメンバーになる
          </Button>

          <Button
            onClick={onInviteFriends}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <Users className="w-5 h-5" />
            友達3人を招待
          </Button>
        </div>

        <div className="text-center mt-4 text-sm text-gray-500">
          ¥600/週
        </div>
        <div className="flex justify-center gap-4 mt-4 text-xs text-gray-400">
          <button className="hover:text-gray-600">利用規約</button>
          <button className="hover:text-gray-600">購入を復元</button>
          <button className="hover:text-gray-600">プライバシーポリシー</button>
        </div>
      </div>
    </div>
  );
}

function getScoreLabel(key: string): string {
  const labels: Record<string, string> = {
    eyes: '目の印象',
    nose: '鼻筋',
    mouth: '口元',
    jawline: '輪郭',
    skin: '肌質',
    balance: 'バランス',
    hair: '髪型',
    total: '総合評価'
  };
  return labels[key] || key;
}