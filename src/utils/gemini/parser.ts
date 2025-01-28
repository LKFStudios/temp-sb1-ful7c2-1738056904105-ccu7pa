import { AnalysisMetrics } from '../types';

export function parseGeminiResponse(response: string): AnalysisMetrics {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    if (!parsed.measurements) {
      throw new Error('No measurements found in response');
    }

    // Validate measurements structure
    const requiredCategories = ['eyes', 'nose', 'skin', 'jawline', 'hair'];
    const missingCategories = requiredCategories.filter(category => !parsed.measurements[category]);
    
    if (missingCategories.length > 0) {
      throw new Error(`Missing categories: ${missingCategories.join(', ')}`);
    }

    return {
      eyes: validateCategory(parsed.measurements.eyes),
      nose: validateCategory(parsed.measurements.nose),
      skin: validateCategory(parsed.measurements.skin),
      jawline: validateCategory(parsed.measurements.jawline),
      hair: validateCategory(parsed.measurements.hair)
    };
  } catch (error) {
    console.error('Response parsing error:', error);
    throw new Error('分析結果の解析に失敗しました');
  }
}

function validateCategory(data: any) {
  const defaultValue = 7;
  const defaultArray: string[] = [];

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid category data');
  }

  return {
    size: validateScore(data.size) ?? defaultValue,
    shape: validateScore(data.shape) ?? defaultValue,
    balance: validateScore(data.balance) ?? defaultValue,
    height: validateScore(data.height) ?? defaultValue,
    bridge: validateScore(data.bridge) ?? defaultValue,
    texture: validateScore(data.texture) ?? defaultValue,
    tone: validateScore(data.tone) ?? defaultValue,
    clarity: validateScore(data.clarity) ?? defaultValue,
    definition: validateScore(data.definition) ?? defaultValue,
    angle: validateScore(data.angle) ?? defaultValue,
    quality: validateScore(data.quality) ?? defaultValue,
    volume: validateScore(data.volume) ?? defaultValue,
    style: validateScore(data.style) ?? defaultValue,
    analysis: Array.isArray(data.analysis) ? data.analysis : defaultArray,
    improvement: Array.isArray(data.improvement) ? data.improvement : defaultArray
  };
}

function validateScore(value: any): number | null {
  if (typeof value !== 'number' || isNaN(value)) {
    return null;
  }
  return Math.max(0, Math.min(10, value));
}