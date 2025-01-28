import { Gender } from '../types';

interface PromptConfig {
  scoreRanges: {
    excellent: string[];
    good: string[];
    average: string[];
    poor: string[];
  };
  categories: {
    [key: string]: {
      name: string;
      metrics: {
        [key: string]: {
          name: string;
          description: string;
          evaluationPoints: string[];
        };
      };
    };
  };
}

const FEMALE_CONFIG: PromptConfig = {
  scoreRanges: {
    excellent: ['新垣結衣', '石原さとみ', '橋本環奈'],
    good: ['佐々木希', '綾瀬はるか', '長澤まさみ'],
    average: ['一般的な日本人女性'],
    poor: ['極端に不自然なメイクやヘアスタイル']
  },
  categories: {
    eyes: {
      name: '目元',
      metrics: {
        size: {
          name: 'サイズ',
          description: '目の大きさ、左右バランス、目元の印象',
          evaluationPoints: [
            '二重の幅は適度か',
            '目の大きさは顔全体とバランスが取れているか',
            'クマやたるみはないか'
          ]
        },
        shape: {
          name: '形状',
          description: '目の形、二重の状態、目の輝き',
          evaluationPoints: [
            '自然な二重ラインがあるか',
            'まつ毛の状態は良好か',
            '目の輝きがあるか'
          ]
        },
        balance: {
          name: 'バランス',
          description: '目の位置、大きさの左右対称性',
          evaluationPoints: [
            '左右の高さは揃っているか',
            '目の大きさは左右対称か',
            '目頭・目尻の位置は適切か'
          ]
        }
      }
    },
    // 他のカテゴリーも同様に詳細に定義
  }
};

const MALE_CONFIG: PromptConfig = {
  scoreRanges: {
    excellent: ['山崎賢人', '吉沢亮', 'BTSのV'],
    good: ['菅田将暉', '中村倫也', '新田真剣佑'],
    average: ['一般的な日本人男性'],
    poor: ['極端に不自然なヘアスタイルや表情']
  },
  categories: {
    eyes: {
      name: '目',
      metrics: {
        size: {
          name: 'サイズ',
          description: '目の大きさ、力強さ、印象',
          evaluationPoints: [
            '目の大きさは男性的か',
            '力強い印象があるか',
            'クマやたるみはないか'
          ]
        },
        shape: {
          name: '形状',
          description: '目の形、二重の状態、眼力',
          evaluationPoints: [
            '自然な二重か一重か',
            'まつ毛の状態は良好か',
            '眼力があるか'
          ]
        },
        balance: {
          name: 'バランス',
          description: '目の位置、大きさの対称性',
          evaluationPoints: [
            '左右の高さは揃っているか',
            '目の大きさは左右対称か',
            '目頭・目尻の位置は適切か'
          ]
        }
      }
    },
    // 他のカテゴリーも同様に詳細に定義
  }
};

export function generateAnalysisPrompt(gender: Gender): string {
  const config = gender === 'female' ? FEMALE_CONFIG : MALE_CONFIG;
  
  return `
目的: 日本の${gender === 'female' ? '女性' : '男性'}向けの自己実現のための外見のパーソナルコーチとして、アップロードされた顔写真に基づき、日本のビューティースタンダードに照らし合わせて客観的な分析と具体的な改善点を提案してください。

評価基準について:
- ${config.scoreRanges.excellent.join('、')}のような顔を100点とします
- ${config.scoreRanges.good.join('、')}のような顔を80点とします
- ${config.scoreRanges.average.join('、')}を50点とします
- ${config.scoreRanges.poor.join('、')}を20点とします

分析の観点:
1. 黄金比に基づく顔のバランス
2. 左右対称性
3. 健康的な印象
4. 清潔感
5. 個性的な魅力

各項目の評価基準:
${Object.entries(config.categories)
  .map(([category, data]) => `
【${data.name}の評価】
${Object.entries(data.metrics)
  .map(([metric, details]) => `
- ${details.name}（${details.description}）
  評価ポイント:
  ${details.evaluationPoints.map(point => `  ・${point}`).join('\n')}
`).join('')}
`).join('')}

以下の形式でJSONを返してください：

{
  "measurements": {
    "eyes": {
      "size": 8,
      "shape": 7,
      "balance": 8,
      "analysis": [
        "目の形状についての優れている点（60字程度）",
        "目の形状についての優れている点（60字程度）",
        "目の形状についての優れている点（60字程度）"
      ],
      "improvement": [
        "改善のためのアドバイス（60字程度）",
        "改善のためのアドバイス（60字程度）",
        "改善のためのアドバイス（60字程度）"
      ]
    },
    // 他のカテゴリーも同様
  }
}`;
}