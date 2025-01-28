import { env } from '../../config/env';

export const STORAGE_CONFIG = {
  BUCKET_NAME: 'analyses',
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  SUPPORTED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  PUBLIC_PATH: 'public',
  CACHE_CONTROL: '3600'
} as const;