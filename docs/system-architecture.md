# イケメン工場 システム構成

## 概要

イケメン工場は、AIを活用して顔写真を分析し、魅力度を数値化・可視化するアプリケーションです。

## 技術スタック

- フロントエンド: React + TypeScript + Vite
- スタイリング: Tailwind CSS
- AI分析: Google Gemini API
- アイコン: Lucide React

## システム構成

### コアモジュール

1. **顔分析エンジン**
   - `src/utils/faceAnalysis.ts`: 顔分析のメインロジック
   - `src/utils/gemini.ts`: Gemini APIとの通信
   - `src/utils/scoring.ts`: スコア計算ロジック

2. **型定義**
   - `src/utils/types.ts`: システム全体で使用する型定義

### UI コンポーネント

1. **メインフロー**
   - WelcomeScreen: 初期画面
   - RatingScreen: 評価画面
   - ReferralScreen: 紹介コード入力
   - NotificationScreen: 通知設定
   - AccountScreen: アカウント作成
   - ScanScreen: 写真撮影/アップロード
   - PaywallScreen: 課金導線
   - RatingResult: 分析結果表示

2. **共通コンポーネント**
   - Navigation: 下部ナビゲーション
   - ErrorMessage: エラー表示
   - ErrorBoundary: エラーハンドリング
   - ScoreBar: スコア表示バー
   - DistributionGraph: 分布グラフ

### データフロー

1. **画像分析プロセス**
   ```
   画像アップロード → 画像読み込み → 顔検出 → 特徴分析 → スコア計算 → 結果表示
   ```

2. **スコアリングシステム**
   - 顔の各パーツ（目、鼻、口、顎など）を個別評価
   - 全体的なバランスを評価
   - 各評価を重み付けして総合スコアを算出

### セキュリティ

1. **API認証**
   - Gemini APIキーを環境変数で管理
   - フロントエンドでの直接的なAPIキー露出を防止

2. **データ保護**
   - アップロードされた画像は分析後に即時削除
   - 個人情報は必要最小限のみを保持

## デプロイメント

- Netlifyを使用した自動デプロイ
- 環境変数による設定管理
- ビルド最適化による高速な初期ロード

## 将来の拡張性

1. **機能拡張**
   - リアルタイム顔分析
   - 時系列での変化トラッキング
   - AIによるパーソナライズされた改善提案

2. **インフラ**
   - CDNによる画像配信の最適化
   - サーバーサイド処理の導入
   - データベースの導入