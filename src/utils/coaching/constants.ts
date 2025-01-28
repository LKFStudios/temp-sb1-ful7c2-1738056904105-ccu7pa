export const DEFAULT_FOLLOW_UP_QUESTIONS = [
  "💭 具体的にどんなことを知りたい？",
  "👀 気になることはある？",
  "💪 一緒に頑張っていきたいことは？"
];

export const DEFAULT_ERROR_MESSAGE = "😅 申し訳ありません。現在応答に問題が発生しています。時間をおいて再度お試しください。";

export const COACHING_CATEGORIES = {
  APPEARANCE: "appearance",
  HEALTH: "health",
  MENTAL: "mental",
  LIFESTYLE: "lifestyle"
} as const;

export const COACHING_TOPICS = {
  [COACHING_CATEGORIES.APPEARANCE]: [
    "顔の印象を良くしたい",
    "髪型を変えたい",
    "ファッションを改善したい",
    "体型を改善したい"
  ],
  [COACHING_CATEGORIES.HEALTH]: [
    "運動習慣をつけたい",
    "食生活を改善したい",
    "睡眠の質を上げたい",
    "ストレス解消法を知りたい"
  ],
  [COACHING_CATEGORIES.MENTAL]: [
    "自信をつけたい",
    "コミュニケーションを改善したい",
    "モチベーションを上げたい",
    "ストレス管理をしたい"
  ],
  [COACHING_CATEGORIES.LIFESTYLE]: [
    "生活習慣を改善したい",
    "時間管理を上手くしたい",
    "趣味を見つけたい",
    "新しい目標を立てたい"
  ]
} as const;