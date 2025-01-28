import { initializeApp } from 'firebase/app';
import { env } from '../env';

if (!env.FIREBASE_CONFIG.apiKey) {
  throw new Error('Firebase configuration is missing');
}

export const app = initializeApp(env.FIREBASE_CONFIG);