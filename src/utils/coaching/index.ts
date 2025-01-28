import { Message } from '../../types/chat';
import { getCoachingResponse } from './api';
import { analytics } from '../../services/analytics';

export const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  text: '👋 やぁ！ショージだよ！最高の自分になりたいって思ったことある？それなら、今がチャンスだ！✨ 一緒に目標達成に向けて頑張ろうぜ！どんな小さなことでも、相談に乗るからさ。例えば、「モテたい」とか「自信を持ちたい」とか、どんな目標でもOK！🎯 一緒にプラン立てて、楽しみながら目標に近づいていこう！悩み事とか相談したいことどんなに小さなことでも教えてくれ！💪',
  isUser: false,
  followUpQuestions: [
    '💪 筋トレを始めたいんだけど...',
    '👔 ファッションを改善したい！',
    '🔥 自信をつけたいです'
  ]
};

export async function sendChatMessage(text: string): Promise<Message> {
  try {
    const response = await getCoachingResponse(text);
    analytics.track('Chat Response Success');

    return {
      id: Date.now().toString(),
      text: response.message,
      isUser: false,
      followUpQuestions: response.followUpQuestions
    };
  } catch (error) {
    console.error('Chat error:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Chat failed'));
    
    return {
      id: Date.now().toString(),
      text: '😅 申し訳ありません。現在応答に問題が発生しています。時間をおいて再度お試しください。',
      isUser: false,
      followUpQuestions: []
    };
  }
}