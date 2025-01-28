import { AnalysisMetrics } from './types';

function normalizeSkinScore(score: number, category: 'texture' | 'tone' | 'clarity'): number {
  // Ensure score is between 0-10
  let normalizedScore = Math.max(0, Math.min(10, score));

  // Apply specific adjustments for skin metrics
  switch (category) {
    case 'texture':
      // Texture scores are slightly more strict
      normalizedScore = normalizedScore * 0.9;
      break;
    case 'tone':
      // Tone scores are evaluated normally
      break;
    case 'clarity':
      // Clarity scores are slightly more lenient
      normalizedScore = normalizedScore * 0.95;
      break;
  }

  return Math.round(normalizedScore * 10) / 10; // Round to 1 decimal place
}

function normalizeScore(value: any): number {
  if (typeof value !== 'number' || isNaN(value)) {
    return 7; // Default score for invalid values
  }
  
  // Ensure score is between 0-10 and apply a general normalization
  const score = Math.max(0, Math.min(10, value));
  return Math.round(score * 0.9 * 10) / 10; // Slightly stricter scoring, round to 1 decimal
}

export function normalizeMetrics(metrics: any): AnalysisMetrics {
  const normalized: AnalysisMetrics = {
    eyes: {
      size: normalizeScore(metrics?.eyes?.size),
      shape: normalizeScore(metrics?.eyes?.shape),
      balance: normalizeScore(metrics?.eyes?.balance),
      analysis: metrics?.eyes?.analysis || [],
      improvement: metrics?.eyes?.improvement || []
    },
    nose: {
      height: normalizeScore(metrics?.nose?.height),
      bridge: normalizeScore(metrics?.nose?.bridge),
      shape: normalizeScore(metrics?.nose?.shape),
      analysis: metrics?.nose?.analysis || [],
      improvement: metrics?.nose?.improvement || []
    },
    skin: {
      texture: normalizeSkinScore(normalizeScore(metrics?.skin?.texture), 'texture'),
      tone: normalizeSkinScore(normalizeScore(metrics?.skin?.tone), 'tone'),
      clarity: normalizeSkinScore(normalizeScore(metrics?.skin?.clarity), 'clarity'),
      analysis: metrics?.skin?.analysis || [],
      improvement: metrics?.skin?.improvement || []
    },
    jawline: {
      definition: normalizeScore(metrics?.jawline?.definition),
      balance: normalizeScore(metrics?.jawline?.balance),
      angle: normalizeScore(metrics?.jawline?.angle),
      analysis: metrics?.jawline?.analysis || [],
      improvement: metrics?.jawline?.improvement || []
    },
    hair: {
      quality: normalizeScore(metrics?.hair?.quality),
      volume: normalizeScore(metrics?.hair?.volume),
      style: normalizeScore(metrics?.hair?.style),
      analysis: metrics?.hair?.analysis || [],
      improvement: metrics?.hair?.improvement || []
    }
  };

  return normalized;
}