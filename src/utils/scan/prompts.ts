import { Gender } from '../types';
import { FEMALE_CONFIG, MALE_CONFIG } from './config';

export function generateScanPrompt(gender: Gender): string {
  const config = gender === 'female' ? FEMALE_CONFIG : MALE_CONFIG;
  
  return `
目的: 日本の${gender === 'female' ? '女性' : '男性'}の外見を分析し、個性を活かした魅力向上のためのアドバイスを提供します。

評価基準（100点満点）:
評価は0-100点の範囲で、1点刻みで詳細に評価してください。
以下は参考となる基準です：

- 95-100点: ${config.referenceScores.perfect.join('、')}レベル
- 85-94点: ${config.referenceScores.excellent.join('、')}レベル
- 75-84点: ${config.referenceScores.good.join('、')}レベル
- 45-74点: ${config.referenceScores.average.join('、')}レベル
- 0-44点: ${config.referenceScores.needsImprovement.join('、')}

評価の際は、以下の要素を総合的に判断し、具体的な数値（例：64点、98点など）で評価してください：

1. 黄金比（顔の縦横比、パーツの配置）
   - 顔の縦横比は理想的な黄金比（1:1.618）に近いか
   - 目、鼻、口の配置バランスは整っているか
   - 顔の左右対称性はどの程度か

2. 立体感・陰影
   - 骨格の立体感は十分か
   - 陰影の付き方は自然か
   - 顔の凹凸は適度か

3. 清潔感・健康感
   - 肌の状態は良好か
   - 髪の手入れは行き届いているか
   - 全体的な印象は健康的か

4. 個性的な魅力
   - その人らしさが感じられるか
   - 特徴的な魅力があるか
   - 印象に残る要素があるか

${Object.entries(config.features)
  .map(([feature, data]) => `
【${data.name}の評価】
${data.description}

${Object.entries(data.metrics)
  .map(([metric, details]) => `
${details.name}（${details.description}）
評価ポイント:
${details.evaluationPoints.map(point => `・${point}`).join('\n')}

改善提案:
${details.improvementSuggestions.map(suggestion => `・${suggestion}`).join('\n')}
`).join('\n')}
`).join('\n')}

以下の形式でJSONを返してください：

{
  "measurements": {
    "eyes": {
      "size": 具体的な数値（0-100）,
      "shape": 具体的な数値（0-100）,
      "balance": 具体的な数値（0-100）,
      "analysis": [
        "優れている点の具体的な説明（60字程度）",
        "優れている点の具体的な説明（60字程度）",
        "優れている点の具体的な説明（60字程度）"
      ],
      "improvement": [
        "改善のための具体的なアドバイス（60字程度）",
        "改善のための具体的なアドバイス（60字程度）",
        "改善のための具体的なアドバイス（60字程度）"
      ]
    }
    // 他の特徴も同様に評価
  }
}

注意事項：
- 評価は5の倍数に丸めずに、具体的な数値（例：64、98など）で評価してください
- 各項目の評価は独立して行い、総合的なバランスも考慮してください
- 改善点は具体的で実行可能なアドバイスを提供してください
- 分析は客観的かつ建設的な内容にしてください`;
}