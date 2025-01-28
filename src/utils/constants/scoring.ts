import { ScoreConfig, MetricsConfig } from '../types/scoring';

export const CATEGORY_SCORES: ScoreConfig = {
  eyes: {
    label: '目の分析',
    metrics: ['size', 'shape', 'balance']
  },
  nose: {
    label: '鼻の分析',
    metrics: ['height', 'bridge', 'shape']
  },
  skin: {
    label: '肌の分析',
    metrics: ['texture', 'tone', 'clarity']
  },
  jawline: {
    label: '輪郭の分析',
    metrics: ['definition', 'balance', 'angle']
  },
  hair: {
    label: '髪型の分析',
    metrics: ['quality', 'volume', 'style']
  }
};

export const CATEGORY_METRICS: MetricsConfig = {
  eyes: [
    { key: 'size', label: 'サイズ' },
    { key: 'shape', label: '形状' },
    { key: 'balance', label: 'バランス' }
  ],
  nose: [
    { key: 'height', label: '高さ' },
    { key: 'bridge', label: '鼻筋' },
    { key: 'shape', label: '形状' }
  ],
  skin: [
    { key: 'texture', label: '質感' },
    { key: 'tone', label: '色調' },
    { key: 'clarity', label: '透明感' }
  ],
  jawline: [
    { key: 'definition', label: 'シャープさ' },
    { key: 'balance', label: 'バランス' },
    { key: 'angle', label: '角度' }
  ],
  hair: [
    { key: 'quality', label: '質感' },
    { key: 'volume', label: 'ボリューム' },
    { key: 'style', label: 'スタイル' }
  ]
};

export const CATEGORY_LABELS: Record<string, string> = {
  eyes: '目の分析',
  nose: '鼻の分析',
  skin: '肌の分析',
  jawline: '輪郭の分析',
  hair: '髪型の分析'
};