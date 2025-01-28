export const ANALYSIS_STAGES = {
  IMAGE_LOADING: '画像読み込み',
  FACE_DETECTION: '顔検出',
  FEATURE_ANALYSIS: '特徴分析',
  SCORE_CALCULATION: 'スコア計算',
  COMPLETION: '完了'
} as const;

export const SCORE_RANGES = {
  EXCELLENT: { min: 81, max: 100 },
  GOOD: { min: 61, max: 80 },
  AVERAGE: { min: 41, max: 60 },
  BELOW_AVERAGE: { min: 21, max: 40 },
  POOR: { min: 0, max: 20 }
} as const;

export const FEATURE_WEIGHTS = {
  FEMALE: {
    eyes: 0.25,
    nose: 0.15,
    skin: 0.25,
    jawline: 0.15,
    hair: 0.20
  },
  MALE: {
    eyes: 0.25,
    nose: 0.20,
    skin: 0.20,
    jawline: 0.20,
    hair: 0.15
  }
} as const;