import { supabase } from '../../config/supabase';
import { v4 as uuidv4 } from 'uuid';
import { STORAGE_CONFIG } from './config';
import { validateStorageImage } from './validation';
import { base64ToBlob } from './conversion';
import { analytics } from '../../services/analytics';

export async function uploadAnalysisImage(imageData: string): Promise<string> {
  try {
    // Convert base64 to blob
    const { blob, mimeType } = await base64ToBlob(imageData);

    // Validate the blob
    const validation = validateStorageImage(blob);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Generate unique filename
    const extension = mimeType.split('/')[1];
    const fileName = `${uuidv4()}.${extension}`;
    const filePath = `${STORAGE_CONFIG.PUBLIC_PATH}/${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(STORAGE_CONFIG.BUCKET_NAME)
      .upload(filePath, blob, {
        contentType: mimeType,
        cacheControl: STORAGE_CONFIG.CACHE_CONTROL,
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
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