import { User } from '@supabase/supabase-js';
import { supabase } from '../../config/supabase';
import { AuthStateChangeCallback } from './types';
import { analytics } from '../analytics';

export function onAuthStateChange(callback: AuthStateChangeCallback): () => void {
  try {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      callback(session?.user ?? null);
      
      if (session?.user) {
        analytics.identify(session.user.id, {
          email: session.user.email,
          provider: session.user.app_metadata.provider
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  } catch (error) {
    console.error('Auth state change setup failed:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Auth listener failed'));
    return () => {}; // Return no-op cleanup function
  }
}