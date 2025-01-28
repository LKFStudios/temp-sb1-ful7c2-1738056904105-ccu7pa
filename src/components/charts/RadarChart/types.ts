export interface RadarChartProps {
  scores: {
    eyes: number;
    nose: number;
    skin: number;
    jawline: number;
    hair: number;
  };
  size?: number;
  className?: string;
}

export interface ChartPoint {
  x: number;
  y: number;
}