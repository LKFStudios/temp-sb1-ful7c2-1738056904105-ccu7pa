import { DetailedScores as BaseDetailedScores } from '../types';

export interface CategoryScore {
  label: string;
  metrics: string[];
}

export interface CategoryMetric {
  key: string;
  label: string;
}

export interface ScoreConfig {
  [key: string]: CategoryScore;
}

export interface MetricsConfig {
  [key: string]: CategoryMetric[];
}

export type { BaseDetailedScores as DetailedScores };