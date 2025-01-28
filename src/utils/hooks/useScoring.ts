import { useState } from 'react';
import { AnalysisResult, Gender } from '../types';
import { calculateScores, calculateTotalScores } from '../scoring';
import { analytics } from '../services/analytics';

export function useScoring() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateAnalysisScores = async (metrics: any, gender: Gender): Promise<AnalysisResult | null> => {
    try {
      setIsCalculating(true);
      setError(null);

      const detailedScores = calculateScores(metrics);
      const scores = calculateTotalScores(detailedScores, gender);

      analytics.track('Score Calculation Complete', {
        totalScore: scores.total,
        gender
      });

      return {
        scores,
        detailedScores,
        imageUrl: null,
        advice: {
          eyes: metrics.eyes.analysis || [],
          nose: metrics.nose.analysis || [],
          skin: metrics.skin.analysis || [],
          jawline: metrics.jawline.analysis || [],
          hair: metrics.hair.analysis || [],
          improvements: [
            ...(metrics.eyes.improvement || []),
            ...(metrics.nose.improvement || []),
            ...(metrics.skin.improvement || []),
            ...(metrics.jawline.improvement || []),
            ...(metrics.hair.improvement || [])
          ]
        }
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'スコア計算に失敗しました';
      setError(errorMessage);
      analytics.trackError(new Error(errorMessage));
      return null;
    } finally {
      setIsCalculating(false);
    }
  };

  return {
    calculateAnalysisScores,
    isCalculating,
    error,
    clearError: () => setError(null)
  };
}