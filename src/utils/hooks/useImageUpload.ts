import { useState } from 'react';
import { validateImage, convertToBase64, compressImage } from '../imageProcessing';
import { analytics } from '../services/analytics';

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      setError(null);

      const validationResult = await validateImage(file);
      if (!validationResult.isValid) {
        throw new Error(validationResult.error || '画像の検証に失敗しました');
      }

      const base64 = await convertToBase64(file);
      const compressed = await compressImage(base64);

      analytics.track('Image Upload Success', {
        size: file.size,
        type: file.type
      });

      return compressed;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '画像の処理に失敗しました';
      setError(errorMessage);
      analytics.trackError(new Error(errorMessage));
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error,
    clearError: () => setError(null)
  };
}