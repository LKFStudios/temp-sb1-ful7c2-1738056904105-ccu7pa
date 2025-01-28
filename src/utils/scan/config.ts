import { ScanPromptConfig } from './types';

export const FEMALE_CONFIG: ScanPromptConfig = {
  referenceScores: {
    perfect: ['新垣結衣', '石原さとみ', '橋本環奈'],
    excellent: ['佐々木希', '綾瀬はるか', '長澤まさみ'],
    good: ['一般的な女優・モデル'],
    average: ['一般的な日本人女性'],
    needsImprovement: ['極端に不自然なメイクやヘアスタイル']
  },
  features: {
    eyes: {
      name: '目元',
      description: '目の大きさ、形状、バランスを評価',
      metrics: {
        size: {
          name: 'サイズ',
          description: '目の大きさと印象',
          evaluationPoints: [
            '目の大きさは顔全体とバランスが取れているか',
            '一重・二重の幅は適度か',
            '目の開き具合は自然か'
          ],
          improvementSuggestions: [
            'アイメイクテクニック',
            'アイケア方法',
            'まつ毛のケア'
          ]
        },
        // ... 他のメトリクスも同様に定義
      }
    },
    // ... 他の特徴も同様に定義
  }
};

export const MALE_CONFIG: ScanPromptConfig = {
  referenceScores: {
    perfect: ['山崎賢人', '吉沢亮', 'BTSのV'],
    excellent: ['菅田将暉', '中村倫也', '新田真剣佑'],
    good: ['一般的な俳優・モデル'],
    average: ['一般的な日本人男性'],
    needsImprovement: ['極端に不自然なヘアスタイルや表情']
  },
  features: {
    eyes: {
      name: '目',
      description: '目の力強さ、形状、バランスを評価',
      metrics: {
        size: {
          name: 'サイズ',
          description: '目の大きさと印象',
          evaluationPoints: [
            '目の大きさは男性的か',
            '一重・二重は自然か',
            '眼力があるか'
          ],
          improvementSuggestions: [
            '目元のケア方法',
            '表情筋トレーニング',
            '睡眠の質改善'
          ]
        },
        // ... 他のメトリクスも同様に定義
      }
    },
    // ... 他の特徴も同様に定義
  }
};