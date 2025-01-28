import React from 'react';
import { Star } from 'lucide-react';

interface RatingScreenProps {
  onContinue: () => void;
}

export function RatingScreen({ onContinue }: RatingScreenProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Progress Bar */}
        <div className="w-full max-w-md flex gap-2 mb-12">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full ${
                step === 1 ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-12 text-center leading-tight font-gothic">
          100万人以上が<br />利用しています
        </h1>

        <div className="w-48 h-48 bg-white rounded-[2rem] shadow-lg mb-12 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text">
              U
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-8 h-8 text-yellow-400 fill-yellow-400"
            />
          ))}
        </div>

        <button
          onClick={onContinue}
          className="w-full max-w-md bg-green-500 text-white py-4 rounded-full text-xl font-semibold hover:bg-green-600 transition-colors"
        >
          次へ進む
        </button>
      </div>
    </div>
  );
}