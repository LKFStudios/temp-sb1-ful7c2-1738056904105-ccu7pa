import { useState } from 'react';
import { Message } from '../types/chat';
import { getCoachingResponse } from '../utils/coaching/api';
import { useGender } from '../context/GenderContext';
import { coachConfigs } from '../config/coach';

export function useChat() {
  const { gender } = useGender();
  const config = coachConfigs[gender];
  
  const getWelcomeMessage = (): Message => ({
    id: 'welcome',
    text: config.welcomeMessage,
    isUser: false,
    suggestions: config.defaultQuestions
  });

  const [messages, setMessages] = useState<Message[]>([getWelcomeMessage()]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await getCoachingResponse(text, gender);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isUser: false,
        suggestions: response.followUpQuestions
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    inputText,
    isLoading,
    setInputText,
    sendMessage
  };
}