import React from 'react';
import { Scan } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-end pb-20">
        <div className="relative w-full h-[60vh] mb-6">
          <img
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=2070"
            alt="ビジュマックス"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
        </div>

        <div className="text-center px-4 relative z-10 w-full max-w-[320px]">
          <h1 className="text-3xl font-bold mb-4 text-black font-gothic">
            ビジュ<span className="text-green-500">マックス</span>
          </h1>
          <p className="text-base text-gray-700 mb-8 leading-relaxed font-gothic text-center">
            外見だけじゃなく内面まで高めていこう！
          </p>

          <div className="flex justify-center">
            <button
              onClick={onStart}
              className="bg-green-500 text-white w-full py-4 rounded-full text-base font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <Scan className="w-5 h-5" />
              診断を始める
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}