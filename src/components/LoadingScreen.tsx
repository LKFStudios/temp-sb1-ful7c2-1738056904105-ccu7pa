import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">読み込み中...</p>
      </div>
    </div>
  );
}