import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../../config/env';
import { analytics } from '../../services/analytics';

export class GeminiClient {
  private static instance: GeminiClient;
  private model: any;
  private retryCount = 0;
  private maxRetries = 3;
  private retryDelay = 1000;

  private constructor() {
    if (!env.GEMINI_API_KEY) {
      throw new Error('Gemini API key is not configured');
    }

    try {
      const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
      this.model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 4096
        }
      });
    } catch (error) {
      console.error('Failed to initialize Gemini:', error);
      analytics.trackError(error instanceof Error ? error : new Error('Gemini initialization failed'));
      throw new Error('AIの初期化に失敗しました');
    }
  }

  public static getInstance(): GeminiClient {
    if (!GeminiClient.instance) {
      GeminiClient.instance = new GeminiClient();
    }
    return GeminiClient.instance;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async generateContent(prompt: string, image?: string): Promise<string> {
    if (!this.model) {
      throw new Error('AIモデルが初期化されていません');
    }

    this.retryCount = 0;

    try {
      const parts = [{ text: prompt }];

      if (image) {
        const imageData = this.prepareImageData(image);
        parts.push({
          inlineData: {
            data: imageData.base64,
            mimeType: imageData.mimeType
          }
        });
      }

      const result = await this.retryOperation(async () => {
        const response = await this.model.generateContent(parts);
        return response;
      });

      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error('AIからの応答が空です');
      }

      analytics.track('AI Response Success');
      return text;
    } catch (error) {
      console.error('AI request failed:', error);
      analytics.trackError(error instanceof Error ? error : new Error('AI request failed'));
      throw this.handleGeminiError(error);
    }
  }

  private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
    while (true) {
      try {
        return await operation();
      } catch (error) {
        if (this.retryCount >= this.maxRetries) {
          throw error;
        }

        this.retryCount++;
        const delay = this.retryDelay * Math.pow(2, this.retryCount - 1);
        await this.delay(delay);
      }
    }
  }

  private prepareImageData(imageData: string): { base64: string; mimeType: string } {
    try {
      const base64Match = imageData.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      
      if (base64Match) {
        return {
          mimeType: base64Match[1],
          base64: base64Match[2]
        };
      }

      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
      return {
        mimeType: 'image/jpeg',
        base64: base64Data
      };
    } catch (error) {
      console.error('Failed to prepare image data:', error);
      analytics.trackError(error instanceof Error ? error : new Error('Image data preparation failed'));
      throw new Error('画像データの処理に失敗しました');
    }
  }

  private handleGeminiError(error: any): Error {
    const message = error?.message || '';
    
    if (message.includes('PERMISSION_DENIED')) {
      return new Error('APIキーが無効か、権限がありません');
    }
    if (message.includes('INVALID_ARGUMENT')) {
      return new Error('画像データが正しくありません');
    }
    if (message.includes('RESOURCE_EXHAUSTED')) {
      return new Error('APIの利用制限に達しました');
    }
    if (message.includes('SAFETY')) {
      return new Error('不適切なコンテンツが検出されました');
    }
    if (message.includes('MODEL_NOT_FOUND')) {
      return new Error('AIモデルの読み込みに失敗しました');
    }
    if (message.includes('UNAVAILABLE')) {
      return new Error('サービスが一時的に利用できません');
    }
    
    return new Error('AIとの通信に失敗しました');
  }
}