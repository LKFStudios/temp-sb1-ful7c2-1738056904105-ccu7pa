import React, { useState } from 'react';
import { Star, ChevronRight, HelpCircle, User } from 'lucide-react';
import { SupportScreen } from './SupportScreen';
import { useGender } from '../context/GenderContext';
import { Gender } from '../types';

interface SettingsScreenProps {
  onLogout?: () => void;
}

export function SettingsScreen({ onLogout }: SettingsScreenProps) {
  const [showSupport, setShowSupport] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const { gender, setGender } = useGender();

  const getGenderLabel = (gender: Gender): string => {
    switch (gender) {
      case 'male':
        return '男性';
      case 'female':
        return '女性';
      default:
        return '指定しない';
    }
  };

  const getGenderIconColor = (gender: Gender): string => {
    switch (gender) {
      case 'male':
        return 'text-blue-500';
      case 'female':
        return 'text-pink-500';
      default:
        return 'text-gray-500';
    }
  };

  const settingsItems = [
    {
      icon: <User className={`w-6 h-6 ${getGenderIconColor(gender)}`} />,
      label: '性別設定',
      sublabel: getGenderLabel(gender),
      onClick: () => setShowGenderModal(true)
    },
    {
      icon: <Star className="w-6 h-6 text-yellow-400" />,
      label: 'アプリを評価する',
      onClick: () => window.open('https://apps.apple.com', '_blank')
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-green-400" />,
      label: 'サポート・お問い合わせ',
      onClick: () => setShowSupport(true)
    }
  ];

  const footerItems = [
    {
      label: 'プライバシーポリシー',
      onClick: () => window.open('https://lkfstudios.com/policies/privacy-policy', '_blank')
    },
    {
      label: '利用規約',
      onClick: () => window.open('https://lkfstudios.com/policies/terms-of-service', '_blank')
    },
    {
      label: '特定商取引法に基づく表示',
      onClick: () => window.open('https://lkfstudios.com/pages/%E7%89%B9%E5%AE%9A%E5%95%86%E5%8F%96%E5%BC%95%E6%B3%95%E3%81%AB%E3%81%8D', '_blank')
    }
  ];

  if (showSupport) {
    return <SupportScreen onClose={() => setShowSupport(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">その他</h1>
      </div>

      <div className="px-6 py-4 space-y-4 pb-24">
        {settingsItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <div className="text-left">
                <span className="text-lg font-medium text-gray-900">
                  {item.label}
                </span>
                {item.sublabel && (
                  <p className="text-sm text-gray-500 mt-1">{item.sublabel}</p>
                )}
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        ))}

        <div className="pt-4 space-y-4">
          {footerItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg font-medium text-gray-900">
                {item.label}
              </span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {showGenderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-900">性別設定</h2>
            <div className="space-y-3">
              {[
                { value: 'male' as Gender, label: '男性', iconColor: 'text-blue-500' },
                { value: 'female' as Gender, label: '女性', iconColor: 'text-pink-500' },
                { value: 'unspecified' as Gender, label: '指定しない', iconColor: 'text-gray-500' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setGender(option.value);
                    setShowGenderModal(false);
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-left transition-colors flex items-center gap-3 ${
                    gender === option.value
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <User className={`w-5 h-5 ${option.iconColor}`} />
                  {option.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowGenderModal(false)}
              className="w-full mt-4 py-3 text-gray-500 font-medium"
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </div>
  );
}