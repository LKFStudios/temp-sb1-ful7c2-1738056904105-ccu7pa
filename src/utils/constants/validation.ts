export const IMAGE_VALIDATION = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MIN_DIMENSIONS: { width: 200, height: 200 },
  MAX_DIMENSIONS: { width: 4096, height: 4096 }
} as const;

export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: 'ファイルサイズが大きすぎます（上限: 10MB）',
  UNSUPPORTED_TYPE: '対応していないファイル形式です（JPG, PNG, WebPのみ対応）',
  INVALID_DIMENSIONS: '画像サイズが対応範囲外です',
  PROCESSING_ERROR: '画像の処理中にエラーが発生しました'
} as const;