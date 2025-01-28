import React from 'react';
import { MessageCircle } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
        <MessageCircle className="w-8 h-8 text-green-500" />
      </div>
      <div>
        <p className="font-medium">AIパーソナルコーチ</p>
        <p className="text-sm mt-1">
          外見や内面の魅力を高めるためのアドバイスを提供します。<br />
          気になることを相談してください。
        </p>
      </div>
    </div>
  );
}