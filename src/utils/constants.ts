// Image processing constants
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Analysis constants
export const PERCENTILE_RANKS = {
  90: 1,   // 90点以上: 上位1%
  80: 5,   // 80点以上: 上位5%
  70: 10,  // 70点以上: 上位10%
  60: 20,  // 60点以上: 上位20%
  50: 30,  // 50点以上: 上位30%
  0: 50    // その他: 上位50%
} as const;

// Female scoring weights (must sum to 1)
export const FEMALE_SCORE_WEIGHTS = {
  eyes: 0.25,     // 目は印象を大きく左右する
  nose: 0.15,     // 鼻は全体的なバランスに影響
  skin: 0.25,     // 肌の状態は女性の魅力に重要
  jawline: 0.15,  // フェイスラインは小顔効果に関係
  hair: 0.2       // 髪型は全体的な印象を決める
} as const;

// Male scoring weights (must sum to 1)
export const MALE_SCORE_WEIGHTS = {
  eyes: 0.25,    // 目は印象に大きく影響
  nose: 0.2,     // 鼻筋は男性的な印象に重要
  skin: 0.2,     // 肌の質感は清潔感に関係
  jawline: 0.2,  // フェイスラインは男性的な印象を決める
  hair: 0.15     // 髪型は変更可能な要素
} as const;

// Category labels
export const CATEGORY_LABELS = {
  eyes: '目元',
  nose: '鼻',
  skin: '肌',
  jawline: 'フェイスライン',
  hair: '髪型'
} as const;