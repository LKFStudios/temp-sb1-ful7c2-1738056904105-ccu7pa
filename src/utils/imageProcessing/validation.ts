import { IMAGE_VALIDATION, ERROR_MESSAGES } from '../constants/validation';

export interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

export async function validateImage(file: File): Promise<ImageValidationResult> {
  try {
    // Check file size
    if (file.size > IMAGE_VALIDATION.MAX_SIZE) {
      return {
        isValid: false,
        error: ERROR_MESSAGES.FILE_TOO_LARGE
      };
    }

    // Check file type
    if (!IMAGE_VALIDATION.SUPPORTED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: ERROR_MESSAGES.UNSUPPORTED_TYPE
      };
    }

    // Check dimensions
    const dimensions = await getImageDimensions(file);
    if (!dimensions) {
      return {
        isValid: false,
        error: ERROR_MESSAGES.PROCESSING_ERROR
      };
    }

    if (
      dimensions.width < IMAGE_VALIDATION.MIN_DIMENSIONS.width ||
      dimensions.height < IMAGE_VALIDATION.MIN_DIMENSIONS.height ||
      dimensions.width > IMAGE_VALIDATION.MAX_DIMENSIONS.width ||
      dimensions.height > IMAGE_VALIDATION.MAX_DIMENSIONS.height
    ) {
      return {
        isValid: false,
        error: ERROR_MESSAGES.INVALID_DIMENSIONS
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Image validation error:', error);
    return {
      isValid: false,
      error: ERROR_MESSAGES.PROCESSING_ERROR
    };
  }
}

async function getImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(null);
    };

    img.src = url;
  });
}