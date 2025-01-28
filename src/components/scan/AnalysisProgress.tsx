import React from 'react';
import { Loader2 } from 'lucide-react';
import { ANALYSIS_STAGES } from '../../utils/constants/analysis';

interface AnalysisProgressProps {
  stage: string;
  progress: number;
}

export function AnalysisProgress({ stage, progress }: AnalysisProgressProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
      <Loader2 className="w-12 h-12 text-green-500 animate-spin mb-4" />
      <div className="text-white text-xl font-bold mb-2">
        {stage === ANALYSIS_STAGES.FEATURE_ANALYSIS ? '分析中' : stage}
      </div>
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-white/80 mt-2">{Math.round(progress)}%</div>
    </div>
  );
}