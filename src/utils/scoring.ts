import { DetailedScores, Scores, AnalysisMetrics } from './types';
import { FEMALE_SCORE_WEIGHTS, MALE_SCORE_WEIGHTS } from './constants';
import { Gender } from './types';

function calculateFeatureScore(scores: number[]): number {
  const validScores = scores.filter(score => !isNaN(score) && score !== null);
  if (validScores.length === 0) return 0;
  
  const average = validScores.reduce((a, b) => a + b, 0) / validScores.length;
  return Math.round(average * 10); // Convert 0-10 scale to 0-100
}

export function calculateScores(metrics: AnalysisMetrics): DetailedScores {
  return metrics;
}

export function calculateTotalScores(detailed: DetailedScores, gender: Gender): Scores {
  const weights = gender === 'female' ? FEMALE_SCORE_WEIGHTS : MALE_SCORE_WEIGHTS;

  const calculateCategoryScore = (scores: number[]): number => {
    const validScores = scores.filter(score => !isNaN(score) && score !== null);
    if (validScores.length === 0) return 0;
    
    const average = validScores.reduce((a, b) => a + b, 0) / validScores.length;
    return Math.round(average * 10); // Convert 0-10 scale to 0-100
  };

  const eyesScore = calculateCategoryScore([
    detailed.eyes.size,
    detailed.eyes.shape,
    detailed.eyes.balance
  ]);

  const noseScore = calculateCategoryScore([
    detailed.nose.height,
    detailed.nose.bridge,
    detailed.nose.shape
  ]);

  const skinScore = calculateCategoryScore([
    detailed.skin.texture,
    detailed.skin.tone,
    detailed.skin.clarity
  ]);

  const jawlineScore = calculateCategoryScore([
    detailed.jawline.definition,
    detailed.jawline.balance,
    detailed.jawline.angle
  ]);

  const hairScore = calculateCategoryScore([
    detailed.hair.quality,
    detailed.hair.volume,
    detailed.hair.style
  ]);

  // Calculate weighted total score
  const totalScore = Math.round(
    eyesScore * weights.eyes +
    noseScore * weights.nose +
    skinScore * weights.skin +
    jawlineScore * weights.jawline +
    hairScore * weights.hair
  );

  return {
    eyes: eyesScore,
    nose: noseScore,
    skin: skinScore,
    jawline: jawlineScore,
    hair: hairScore,
    total: totalScore
  };
}

export function calculatePercentile(score: number): number {
  if (score >= 95) return 1;  // 95-100点: 上位1%
  if (score >= 91) return 5;  // 91-94点: 上位5%
  if (score >= 81) return 10; // 81-90点: 上位10%
  if (score >= 71) return 20; // 71-80点: 上位20%
  if (score >= 61) return 30; // 61-70点: 上位30%
  if (score >= 51) return 40; // 51-60点: 上位40%
  return 50;                  // 0-50点: 上位50%
}

export function calculatePotentialScore(currentScore: number): number {
  if (currentScore >= 90) {
    return Math.round(currentScore + (100 - currentScore) * 0.5);
  }
  
  const baseImprovement = Math.min(30, 100 - currentScore);
  const potentialScore = currentScore + baseImprovement;
  
  return Math.min(100, Math.round(potentialScore));
}

export function getScoreColor(score: number): string {
  if (score >= 81) return 'bg-gradient-to-r from-green-400 to-green-500';
  if (score >= 61) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
  return 'bg-gradient-to-r from-red-400 to-red-500';
}