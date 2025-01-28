import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDkWiRZWmLdUCoEu5nevzLeq62Sog7f4XI",
  authDomain: "ikemen-c1269.firebaseapp.com",
  projectId: "ikemen-c1269",
  storageBucket: "ikemen-c1269.firebasestorage.app",
  messagingSenderId: "704031644649",
  appId: "1:704031644649:web:a3d8b7b556121b03d80978",
  measurementId: "G-FB5GT55GCS"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);