import { User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../../config/supabase';
import { createUserProfile } from '../profile';
import { Gender } from '../../utils/types';
import { analytics } from '../analytics';

export async function signInWithApple(): Promise<User> {
  if (!isSupabaseConfigured()) {
    throw new Error('認証サービスが設定されていません');
  }

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          response_type: 'code id_token',
          scope: 'name email'
        }
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('ログインに失敗しました');

    await createUserProfile({
      gender: 'unspecified',
      authProvider: 'apple',
      email: data.user.email,
      metadata: {
        appleId: data.user.app_metadata.provider_id
      }
    });

    analytics.track('Sign In', { provider: 'apple' });
    return data.user;
  } catch (error) {
    console.error('Apple sign in failed:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Apple sign in failed'));
    throw new Error('Appleログインに失敗しました。時間をおいて再度お試しください。');
  }
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  if (!isSupabaseConfigured()) {
    throw new Error('認証サービスが設定されていません');
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (!data.user) throw new Error('ログインに失敗しました');

    analytics.track('Sign In', { provider: 'email' });
    return data.user;
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
): Promise<User> {
  if (!isSupabaseConfigured()) {
    throw new Error('認証サービスが設定されていません');
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin
      }
    });

    if (error) throw error;
    if (!data.user) throw new Error('アカウント作成に失敗しました');

    await createUserProfile({
      gender,
      authProvider: 'email',
      email,
      metadata: {
        emailVerified: false
      }
    });

    analytics.track('Sign Up', { provider: 'email' });
    return data.user;
  } catch (error) {
    console.error('Email sign up failed:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Email sign up failed'));
    throw new Error('アカウント作成に失敗しました。時間をおいて再度お試しください。');
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    analytics.track('Sign Out');
  } catch (error) {
    console.error('Sign out failed:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Sign out failed'));
    throw new Error('ログアウトに失敗しました');
  }
}