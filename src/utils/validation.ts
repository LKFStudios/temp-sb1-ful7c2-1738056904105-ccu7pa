import { AnalysisResult, Scores, Advice } from './types';

export function isValidScore(score: unknown): score is number {
  return typeof score === 'number' && score >= 0 && score <= 100;
}

export function isValidAdvice(advice: unknown): advice is Advice {
  if (!advice || typeof advice !== 'object') return false;
  const { strengths, improvements } = advice as Advice;
  return Array.isArray(strengths) && Array.isArray(improvements) &&
    strengths.length > 0 && improvements.length > 0 &&
    strengths.every(s => typeof s === 'string') &&
    improvements.every(i => typeof i === 'string');
}

export function validateAnalysisResult(data: unknown): AnalysisResult | null {
  if (!data || typeof data !== 'object') return null;

  const result = data as AnalysisResult;
  const scores = result.scores;
  const advice = result.advice;

  if (!scores || !advice) return null;

  const isValidScores = Object.entries(scores).every(
    ([key, value]) => key in scores && isValidScore(value)
  );

  const isValidAdvices = Object.entries(advice).every(
    ([key, value]) => key in scores && isValidAdvice(value)
  );

  return isValidScores && isValidAdvices ? result : null;
}