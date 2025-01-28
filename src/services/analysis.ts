import { AnalysisResult } from '../utils/types';
import { analytics } from './analytics';

export async function saveAnalysis(result: AnalysisResult) {
  try {
    // For development, store in localStorage
    const analyses = JSON.parse(localStorage.getItem('analyses') || '[]');
    const newAnalysis = {
      ...result,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    analyses.push(newAnalysis);
    localStorage.setItem('analyses', JSON.stringify(analyses));
    
    analytics.track('Analysis Saved', {
      totalScore: result.scores.total,
      hasImage: !!result.imageUrl
    });
    
    return newAnalysis;
  } catch (error) {
    console.error('Failed to save analysis:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Analysis save failed'));
    throw new Error('分析結果の保存に失敗しました');
  }
}

export async function getAnalyses(): Promise<AnalysisResult[]> {
  try {
    const analyses = JSON.parse(localStorage.getItem('analyses') || '[]');
    return analyses;
  } catch (error) {
    console.error('Failed to fetch analyses:', error);
    throw new Error('分析履歴の取得に失敗しました');
  }
}

export async function getAnalysis(id: string): Promise<AnalysisResult | null> {
  try {
    const analyses = JSON.parse(localStorage.getItem('analyses') || '[]');
    return analyses.find((analysis: any) => analysis.id === id) || null;
  } catch (error) {
    console.error('Failed to fetch analysis:', error);
    throw new Error('分析結果の取得に失敗しました');
  }
}