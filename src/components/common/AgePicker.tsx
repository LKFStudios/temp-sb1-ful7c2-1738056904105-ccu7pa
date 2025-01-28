import React from 'react';
import { ChevronRight } from 'lucide-react';

interface AgePickerProps {
  onSelect: (age: number) => void;
  onClose: () => void;
}

export function AgePicker({ onSelect, onClose }: AgePickerProps) {
  // 18-100歳の配列を生成
  const ages = Array.from({ length: 83 }, (_, i) => i + 18);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="text-gray-500"
          >
            キャンセル
          </button>
          <h3 className="text-lg font-medium">年齢を選択</h3>
          <div className="w-16" />
        </div>
        
        <div className="overflow-y-auto max-h-[calc(80vh-64px)]">
          {ages.map((age) => (
            <button
              key={age}
              onClick={() => {
                onSelect(age);
                onClose();
              }}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{age}歳</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}