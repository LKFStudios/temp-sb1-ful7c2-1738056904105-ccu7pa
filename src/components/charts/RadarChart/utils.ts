import { ChartPoint } from './types';

export function calculateChartPoints(
  centerX: number,
  centerY: number,
  radius: number,
  categories: string[]
): ChartPoint[] {
  return categories.map((_, index) => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });
}

export function normalizeScore(score: number): number {
  return score / 100;
}