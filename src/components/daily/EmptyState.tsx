import React from 'react';
import { Scan } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
        <Scan className="w-12 h-12 text-green-500" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 text-center mb-4">
        あなただけのMyルーティン
      </h1>
      <p className="text-gray-600 text-center mb-4 max-w-md">
        スキャンタブから顔写真をアップロードすると、
      </p>
      <p className="text-gray-600 text-center max-w-md">
        AIがあなたに最適なケアルーティンを提案します
      </p>
    </div>
  );
}