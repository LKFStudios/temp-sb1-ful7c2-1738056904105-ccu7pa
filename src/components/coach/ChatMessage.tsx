import React from 'react';
import { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
}

export function ChatMessage({ message, onSuggestionClick }: ChatMessageProps) {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="space-y-4">
        <div
          className={`max-w-[80%] rounded-2xl px-4 py-2 ${
            message.isUser
              ? 'bg-green-500 text-white'
              : 'bg-gray-50 text-gray-900'
          }`}
        >
          {message.text}
        </div>
        
        {!message.isUser && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(suggestion)}
                className="text-sm text-gray-600 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
              >
                <span className="text-base">💭</span>
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}