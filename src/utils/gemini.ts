import { ApiClient } from './apiClient';
import { AnalysisMetrics } from './types';
import { normalizeMetrics } from './metrics';

const ANALYSIS_PROMPT = `あなたは、顔画像を分析し、日本のビューティースタンダードに即した客観的な評価と改善アドバイスを提供するAIです。

評価基準（各項目0-10点で評価）:

1. 目 (eyes)
   - サイズ (size): 大きさとバランス
   - 形状 (shape): 二重、一重などの形状
   - バランス (balance): 左右対称性

2. 鼻 (nose)
   - 高さ (height): 鼻の高さ
   - 通り (bridge): 鼻筋の通り具合
   - 形状 (shape): 全体的な形状

3. 肌 (skin)
   - 質感 (texture): キメの細かさ
   - 色調 (tone): 肌の色味
   - 透明感 (clarity): 肌の透明感

4. フェイスライン (jawline)
   - シャープさ (definition): 輪郭の通り
   - バランス (balance): 全体的なバランス
   - 角度 (angle): フェイスラインの角度

5. 髪型 (hair)
   - 質 (quality): 髪の健康状態
   - ボリューム (volume): 髪のボリューム感
   - スタイル (style): 顔との調和

以下の形式でJSONを返してください：

{
  "measurements": {
    "eyes": {
      "size": 8,
      "shape": 7,
      "balance": 8,
      "analysis": "目の形状が整っており...",
      "improvement": "アイメイクで..."
    }
    // 他の項目も同様
  }
}`;

export async function analyzeWithGemini(imageData: string): Promise<AnalysisMetrics> {
  try {
    console.log('Starting Gemini analysis...');
    const apiClient = ApiClient.getInstance();
    const response = await apiClient.generateContent(ANALYSIS_PROMPT, imageData);
    console.log('Received Gemini response');
    
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('Invalid response format:', response);
      throw new Error('Invalid response format');
    }

    try {
      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.measurements) {
        console.error('No measurements found in response:', parsed);
        throw new Error('No measurements found in response');
      }

      return normalizeMetrics(parsed.measurements);
    } catch (error) {
      console.error('Failed to parse response:', error);
      throw new Error('分析結果の解析に失敗しました');
    }
  } catch (error) {
    console.error('Analysis failed:', error);
    throw new Error('顔分析に失敗しました。時間をおいて再度お試しください。');
  }
}