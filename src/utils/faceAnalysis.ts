import { AnalysisResult, AnalysisMetrics } from './types';
import { analyzeFaceWithGemini } from './scan';
import { calculateScores, calculateTotalScores } from './scoring';
import { uploadAnalysisImage } from './storage';
import { analytics } from '../services/analytics';
import { Gender } from '../types';

const DEFAULT_METRICS: AnalysisMetrics = {
  eyes: {
    size: 7,
    shape: 7,
    balance: 7,
    analysis: [],
    improvement: []
  },
  nose: {
    height: 7,
    bridge: 7,
    shape: 7,
    analysis: [],
    improvement: []
  },
  skin: {
    texture: 7,
    tone: 7,
    clarity: 7,
    analysis: [],
    improvement: []
  },
  jawline: {
    definition: 7,
    balance: 7,
    angle: 7,
    analysis: [],
    improvement: []
  },
  hair: {
    quality: 7,
    volume: 7,
    style: 7,
    analysis: [],
    improvement: []
  }
};

export async function analyzeFace(
  imageBase64: string,
  gender: Gender,
  onProgress?: (stage: string, progress: number) => void
): Promise<AnalysisResult> {
  if (!imageBase64) {
    throw new Error('画像データが提供されていません');
  }

  try {
    const updateProgress = async (stage: string, start: number, end: number, duration: number) => {
      const steps = 10;
      const increment = (end - start) / steps;
      for (let i = 0; i <= steps; i++) {
        onProgress?.(stage, start + increment * i);
        await new Promise(resolve => setTimeout(resolve, duration / steps));
      }
    };

    await updateProgress('画像読み込み', 0, 20, 800);

    let imageUrl: string | null = null;
    try {
      imageUrl = await uploadAnalysisImage(imageBase64);
      analytics.track('Image Upload Success');
    } catch (error) {
      console.error('Image upload failed:', error);
      analytics.trackError(error instanceof Error ? error : new Error('Image upload failed'));
    }

    await updateProgress('顔検出', 20, 40, 800);

    onProgress?.(gender === 'female' ? '診断中' : '特徴分析', 40);
    const analysisStartTime = Date.now();
    
    let metrics: AnalysisMetrics;
    try {
      metrics = await analyzeFaceWithGemini(imageBase64, gender);
      analytics.track('Analysis Success', { 
        duration: Date.now() - analysisStartTime,
        gender 
      });
    } catch (error) {
      console.error('Analysis error:', error);
      analytics.trackError(error instanceof Error ? error : new Error('Analysis failed'));
      metrics = DEFAULT_METRICS;
    }

    const analysisTime = Date.now() - analysisStartTime;
    
    if (analysisTime < 1500) {
      await updateProgress(gender === 'female' ? '診断中' : '特徴分析', 40, 80, 1500 - analysisTime);
    } else {
      onProgress?.(gender === 'female' ? '診断中' : '特徴分析', 80);
    }

    onProgress?.('スコア計算', 80);
    const detailedScores = calculateScores(metrics);
    const scores = calculateTotalScores(detailedScores);
    await updateProgress('スコア計算', 80, 95, 800);

    const result: AnalysisResult = {
      scores,
      detailedScores,
      imageUrl,
      advice: {
        eyes: metrics.eyes.analysis,
        nose: metrics.nose.analysis,
        skin: metrics.skin.analysis,
        jawline: metrics.jawline.analysis,
        hair: metrics.hair.analysis,
        improvements: [
          ...metrics.eyes.improvement,
          ...metrics.nose.improvement,
          ...metrics.skin.improvement,
          ...metrics.jawline.improvement,
          ...metrics.hair.improvement
        ]
      }
    };

    await updateProgress('完了', 95, 100, 500);
    analytics.track('Analysis Complete', { 
      totalScore: scores.total,
      gender
    });

    return result;
  } catch (error) {
    console.error('Analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : '分析に失敗しました';
    analytics.trackError(new Error(errorMessage));
    throw new Error(`顔分析に失敗しました: ${errorMessage}`);
  }
}