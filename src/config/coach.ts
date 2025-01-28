import { Gender } from '../types';

interface CoachConfig {
  emoji: string;
  title: string;
  description: string;
  placeholder: string;
  welcomeMessage: string;
  defaultQuestions: string[];
}

export const coachConfigs: Record<Gender, CoachConfig> = {
  female: {
    emoji: '',
    title: '自分磨きカウンセラー',
    description: 'メイクやスキンケアについて、なんでもご相談ください♪',
    placeholder: 'メイクやスキンケアについて相談してみましょう...',
    welcomeMessage: '💝 こんにちは！あなたの魅力を最大限に引き出すお手伝いをさせていただきます。メイクやスキンケア、ファッションなど、どんなことでもお気軽にご相談くださいね！',
    defaultQuestions: [
      '💄 メイクのアドバイスが欲しいです',
      '✨ スキンケアについて相談したい',
      '💇‍♀️ 髪型の相談をしたいです'
    ]
  },
  male: {
    emoji: '🏋️‍♂️',
    title: 'パーソナルコーチ',
    description: '外見だけじゃなく内面まで高めていこう！',
    placeholder: 'メッセージを入力...',
    welcomeMessage: '👋 やぁ！最高の自分になりたいって思ったことある？それなら、今がチャンスだ！✨ 一緒に目標達成に向けて頑張ろうぜ！',
    defaultQuestions: [
      '💪 筋トレを始めたいんだけど...',
      '👔 ファッションを改善したい！',
      '🔥 自信をつけたいです'
    ]
  },
  unspecified: {
    emoji: '🌟',
    title: 'パーソナルコーチ',
    description: 'あなたの魅力を最大限に引き出すお手伝いをします',
    placeholder: 'メッセージを入力...',
    welcomeMessage: '👋 こんにちは！あなたの魅力を最大限に引き出すお手伝いをさせていただきます。どんなことでもお気軽にご相談ください！',
    defaultQuestions: [
      '✨ 魅力を高めたいです',
      '💪 自己啓発について相談したい',
      '🌱 新しい目標を見つけたい'
    ]
  }
};