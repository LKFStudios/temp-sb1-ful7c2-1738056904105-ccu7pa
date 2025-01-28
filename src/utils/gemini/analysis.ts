import { GeminiClient } from './client';
import { ANALYSIS_PROMPT } from './prompts';
import { AnalysisMetrics } from '../types';
import { normalizeMetrics } from '../metrics';
import { analytics } from '../../services/analytics';

const DEFAULT_METRICS: AnalysisMetrics = {
  eyes: {
    size: 7,
    shape: 7,
    balance: 7,
    analysis: ['目の形状が整っています'],
    improvement: ['アイメイクで目元を強調することで、さらに魅力的な印象に']
  },
  nose: {
    height: 7,
    bridge: 7,
    shape: 7,
    analysis: ['通った鼻筋が印象的です'],
    improvement: ['シャドーイングで立体感を出すことができます']
  },
  skin: {
    texture: 7,
    tone: 7,
    clarity: 7,
    analysis: ['透明感のある肌質です'],
    improvement: ['保湿ケアを継続することで、さらに透明感が増します']
  },
  jawline: {
    definition: 7,
    balance: 7,
    angle: 7,
    analysis: ['シャープな輪郭が特徴的です'],
    improvement: ['マッサージで輪郭をさらに引き締めることができます']
  },
  hair: {
    quality: 7,
    volume: 7,
    style: 7,
    analysis: ['ツヤのある健康的な髪です'],
    improvement: ['トリートメントで髪の質感をさらに良くできます']
  }
};

export async function analyzeWithGemini(imageData: string): Promise<AnalysisMetrics> {
  try {
    console.log('Starting Gemini analysis...');
    const client = GeminiClient.getInstance();
    const response = await client.generateContent(ANALYSIS_PROMPT, imageData);
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

      const metrics = normalizeMetrics(parsed.measurements);
      
      // Ensure analysis and improvement arrays exist for each category
      Object.keys(metrics).forEach(key => {
        const category = key as keyof AnalysisMetrics;
        if (parsed.measurements[key]) {
          metrics[category].analysis = Array.isArray(parsed.measurements[key].analysis) 
            ? parsed.measurements[key].analysis 
            : DEFAULT_METRICS[category].analysis;
          metrics[category].improvement = Array.isArray(parsed.measurements[key].improvement)
            ? parsed.measurements[key].improvement
            : DEFAULT_METRICS[category].improvement;
        }
      });

      analytics.track('Analysis Success');
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