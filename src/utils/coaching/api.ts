import { ApiClient } from '../apiClient';
import { usePrompts } from '../prompts';
import { CoachingResponse } from './types';
import { analytics } from '../../services/analytics';
import { Gender } from '../types';

const DEFAULT_ERROR_MESSAGE = "申し訳ありません。現在応答に問題が発生しています。時間をおいて再度お試しください。";
const DEFAULT_SUGGESTIONS = [
  "💭 具体的にどんなことを知りたいですか？",
  "💭 気になることはありますか？",
  "💭 一緒に頑張っていきたいことはありますか？"
];

export async function getCoachingResponse(message: string, gender: Gender): Promise<CoachingResponse> {
  try {
    const apiClient = ApiClient.getInstance();
    const { getCoachingPrompt } = usePrompts();
    const prompt = getCoachingPrompt(gender);
    
    const startTime = Date.now();
    const response = await apiClient.generateContent(prompt.replace('{message}', message));
    analytics.track('Coaching Response Success', { duration: Date.now() - startTime, gender });
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      if (!parsed.response?.message) {
        throw new Error('Invalid response structure');
      }

      return {
        message: parsed.response.message,
        suggestions: parsed.response.suggestions || DEFAULT_SUGGESTIONS
      };
    } catch (parseError) {
      console.error('Failed to parse coaching response:', parseError);
      analytics.trackError(parseError instanceof Error ? parseError : new Error('Parse error'));
      return {
        message: DEFAULT_ERROR_MESSAGE,
        suggestions: DEFAULT_SUGGESTIONS
      };
    }
  } catch (error) {
    console.error('Coaching API error:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Coaching API error'));
    return {
      message: DEFAULT_ERROR_MESSAGE,
      suggestions: DEFAULT_SUGGESTIONS
    };
  }
}