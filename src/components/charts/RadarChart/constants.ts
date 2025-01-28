import { Gender } from '../../../types';

export const CATEGORY_LABELS: Record<Gender, Record<string, string>> = {
  female: {
    eyes: '目元',
    nose: '鼻筋',
    skin: '肌質',
    jawline: '輪郭',
    hair: '髪型'
  },
  male: {
    eyes: '目',
    nose: '鼻',
    skin: '肌',
    jawline: '輪郭',
    hair: '髪型'
  }
};

export const CHART_CONFIG = {
  LEVELS: 5,
  LABEL_DISTANCE: 1.6,
  POINT_RADIUS: 4,
  LINE_WIDTH: 2
} as const;