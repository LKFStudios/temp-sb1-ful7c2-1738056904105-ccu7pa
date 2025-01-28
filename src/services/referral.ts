import { supabase } from '../config/supabase';
import { generateReferralId } from '../utils/referral';
import { analytics } from './analytics';

interface ReferralData {
  id: string;
  userId: string;
  referralId: string;
  referredUserId?: string;
  createdAt: string;
  usedAt?: string;
}

export async function createReferralCode(userId: string): Promise<string> {
  try {
    const referralId = generateReferralId();
    
    const { error } = await supabase
      .from('referrals')
      .insert({
        user_id: userId,
        referral_id: referralId,
        created_at: new Date().toISOString()
      });

    if (error) throw error;
    
    analytics.track('Referral Code Created', { referralId });
    return referralId;
  } catch (error) {
    console.error('Failed to create referral code:', error);
    throw new Error('招待コードの生成に失敗しました');
  }
}

export async function useReferralCode(referralId: string, userId: string): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .update({
        referred_user_id: userId,
        used_at: new Date().toISOString()
      })
      .eq('referral_id', referralId)
      .is('referred_user_id', null)
      .single();

    if (error) throw error;
    if (!data) throw new Error('Invalid or already used referral code');

    analytics.track('Referral Code Used', { referralId, userId });
  } catch (error) {
    console.error('Failed to use referral code:', error);
    throw new Error('招待コードの使用に失敗しました');
  }
}

export async function getReferralsByUser(userId: string): Promise<ReferralData[]> {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Failed to get referrals:', error);
    throw new Error('招待履歴の取得に失敗しました');
  }
}

export async function getReferralStats(userId: string): Promise<{
  totalReferrals: number;
  usedReferrals: number;
}> {
  try {
    const { data, error } = await supabase
      .from('referrals')
      .select('referred_user_id')
      .eq('user_id', userId);

    if (error) throw error;

    const totalReferrals = data.length;
    const usedReferrals = data.filter(r => r.referred_user_id).length;

    return { totalReferrals, usedReferrals };
  } catch (error) {
    console.error('Failed to get referral stats:', error);
    throw new Error('招待統計の取得に失敗しました');
  }
}