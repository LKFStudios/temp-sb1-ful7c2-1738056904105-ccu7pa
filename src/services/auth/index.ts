import { analytics } from '../analytics';
import { Gender } from '../../utils/types';

// Simplified auth service using localStorage
export async function signInWithEmail(email: string, password: string): Promise<void> {
  try {
    // In production, implement proper authentication
    localStorage.setItem('user', JSON.stringify({ email }));
    analytics.track('Sign In', { provider: 'email' });
  } catch (error) {
    console.error('Email sign in failed:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Email sign in failed'));
    throw new Error('メールアドレスまたはパスワードが正しくありません');
  }
}

export async function signUpWithEmail(
  email: string, 
  password: string, 
  gender: Gender
): Promise<void> {
  try {
    // In production, implement proper authentication
    localStorage.setItem('user', JSON.stringify({ email, gender }));
    analytics.track('Sign Up', { provider: 'email' });
  } catch (error) {
    console.error('Email sign up failed:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Email sign up failed'));
    throw new Error('アカウント作成に失敗しました');
  }
}

export async function signOut(): Promise<void> {
  try {
    localStorage.removeItem('user');
    analytics.track('Sign Out');
  } catch (error) {
    console.error('Sign out failed:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Sign out failed'));
    throw new Error('ログアウトに失敗しました');
  }
}

export function onAuthStateChange(callback: (user: any | null) => void): () => void {
  const handleStorageChange = () => {
    const userStr = localStorage.getItem('user');
    callback(userStr ? JSON.parse(userStr) : null);
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}