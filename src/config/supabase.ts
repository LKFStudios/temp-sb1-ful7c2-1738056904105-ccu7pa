import { createClient } from '@supabase/supabase-js';
import { env } from './env';

if (!env.SUPABASE_URL || !env.SUPABASE_KEY) {
  throw new Error('Supabase configuration is missing. Please check your environment variables.');
}

export const supabase = createClient(
  env.SUPABASE_URL,
  env.SUPABASE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    db: {
      schema: 'public'
    }
  }
);