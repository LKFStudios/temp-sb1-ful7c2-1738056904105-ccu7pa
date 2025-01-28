import React, { useState } from 'react';

interface ReferralScreenProps {
  onContinue: () => void;
}

export function ReferralScreen({ onContinue }: ReferralScreenProps) {
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start px-6 pt-12">
        {/* Progress Bar */}
        <div className="w-full max-w-md flex gap-2 mb-12">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full ${
                step === 2 ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-12 font-gothic">
          紹介コードをお持ちですか？
        </h1>

        <div className="w-full max-w-md space-y-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="コードを入力してください"
            className="w-full bg-gray-100 text-gray-900 px-6 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-200"
          />
          <p className="text-sm text-gray-500 text-center">
            コードをお持ちでない方はスキップできます
          </p>
        </div>

        <div className="fixed bottom-8 left-6 right-6">
          <button
            onClick={onContinue}
            className="w-full max-w-md mx-auto bg-green-500 text-white py-4 rounded-full text-xl font-semibold hover:bg-green-600 transition-colors block"
          >
            次へ進む
          </button>
        </div>
      </div>
    </div>
  );
}