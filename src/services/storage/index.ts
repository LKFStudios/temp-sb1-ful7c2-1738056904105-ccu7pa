import { v4 as uuidv4 } from 'uuid';
import { analytics } from '../analytics';

export async function uploadAnalysisImage(imageData: string): Promise<string> {
  try {
    // For now, just return the base64 data
    // In production, you would implement proper image storage
    return imageData;
  } catch (error) {
    console.error('Storage error:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Storage operation failed'));
    throw new Error('画像のアップロードに失敗しました');
  }
}

export function isFirstVisit(): boolean {
  const visited = localStorage.getItem('hasVisitedBefore');
  if (!visited) {
    localStorage.setItem('hasVisitedBefore', 'true');
    return true;
  }
  return false;
}