import React, { useState } from 'react';
import { Users } from 'lucide-react';

interface ReferralScreenProps {
  onContinue: () => void;
}

export function ReferralScreen({ onContinue }: ReferralScreenProps) {
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md flex gap-2 mb-12">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full ${
                step === 2 ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-12 text-center font-gothic">
          紹介コードをお持ちですか？
        </h1>

        <div className="w-24 h-24 bg-green-50 rounded-full mb-12 flex items-center justify-center">
          <Users className="w-12 h-12 text-green-500" />
        </div>

        <div className="w-full max-w-md space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="紹介コードを入力"
            className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            onClick={onContinue}
            className="w-full bg-green-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
          >
            {code ? 'コードを適用して次へ' : 'スキップして次へ'}
          </button>
        </div>
      </div>
    </div>
  );
}