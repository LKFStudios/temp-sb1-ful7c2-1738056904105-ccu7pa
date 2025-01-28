import { AnalysisResult } from '../../utils/types';

export interface AnalysisScores {
  total: number;
  eyes: number;
  nose: number;
  skin: number;
  jawline: number;
  hair: number;
}

export interface DetailedFeatureScore {
  size?: number;
  shape?: number;
  balance?: number;
  height?: number;
  bridge?: number;
  texture?: number;
  tone?: number;
  clarity?: number;
  definition?: number;
  angle?: number;
  quality?: number;
  volume?: number;
  style?: number;
  analysis?: string;
  improvement?: string;
}

export interface AnalysisDetailedScores {
  eyes: DetailedFeatureScore;
  nose: DetailedFeatureScore;
  skin: DetailedFeatureScore;
  jawline: DetailedFeatureScore;
  hair: DetailedFeatureScore;
}

export interface AnalysisDocument {
  id: string;
  timestamp: string;
  scores: AnalysisScores;
  detailedScores: AnalysisDetailedScores;
  imageUrl?: string | null;
}

export interface SaveAnalysisData {
  result: AnalysisResult;
  imageUrl?: string;
}