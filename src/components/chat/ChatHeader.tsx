import React from 'react';
import { Sparkles } from 'lucide-react';
import { Gender } from '../../types';

interface ChatHeaderProps {
  emoji: string;
  title: string;
  description: string;
  gender: Gender;
  counselorImage?: string;
}

export function ChatHeader({ emoji, title, description, gender, counselorImage }: ChatHeaderProps) {
  const getBorderClass = () => {
    return gender === 'female'
      ? 'border-pink-100'
      : 'border-gray-200';
  };

  return (
    <div className={`px-6 py-4 bg-white sticky top-0 z-10 border-b ${getBorderClass()} shadow-sm`}>
      <h1 className="text-xl font-bold flex items-center gap-2">
        {counselorImage ? (
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={counselorImage} 
              alt="Counselor"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <span className="text-2xl">{emoji}</span>
        )}
        {title}
      </h1>
      <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
        <Sparkles className={`w-4 h-4 ${gender === 'female' ? 'text-pink-400' : 'text-green-500'}`} />
        {description}
      </p>
    </div>
  );
}