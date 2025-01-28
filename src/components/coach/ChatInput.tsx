import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSend, isLoading }: ChatInputProps) {
  return (
    <div className="px-6 py-4 border-t border-gray-200">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="メッセージを入力..."
          className="flex-1 bg-gray-50 text-gray-900 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={onSend}
          disabled={!value.trim() || isLoading}
          className="bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          送信
        </button>
      </div>
    </div>
  );
}