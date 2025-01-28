import { useState } from 'react';
import { AnalysisResult, Gender } from '../types';
import { analyzeFace } from '../faceAnalysis';
import { analytics } from '../services/analytics';

export function useAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({ stage: '', progress: 0 });

  const analyze = async (imageData: string, gender: Gender): Promise<AnalysisResult | null> => {
    try {
      setIsAnalyzing(true);
      setError(null);
      
      const result = await analyzeFace(
        imageData, 
        gender,
        (stage, progress) => setProgress({ stage, progress })
      );

      analytics.track('Analysis Complete', {
        gender,
        hasImage: !!imageData
      });

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '分析に失敗しました';
      setError(errorMessage);
      analytics.trackError(new Error(errorMessage));
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyze,
    isAnalyzing,
    error,
    progress,
    clearError: () => setError(null)
  };
}