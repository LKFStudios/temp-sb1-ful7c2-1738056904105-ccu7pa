import { AnalysisResult, AnalysisMetrics } from '../types';
import { GeminiClient } from './geminiClient';
import { usePrompts } from '../prompts';
import { uploadAnalysisImage } from './imageProcessing';
import { analytics } from '../../services/analytics';
import { Gender } from '../types';

const DEFAULT_METRICS: AnalysisMetrics = {
  eyes: {
    size: 7,
    shape: 7,
    balance: 7,
    analysis: ['目の形状が整っています'],
    improvement: ['目元の印象をさらに良くするためのアドバイス']
  },
  nose: {
    height: 7,
    bridge: 7,
    shape: 7,
    analysis: ['バランスの取れた鼻筋です'],
    improvement: ['立体感を出すためのアドバイス']
  },
  skin: {
    texture: 7,
    tone: 7,
    clarity: 7,
    analysis: ['健康的な肌の印象です'],
    improvement: ['さらなる透明感を出すためのアドバイス']
  },
  jawline: {
    definition: 7,
    balance: 7,
    angle: 7,
    analysis: ['整ったフェイスラインです'],
    improvement: ['輪郭をさらに引き立てるアドバイス']
  },
  hair: {
    quality: 7,
    volume: 7,
    style: 7,
    analysis: ['健康的な髪の印象です'],
    improvement: ['髪の質感を高めるアドバイス']
  }
};

export async function analyzeFaceWithGemini(imageData: string, gender: Gender): Promise<AnalysisMetrics> {
  try {
    console.log('Starting face analysis...', { gender });
    const client = GeminiClient.getInstance();
    const { getAnalysisPrompt } = usePrompts();
    const prompt = getAnalysisPrompt(gender);

    const response = await client.generateContent(prompt, imageData);
    console.log('Received Gemini response');

    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Invalid response format:', response);
      analytics.trackError(new Error('Invalid response format'));
      return DEFAULT_METRICS;
    }

    try {
      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.measurements) {
        console.error('No measurements found in response:', parsed);
        analytics.trackError(new Error('No measurements found'));
        return DEFAULT_METRICS;
      }

      const validateCategory = (category: any, defaultCategory: any) => {
        if (!category || typeof category !== 'object') {
          return defaultCategory;
        }

        const normalizedCategory = { ...defaultCategory };
        const numericFields = ['size', 'shape', 'balance', 'height', 'bridge', 'texture', 
                             'tone', 'clarity', 'definition', 'angle', 'quality', 'volume', 'style'];

        numericFields.forEach(field => {
          if (field in category) {
            const value = Number(category[field]);
            normalizedCategory[field as keyof typeof normalizedCategory] = 
              !isNaN(value) ? Math.min(10, Math.max(0, value)) : defaultCategory[field];
          }
        });

        normalizedCategory.analysis = Array.isArray(category.analysis) ? category.analysis : defaultCategory.analysis;
        normalizedCategory.improvement = Array.isArray(category.improvement) ? category.improvement : defaultCategory.improvement;

        return normalizedCategory;
      };

      const metrics: AnalysisMetrics = {
        eyes: validateCategory(parsed.measurements.eyes, DEFAULT_METRICS.eyes),
        nose: validateCategory(parsed.measurements.nose, DEFAULT_METRICS.nose),
        skin: validateCategory(parsed.measurements.skin, DEFAULT_METRICS.skin),
        jawline: validateCategory(parsed.measurements.jawline, DEFAULT_METRICS.jawline),
        hair: validateCategory(parsed.measurements.hair, DEFAULT_METRICS.hair)
      };

      analytics.track('Face Analysis Success', {
        gender,
        hasAnalysis: Object.values(metrics).every(category => Array.isArray(category.analysis) && category.analysis.length > 0),
        hasImprovement: Object.values(metrics).every(category => Array.isArray(category.improvement) && category.improvement.length > 0)
      });

      return metrics;
    } catch (error) {
      console.error('Failed to parse analysis response:', error);
      analytics.trackError(error instanceof Error ? error : new Error('Failed to parse response'));
      return DEFAULT_METRICS;
    }
  } catch (error) {
    console.error('Face analysis failed:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Face analysis failed'));
    return DEFAULT_METRICS;
  }
}

export { uploadAnalysisImage };