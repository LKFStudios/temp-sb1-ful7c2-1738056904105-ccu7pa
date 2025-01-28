import { ApiClient } from './apiClient';
import { COACHING_PROMPT } from './coachingPrompts';

export interface CoachingResponse {
  message: string;
  followUpQuestions: string[];
}

const DEFAULT_RESPONSE: CoachingResponse = {
  message: "申し訳ありません。現在アドバイスの生成に問題が発生しています。しばらく経ってから再度お試しください。",
  followUpQuestions: [
    "普段、どんな運動をしているかな？",
    "食生活で何か気になることはある？",
    "1日にどれくらい時間を使える？"
  ]
};

export async function getCoachingResponse(message: string): Promise<CoachingResponse> {
  try {
    const apiClient = ApiClient.getInstance();
    const prompt = COACHING_PROMPT.replace('{message}', message);
    const response = await apiClient.generateContent(prompt);
    
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
        followUpQuestions: parsed.response.followUpQuestions || DEFAULT_RESPONSE.followUpQuestions
      };
    } catch (parseError) {
      console.error('Failed to parse coaching response:', parseError);
      return DEFAULT_RESPONSE;
    }
  } catch (error) {
    console.error('Coaching API error:', error);
    return DEFAULT_RESPONSE;
  }
}