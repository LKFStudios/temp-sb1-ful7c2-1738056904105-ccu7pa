import React from 'react';
import { Gender } from '../../types';

interface LoadingIndicatorProps {
  gender: Gender;
}

export function LoadingIndicator({ gender }: LoadingIndicatorProps) {
  const getColor = () => gender === 'female' ? 'text-pink-500' : 'text-green-500';

  return (
    <div className={`flex items-center gap-2 ${getColor()} animate-pulse`}>
      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}