import { getApps } from 'firebase/app';
import { env } from '../config/env';
import { app, auth, db, storage, analytics } from '../config/firebase';

export function initializeFirebase() {
  try {
    if (!env.FIREBASE_CONFIG.apiKey) {
      throw new Error('Firebase configuration is missing');
    }

    if (getApps().length === 0) {
      // Ensure all Firebase services are initialized
      if (!app || !auth || !db || !storage || !analytics) {
        throw new Error('Failed to initialize Firebase services');
      }
    }
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    throw error;
  }
}