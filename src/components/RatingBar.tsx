import React from 'react';

interface RatingBarProps {
  label: string;
  value: number;
  color: 'green' | 'red' | 'orange' | 'yellow';
}

export function RatingBar({ label, value, color }: RatingBarProps) {
  const getColorClass = () => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'yellow': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColorClass()} transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}