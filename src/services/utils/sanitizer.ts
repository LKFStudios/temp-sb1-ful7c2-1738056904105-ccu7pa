import { AnalysisResult } from '../../utils/types';
import { AnalysisDocument, DetailedFeatureScore } from '../types/analysis';

function sanitizeNumber(value: any): number {
  const num = Number(value);
  return isNaN(num) ? 0 : Math.max(0, Math.min(100, Math.round(num)));
}

function sanitizeString(value: string, maxLength: number = 500): string {
  return typeof value === 'string' ? value.slice(0, maxLength) : '';
}

function sanitizeDetailedScore(data: any): DetailedFeatureScore {
  if (!data || typeof data !== 'object') {
    return {};
  }

  const score: DetailedFeatureScore = {};
  const numericFields = ['size', 'shape', 'balance', 'height', 'bridge', 'texture', 
                        'tone', 'clarity', 'definition', 'angle', 'quality', 'volume', 'style'];
  const stringFields = ['analysis', 'improvement'];

  numericFields.forEach(field => {
    if (field in data) {
      score[field as keyof DetailedFeatureScore] = sanitizeNumber(data[field]);
    }
  });

  stringFields.forEach(field => {
    if (field in data) {
      score[field as keyof DetailedFeatureScore] = sanitizeString(data[field]);
    }
  });

  return score;
}

export function sanitizeAnalysisData(result: AnalysisResult): Omit<AnalysisDocument, 'userId' | 'timestamp' | 'imageUrl'> {
  if (!result || !result.scores || !result.detailedScores) {
    throw new Error('Invalid analysis result data');
  }

  return {
    scores: {
      total: sanitizeNumber(result.scores.total),
      eyes: sanitizeNumber(result.scores.eyes),
      nose: sanitizeNumber(result.scores.nose),
      skin: sanitizeNumber(result.scores.skin),
      jawline: sanitizeNumber(result.scores.jawline),
      hair: sanitizeNumber(result.scores.hair)
    },
    detailedScores: {
      eyes: sanitizeDetailedScore(result.detailedScores.eyes),
      nose: sanitizeDetailedScore(result.detailedScores.nose),
      skin: sanitizeDetailedScore(result.detailedScores.skin),
      jawline: sanitizeDetailedScore(result.detailedScores.jawline),
      hair: sanitizeDetailedScore(result.detailedScores.hair)
    }
  };
}

export function sanitizeImageUrl(imageUrl: string): string {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return '';
  }
  
  const base64Regex = /^data:image\/[a-z]+;base64,/;
  const sanitized = imageUrl.replace(base64Regex, '');
  return sanitized.slice(0, 1024 * 1024); // Limit to 1MB of base64 data
}