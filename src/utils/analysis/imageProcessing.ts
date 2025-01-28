import { analytics } from '../../services/analytics';
import { supabase } from '../../config/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function uploadAnalysisImage(imageData: string): Promise<string> {
  try {
    const matches = imageData.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Invalid image data format');
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const extension = mimeType.split('/')[1];
    const fileName = `${uuidv4()}.${extension}`;
    const filePath = `public/${fileName}`;

    // Convert base64 to Blob
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: mimeType });

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('analyses')
      .upload(filePath, blob, {
        contentType: mimeType,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    analytics.track('Image Upload Success', {
      mimeType,
      size: blob.size
    });

    return filePath;
  } catch (error) {
    console.error('Storage error:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Storage operation failed'));
    throw new Error('画像のアップロードに失敗しました');
  }
}