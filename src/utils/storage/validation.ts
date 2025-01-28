import { STORAGE_CONFIG } from './config';

export function validateStorageImage(blob: Blob): { isValid: boolean; error?: string } {
  if (blob.size > STORAGE_CONFIG.MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size exceeds ${STORAGE_CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB limit`
    };
  }

  if (!STORAGE_CONFIG.SUPPORTED_MIME_TYPES.includes(blob.type)) {
    return {
      isValid: false,
      error: 'Unsupported file type. Please use JPEG, PNG, or WebP'
    };
  }

  return { isValid: true };
}