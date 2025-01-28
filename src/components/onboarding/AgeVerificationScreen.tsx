import React, { useState } from 'react';
import { User, ChevronRight } from 'lucide-react';
import { useGender } from '../../context/GenderContext';
import { Gender } from '../../types';
import { AgePicker } from '../common/AgePicker';

interface AgeVerificationScreenProps {
  onContinue: () => void;
}

export function AgeVerificationScreen({ onContinue }: AgeVerificationScreenProps) {
  const [age, setAge] = useState<number | null>(null);
  const [showAgePicker, setShowAgePicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState<Gender | ''>('');
  const [error, setError] = useState<string | null>(null);
  const { setGender: setGlobalGender } = useGender();

  const handleSubmit = () => {
    if (!selectedGender) {
      setError('性別を選択してください');
      return;
    }

    if (!age) {
      setError('年齢を選択してください');
      return;
    }

    if (age < 13) {
      setError('13歳以上である必要があります');
      return;
    }

    setGlobalGender(selectedGender);
    onContinue();
  };

  const getGenderButtonStyle = (gender: Gender) => {
    const baseStyle = "py-3 px-4 rounded-lg text-sm font-medium transition-colors";
    
    if (selectedGender === gender) {
      switch (gender) {
        case 'male':
          return `${baseStyle} bg-blue-500 text-white`;
        case 'female':
          return `${baseStyle} bg-pink-500 text-white`;
        default:
          return `${baseStyle} bg-gray-500 text-white`;
      }
    }
    
    return `${baseStyle} bg-white hover:bg-gray-50 text-gray-900 border border-gray-200`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md flex gap-2 mb-12">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full ${
                step === 3 ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-12 text-center font-gothic">
          プロフィールを教えてください
        </h1>

        <div className="w-24 h-24 bg-green-50 rounded-full mb-12 flex items-center justify-center">
          <User className="w-12 h-12 text-green-500" />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              性別
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setError(null);
                  setSelectedGender('male');
                }}
                className={getGenderButtonStyle('male')}
              >
                男性
              </button>
              <button
                onClick={() => {
                  setError(null);
                  setSelectedGender('female');
                }}
                className={getGenderButtonStyle('female')}
              >
                女性
              </button>
              <button
                onClick={() => {
                  setError(null);
                  setSelectedGender('unspecified');
                }}
                className={getGenderButtonStyle('unspecified')}
              >
                指定しない
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              年齢
            </label>
            <button
              onClick={() => setShowAgePicker(true)}
              className="w-full bg-white text-gray-900 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 flex items-center justify-between"
            >
              <span className="text-base">
                {age ? `${age}歳` : '年齢を選択'}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
          >
            次へ進む
          </button>
        </div>
      </div>

      {showAgePicker && (
        <AgePicker
          onSelect={setAge}
          onClose={() => setShowAgePicker(false)}
        />
      )}
    </div>
  );
}