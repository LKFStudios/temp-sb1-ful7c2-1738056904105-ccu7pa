import { supabase } from '../config/supabase';
import { AnalysisResult } from '../utils/types';
import { analytics } from './analytics';
import { uploadAnalysisImage } from '../utils/storage';

export async function saveAnalysis(result: AnalysisResult): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      // Instead of throwing error, create anonymous session
      const { data: { session }, error: authError } = await supabase.auth.signUp({
        email: `${Math.random().toString(36).substring(2)}@temp.com`,
        password: Math.random().toString(36),
      });
      
      if (authError) throw authError;
      if (!session?.user) throw new Error('Failed to create anonymous session');
    }

    // Upload image if it's a data URL
    let storedImageUrl = result.imageUrl;
    if (result.imageUrl?.startsWith('data:')) {
      storedImageUrl = await uploadAnalysisImage(result.imageUrl);
    }

    const { error } = await supabase
      .from('analyses')
      .insert({
        user_id: user?.id,
        scores: result.scores,
        detailed_scores: result.detailedScores,
        image_url: storedImageUrl,
        created_at: new Date().toISOString(),
        is_public: true // Make anonymous analyses public by default
      });

    if (error) throw error;

    analytics.track('Analysis Saved', {
      totalScore: result.scores.total,
      hasImage: !!storedImageUrl,
      isAnonymous: !user
    });
  } catch (error) {
    console.error('Failed to save analysis:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Analysis save failed'));
    throw new Error('分析結果の保存に失敗しました');
  }
}

export async function getAnalyses(): Promise<AnalysisResult[]> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform the data to ensure image URLs are properly formatted
    return data.map(analysis => ({
      ...analysis,
      imageUrl: analysis.image_url ? getPublicImageUrl(analysis.image_url) : null
    }));
  } catch (error) {
    console.error('Failed to fetch analyses:', error);
    throw new Error('分析履歴の取得に失敗しました');
  }
}

export async function getAnalysis(id: string): Promise<AnalysisResult | null> {
  try {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) return null;

    return {
      ...data,
      imageUrl: data.image_url ? getPublicImageUrl(data.image_url) : null
    };
  } catch (error) {
    console.error('Failed to fetch analysis:', error);
    throw new Error('分析結果の取得に失敗しました');
  }
}

function getPublicImageUrl(imageUrl: string): string {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  const { data } = supabase.storage
    .from('analyses')
    .getPublicUrl(imageUrl.replace(/^public\//, ''));
  
  return data.publicUrl;
}