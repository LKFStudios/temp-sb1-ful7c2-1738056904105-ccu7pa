import React from 'react';
import { Send } from 'lucide-react';
import { Gender } from '../../types';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  placeholder: string;
  gender: Gender;
}

export function ChatInput({ value, onChange, onSend, isLoading, placeholder, gender }: ChatInputProps) {
  const getStyles = () => {
    return {
      container: 'border-gray-200',
      input: 'focus:ring-green-500 border-gray-200',
      button: 'bg-green-500 hover:bg-green-600'
    };
  };

  const styles = getStyles();

  return (
    <div className={`sticky bottom-0 px-6 py-4 bg-white border-t ${styles.container} shadow-lg`}>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder={placeholder}
          className={`flex-1 bg-gray-50 text-gray-900 rounded-full px-6 py-3 focus:outline-none focus:ring-2 ${styles.input} shadow-sm`}
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          className={`${styles.button} text-white px-6 py-3 rounded-full font-medium transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm transform hover:scale-105 active:scale-95`}
        >
          <Send className="w-4 h-4" />
          送信
        </button>
      </div>
    </div>
  );
}