import React from 'react';
import { ArrowDown } from 'lucide-react';

interface DistributionGraphProps {
  score: number;
  percentile: number;
}

export function DistributionGraph({ score, percentile }: DistributionGraphProps) {
  const generateNormalDistribution = () => {
    const points: [number, number][] = [];
    for (let x = -4; x <= 4; x += 0.1) {
      const y = Math.exp(-(x * x) / 2) / Math.sqrt(2 * Math.PI);
      points.push([x, y]);
    }
    return points;
  };

  const points = generateNormalDistribution();
  const maxY = Math.max(...points.map(([_, y]) => y));
  
  const percentileToX = (p: number) => {
    return -1.96 * (p / 100 - 0.5);
  };

  const currentX = percentileToX(percentile);
  
  const getScoreColor = (score: number) => {
    if (score >= 81) return 'text-green-500';
    if (score >= 61) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <div className="relative h-32">
        <svg
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d={`M ${points.map(([x, y]) => `${(x + 4) * 12.5} ${40 - y * 40 / maxY}`).join(' L ')}`}
            fill="none"
            stroke="#22C55E"
            strokeWidth="2"
          />
          <line
            x1={`${(currentX + 4) * 12.5}%`}
            y1="0"
            x2={`${(currentX + 4) * 12.5}%`}
            y2="40"
            stroke="#22C55E"
            strokeWidth="2"
            strokeDasharray="2 2"
          />
        </svg>

        {/* Position Arrow */}
        <div 
          className="absolute top-0 transform -translate-x-1/2"
          style={{ left: `${(currentX + 4) * 12.5}%` }}
        >
          <ArrowDown className={`w-6 h-6 ${getScoreColor(score)}`} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 mt-2">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}