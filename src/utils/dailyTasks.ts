import { AnalysisResult, Task } from './types';
import { env } from '../config/env';
import { ApiClient } from './apiClient';
import { Gender } from '../types';

const MALE_TASK_PROMPT = `あなたは男性向けの美容とセルフケアの専門家として、以下の分析結果に基づいて、その人に最適な1日のタスクを提案してください。

分析結果:
{analysisJson}

以下の要素を考慮してタスクを生成してください：

1. スコアに基づく優先順位付け
   - 低スコアの項目に対する重点的なケア
   - 高スコアの項目のメンテナンス方法
   - 各スコアの改善可能性

2. 時間帯別のケア
   朝のルーティン（20-30分）:
   - 洗顔・スキンケア（肌スコアに応じた具体的な手順）
   - ヘアスタイリング（髪型スコアに基づく推奨）
   - 姿勢チェック・ストレッチ

   日中のケア（5-10分 x 3回）:
   - デスクワーク時の姿勢矯正
   - 顔のマッサージ・ストレッチ
   - 水分補給のタイミング

   夜のルーティン（15-20分）:
   - 入浴時のケアポイント
   - ナイトスキンケア
   - リラックス習慣

3. カテゴリー別の具体的なタスク
   スキンケア（肌スコア: {skinScore}/100）:
   - 洗顔料の選び方と使用方法
   - 保湿の手順とタイミング
   - 日焼け対策の具体策

   トレーニング（フェイスラインスコア: {jawlineScore}/100）:
   - 顔周りの筋トレメニュー
   - 全身運動の推奨セット数
   - インターバルの取り方

   栄養管理:
   - 推奨プロテイン摂取量
   - 肌に良い食材リスト
   - 食事のタイミング

4. 継続のためのポイント
   - 習慣化のための具体的な目標設定
   - 進捗の記録方法
   - モチベーション維持のコツ

以下の形式でJSONを返してください：

{
  "tasks": [
    {
      "title": "タスクのタイトル",
      "description": "具体的な実施方法や注意点",
      "category": "skincare/exercise/diet/mental",
      "timeOfDay": "morning/afternoon/evening",
      "duration": "所要時間（分）",
      "difficulty": "easy/medium/hard",
      "priority": 1-5（スコアに応じて）
    }
  ]
}`;

const FEMALE_TASK_PROMPT = `あなたは女性向けの美容とセルフケアの専門家として、以下の分析結果に基づいて、その人に最適な1日のタスクを提案してください。

分析結果:
{analysisJson}

以下の要素を考慮してタスクを生成してください：

1. スコアに基づく優先順位付け
   - 低スコアの項目への集中的なケア
   - 高スコアの項目の維持方法
   - 各項目の相乗効果を考慮

2. 時間帯別のビューティーケア
   朝のスキンケア（25-30分）:
   - 丁寧な洗顔手順（肌スコアに応じた方法）
   - 化粧水・美容液の重ねづけ
   - ベースメイクのポイント
   
   日中のケア（5-10分 x 3回）:
   - 化粧直しのタイミング
   - 肌の保湿・メイクの補正
   - リフトアップマッサージ

   夜のスペシャルケア（20-25分）:
   - クレンジング・洗顔の丁寧な手順
   - パック・マッサージの選択
   - ナイトケアの集中ケア

3. カテゴリー別の具体的なケア
   スキンケア（肌スコア: {skinScore}/100）:
   - 肌質に合わせた製品選び
   - 美容液の使用順序
   - 集中ケアの方法

   フェイシャルケア（フェイスラインスコア: {jawlineScore}/100）:
   - リンパマッサージの手順
   - 表情筋トレーニング
   - 小顔ケアの方法

   ヘアケア（髪型スコア: {hairScore}/100）:
   - シャンプー・トリートメント選び
   - ブローの手順
   - スタイリングのコツ

4. 美容習慣の定着化
   - 毎日続けられる時間配分
   - 効果を実感できるチェックポイント
   - モチベーション維持の工夫

以下の形式でJSONを返してください：

{
  "tasks": [
    {
      "title": "タスクのタイトル",
      "description": "具体的な実施方法や注意点",
      "category": "skincare/facial/hair/wellness",
      "timeOfDay": "morning/afternoon/evening",
      "duration": "所要時間（分）",
      "difficulty": "easy/medium/hard",
      "priority": 1-5（スコアに応じて）
    }
  ]
}`;

function filterTasksBySkinScore(tasks: Task[], skinScore: number): Task[] {
  if (skinScore >= 90) {
    return tasks.filter(task => task.category !== 'skincare');
  }
  return tasks;
}

