import { User } from '@supabase/supabase-js';
import { supabase } from '../../config/supabase';

export async function getUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Get user failed:', error);
    return null;
  }
}

export async function getUserSession() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Get session failed:', error);
    return null;
  }
}