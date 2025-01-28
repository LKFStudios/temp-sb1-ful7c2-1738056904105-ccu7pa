import React from 'react';
import { XCircle, AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

export function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  return (
    <div className="fixed top-4 left-4 right-4 bg-red-500 text-white p-4 rounded-lg z-50 animate-fade-in shadow-lg">
      <div className="flex items-center justify-between gap-2">
        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        <p className="flex-1 text-sm">{message}</p>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}