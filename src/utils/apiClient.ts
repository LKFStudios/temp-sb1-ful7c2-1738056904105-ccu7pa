import { env } from '../config/env';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { analytics } from '../services/analytics';

export class ApiClient {
  private static instance: ApiClient;
  private model: any;
  private retryCount = 0;
  private maxRetries = 3;

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
          maxOutputTokens: 2048
        }
      });
    } catch (error) {
      console.error('Failed to initialize Gemini API:', error);
      analytics.trackError(error instanceof Error ? error : new Error('Gemini initialization failed'));
      throw new Error('AIの初期化に失敗しました');
    }
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private async retry<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        const delay = Math.pow(2, this.retryCount) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.retry(operation);
      }
      throw error;
    }
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

      const result = await this.retry(async () => {
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
    } catch (error: any) {
      console.error('AI request failed:', error);
      analytics.trackError(error instanceof Error ? error : new Error('AI request failed'));
      throw this.handleApiError(error);
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
      console.error('Image data preparation failed:', error);
      analytics.trackError(error instanceof Error ? error : new Error('Image preparation failed'));
      throw new Error('画像データの処理に失敗しました');
    }
  }

  private handleApiError(error: any): Error {
    const message = error?.message || '';
    
    if (message.includes('PERMISSION_DENIED')) {
      return new Error('APIキーが無効か、権限がありません');
    }
    if (message.includes('INVALID_ARGUMENT')) {
      return new Error('リクエストの形式が正しくありません');
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