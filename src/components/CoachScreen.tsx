import React from 'react';
import { useChat } from '../hooks/useChat';
import { useGender } from '../context/GenderContext';
import { coachConfigs } from '../config/coach';
import { ChatHeader } from './chat/ChatHeader';
import { ChatInput } from './chat/ChatInput';
import { ChatMessage } from './chat/ChatMessage';
import { LoadingIndicator } from './chat/LoadingIndicator';

interface CoachScreenProps {
  onSubscribe: () => void;
}

export function CoachScreen({ onSubscribe }: CoachScreenProps) {
  const { gender } = useGender();
  const { messages, inputText, isLoading, setInputText, sendMessage } = useChat();
  const config = coachConfigs[gender];

  const renderAvatar = (isUser: boolean) => {
    if (gender === 'female') {
      return (
        <div className={`w-10 h-10 rounded-full ${isUser ? 'bg-purple-50' : 'bg-white'} flex items-center justify-center flex-shrink-0 shadow-sm border ${isUser ? 'border-purple-100' : 'border-pink-100'} overflow-hidden`}>
          {isUser ? (
            <span className="text-xl">👩</span>
          ) : (
            <img 
              src="https://i.pinimg.com/736x/dc/d7/c3/dcd7c3dcc209d90825c58723966c0353.jpg" 
              alt="Counselor"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <span className="text-xl">{isUser ? '👤' : config.emoji}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ChatHeader
        emoji={gender === 'female' ? '' : config.emoji}
        title={config.title}
        description={config.description}
        gender={gender}
        counselorImage={gender === 'female' ? "https://i.pinimg.com/736x/dc/d7/c3/dcd7c3dcc209d90825c58723966c0353.jpg" : undefined}
      />

      <div className="flex-1 px-6 py-4 overflow-y-auto space-y-6 pb-24">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onSuggestionClick={sendMessage}
            renderAvatar={renderAvatar}
            gender={gender}
          />
        ))}
        {isLoading && <LoadingIndicator gender={gender} />}
      </div>

      <ChatInput
        value={inputText}
        onChange={setInputText}
        onSend={() => sendMessage(inputText)}
        isLoading={isLoading}
        placeholder={config.placeholder}
        gender={gender}
      />
    </div>
  );
}