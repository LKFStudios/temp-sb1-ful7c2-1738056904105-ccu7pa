import React from 'react';
import { NavigationItemProps } from './types';

export function NavigationItem({ icon, label, isActive, onClick }: NavigationItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'text-green-600 bg-gray-50' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}