function getDefaultTasks(skinScore: number, gender: Gender): Task[] {
  const baseTasks = gender === 'female' ? [
    {
      id: '1',
      title: '朝の丁寧なスキンケア',
      description: '化粧水→美容液→乳液の順で、それぞれ手のひらで優しく押し込むように浸透させる',
      category: 'skincare',
      timeOfDay: 'morning',
      duration: 10,
      difficulty: 'easy',
      completed: false,
      priority: 1
    },
    {
      id: '2',
      title: 'リフトアップマッサージ',
      description: '耳下から顎にかけて、リンパの流れに沿って優しくマッサージ（3分×2セット）',
      category: 'facial',
      timeOfDay: 'morning',
      duration: 8,
      difficulty: 'easy',
      completed: false,
      priority: 2
    },
    {
      id: '3',
      title: '日中の保湿ケア',
      description: 'ミスト化粧水でうるおいチャージ。手のひらで優しく押さえて浸透を促す',
      category: 'skincare',
      timeOfDay: 'afternoon',
      duration: 3,
      difficulty: 'easy',
      completed: false,
      priority: 3
    },
    {
      id: '4',
      title: 'ヘアケアタイム',
      description: 'ブラッシングでマッサージ効果を。毛先までしっかりとケア',
      category: 'hair',
      timeOfDay: 'evening',
      duration: 5,
      difficulty: 'easy',
      completed: false,
      priority: 4
    },
    {
      id: '5',
      title: 'ナイトスキンケア',
      description: 'クレンジング→洗顔→化粧水→美容液→クリームの5ステップ',
      category: 'skincare',
      timeOfDay: 'evening',
      duration: 15,
      difficulty: 'medium',
      completed: false,
      priority: 1
    }
  ] : [
    {
      id: '1',
      title: '朝の洗顔とスキンケア',
      description: '洗顔後、化粧水と乳液で保湿を行い、日焼け止めを塗布',
      category: 'skincare',
      timeOfDay: 'morning',
      duration: 5,
      difficulty: 'easy',
      completed: false,
      priority: 1
    },
    {
      id: '2',
      title: '筋トレ＆ストレッチ',
      description: '腕立て20回×3セット、腹筋20回×3セット、全身ストレッチ',
      category: 'exercise',
      timeOfDay: 'morning',
      duration: 15,
      difficulty: 'medium',
      completed: false,
      priority: 2
    },
    {
      id: '3',
      title: 'フェイスラインケア',
      description: 'あごの下から耳後ろまでのマッサージを10回×3セット',
      category: 'facial',
      timeOfDay: 'afternoon',
      duration: 5,
      difficulty: 'easy',
      completed: false,
      priority: 3
    },
    {
      id: '4',
      title: 'プロテイン補給',
      description: 'トレーニング後にプロテインを飲んで栄養補給',
      category: 'diet',
      timeOfDay: 'afternoon',
      duration: 5,
      difficulty: 'easy',
      completed: false,
      priority: 4
    },
    {
      id: '5',
      title: '夜のスキンケア',
      description: '丁寧に洗顔し、化粧水で保湿。乳液で蓋をする',
      category: 'skincare',
      timeOfDay: 'evening',
      duration: 5,
      difficulty: 'easy',
      completed: false,
      priority: 1
    }
  ];

  return filterTasksBySkinScore(baseTasks, skinScore);
}

export async function generateDailyTasks(analysisResult: AnalysisResult, gender: Gender): Promise<Task[]> {
  if (!analysisResult?.scores?.skin) {
    return getDefaultTasks(0, gender);
  }

  const skinScore = analysisResult.scores.skin;

  if (!env.GEMINI_API_KEY) {
    return getDefaultTasks(skinScore, gender);
  }

  try {
    const apiClient = ApiClient.getInstance();
    const prompt = (gender === 'female' ? FEMALE_TASK_PROMPT : MALE_TASK_PROMPT)
      .replace('{analysisJson}', JSON.stringify({
        scores: analysisResult.scores,
        detailedScores: analysisResult.detailedScores
      }, null, 2))
      .replace('{skinScore}', analysisResult.scores.skin.toString())
      .replace('{jawlineScore}', analysisResult.scores.jawline.toString())
      .replace('{hairScore}', analysisResult.scores.hair.toString());

    const response = await apiClient.generateContent(prompt);
    
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      
      if (!jsonMatch) {
        console.warn('Invalid response format, falling back to default tasks');
        return getDefaultTasks(skinScore, gender);
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      if (!parsed.tasks || !Array.isArray(parsed.tasks) || parsed.tasks.length === 0) {
        console.warn('No valid tasks found in response, falling back to default tasks');
        return getDefaultTasks(skinScore, gender);
      }

      const tasks = parsed.tasks.map((task: any, index: number) => ({
        id: `task-${index + 1}`,
        title: task.title || '未設定のタスク',
        description: task.description || '説明なし',
        category: task.category || 'other',
        timeOfDay: task.timeOfDay || 'morning',
        duration: parseInt(task.duration) || 15,
        difficulty: task.difficulty || 'medium',
        priority: parseInt(task.priority) || 3,
        completed: false
      }));

      return filterTasksBySkinScore(tasks, skinScore);
    } catch (parseError) {
      console.warn('Failed to parse tasks response:', parseError);
      return getDefaultTasks(skinScore, gender);
    }
  } catch (error) {
    console.warn('Task generation error:', error);
    return getDefaultTasks(skinScore, gender);
  }
}