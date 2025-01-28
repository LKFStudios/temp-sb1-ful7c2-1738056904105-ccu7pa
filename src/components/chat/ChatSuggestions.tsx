import React from 'react';
import { Gender } from '../../types';

interface ChatSuggestionsProps {
  suggestions: string[];
  onClick: (suggestion: string) => void;
  gender: Gender;
}

export function ChatSuggestions({ suggestions, onClick, gender }: ChatSuggestionsProps) {
  const getSuggestionStyle = () => {
    if (gender === 'female') {
      return 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 text-green-700 border-green-200';
    }
    return 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onClick(suggestion)}
          className={`text-sm ${getSuggestionStyle()} px-4 py-2 rounded-full transition-all flex items-center gap-1 border shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95`}
        >
          <span className="text-base">💭</span>
          {suggestion}
        </button>
      ))}
    </div>
  );
}