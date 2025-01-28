import React from 'react';
import { Message } from '../../types/chat';
import { ChatSuggestions } from './ChatSuggestions';
import { Gender } from '../../types';

interface ChatMessageProps {
  message: Message;
  onSuggestionClick: (suggestion: string) => void;
  renderAvatar: (isUser: boolean) => React.ReactNode;
  gender: Gender;
}

export function ChatMessage({ message, onSuggestionClick, renderAvatar, gender }: ChatMessageProps) {
  const getMessageStyle = () => {
    if (gender === 'female') {
      return message.isUser
        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
        : 'bg-gray-50 shadow-sm border border-pink-100 text-gray-900';
    }
    return message.isUser
      ? 'bg-green-500 text-white'
      : 'bg-gray-50 text-gray-900';
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} gap-3 animate-fade-in`}>
      {!message.isUser && renderAvatar(false)}
      <div className="space-y-4 max-w-[80%]">
        <div className={`rounded-2xl px-4 py-2 ${getMessageStyle()}`}>
          {message.text}
        </div>
        
        {!message.isUser && message.suggestions && (
          <ChatSuggestions 
            suggestions={message.suggestions} 
            onClick={onSuggestionClick}
            gender={gender}
          />
        )}
      </div>
      {message.isUser && renderAvatar(true)}
    </div>
  );
}