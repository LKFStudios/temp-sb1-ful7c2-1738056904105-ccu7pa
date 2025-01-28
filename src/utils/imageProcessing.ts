import { MAX_IMAGE_SIZE, SUPPORTED_MIME_TYPES } from './constants';
import { analytics } from '../services/analytics';

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

export async function validateImage(file: File): Promise<ImageValidationResult> {
  try {
    // Check file size
    if (file.size > MAX_IMAGE_SIZE) {
      return {
        isValid: false,
        error: `画像サイズが大きすぎます。${Math.floor(MAX_IMAGE_SIZE / 1024 / 1024)}MB以下にしてください。`
      };
    }

    // Check file type
    if (!SUPPORTED_MIME_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: 'JPG、PNG、WebP形式の画像のみ対応しています。'
      };
    }

    // Additional validation could be added here
    // e.g., checking image dimensions, etc.

    return { isValid: true };
  } catch (error) {
    console.error('Image validation error:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Image validation failed'));
    return {
      isValid: false,
      error: '画像の検証に失敗しました'
    };
  }
}

export async function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('画像の読み込みに失敗しました'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('画像の読み込みに失敗しました'));
    };

    reader.readAsDataURL(file);
  });
}

export async function compressImage(base64: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context creation failed'));
        return;
      }

      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      const maxDimension = 1200;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Use lower quality for larger images
      const quality = Math.min(0.8, 1000000 / (width * height));
      resolve(canvas.toDataURL('image/jpeg', quality));
    };

    img.onerror = () => {
      reject(new Error('画像の圧縮に失敗しました'));
    };

    img.src = base64;
  });
}