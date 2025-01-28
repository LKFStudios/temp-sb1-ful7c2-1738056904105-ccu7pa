import React from 'react';
import { useGender } from '../context/GenderContext';
import { Scan, CheckCircle, MessageCircle, Settings } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const { gender } = useGender();

  const navItems = gender === 'female' ? [
    { 
      id: 'scan',
      icon: <Scan className="w-5 h-5" />, 
      label: "診断"
    },
    { 
      id: 'daily',
      icon: <CheckCircle className="w-5 h-5" />, 
      label: "デイリー"
    },
    { 
      id: 'coach',
      icon: <MessageCircle className="w-5 h-5" />, 
      label: "カウンセラー"
    },
    { 
      id: 'settings',
      icon: <Settings className="w-5 h-5" />, 
      label: "設定"
    }
  ] : [
    { 
      id: 'scan',
      icon: <Scan className="w-5 h-5" />, 
      label: "スキャン"
    },
    { 
      id: 'daily',
      icon: <CheckCircle className="w-5 h-5" />, 
      label: "デイリー"
    },
    { 
      id: 'coach',
      icon: <MessageCircle className="w-5 h-5" />, 
      label: "コーチ"
    },
    { 
      id: 'settings',
      icon: <Settings className="w-5 h-5" />, 
      label: "設定"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-white/95 backdrop-blur-lg border-t border-gray-200">
        <div className="max-w-md mx-auto px-2">
          <div className="flex justify-around items-center py-2 pb-safe">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  currentScreen === item.id 
                    ? 'text-green-600 bg-gray-50' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}