import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { app } from '../config/firebase';

const storage = getStorage(app);

export async function uploadImage(imageData: string): Promise<string> {
  if (!imageData) {
    throw new Error('画像データが提供されていません');
  }

  try {
    const imageId = uuidv4();
    const storageRef = ref(storage, `analysis-images/${imageId}`);
    
    // Remove data URL prefix if present
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    
    // Upload image
    await uploadString(storageRef, base64Data, 'base64');
    
    // Get download URL
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Image upload failed:', error);
    throw new Error('画像のアップロードに失敗しました');
  }
}

export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  try {
    const imageRef = ref(storage, imageUrl);
    await deleteImage(imageUrl);
  } catch (error) {
    console.error('Image deletion failed:', error);
  }
}