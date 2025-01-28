import { IMAGE_VALIDATION } from '../constants/validation';

export async function compressImage(imageData: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context creation failed'));
        return;
      }

      // Calculate optimal dimensions
      let { width, height } = img;
      const maxDimension = 1200;
      const aspectRatio = width / height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          width = maxDimension;
          height = Math.round(width / aspectRatio);
        } else {
          height = maxDimension;
          width = Math.round(height * aspectRatio);
        }
      }

      // Set canvas size with device pixel ratio for better quality
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Apply smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      // Calculate quality based on image size
      const quality = Math.min(0.8, 1000000 / (width * height));
      
      // Convert to WebP if supported
      const mimeType = 'image/webp';
      const webPData = canvas.toDataURL(mimeType, quality);
      
      // Cleanup
      canvas.width = 0;
      canvas.height = 0;
      
      resolve(webPData);
    };

    img.onerror = () => {
      reject(new Error('画像の圧縮に失敗しました'));
    };

    img.src = imageData;
  });
}