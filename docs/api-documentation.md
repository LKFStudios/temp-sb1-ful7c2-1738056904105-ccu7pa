# API ドキュメント

## Gemini API

### 顔分析エンドポイント

```typescript
analyzeWithGemini(imageData: string): Promise<AnalysisMetrics>
```

#### パラメータ
- `imageData`: Base64エンコードされた画像データ

#### レスポンス
```typescript
{
  eyes: {
    size: number;    // 0-10
    shape: number;   // 0-10
    balance: number; // 0-10
  };
  nose: {
    height: number;  // 0-10
    bridge: number;  // 0-10
    shape: number;   // 0-10
  };
  // ... その他のメトリクス
}
```

### プロンプト仕様

分析プロンプトは以下の要素を評価:

1. 顔の評価
   - 目の形状、大きさ、バランス
   - 鼻筋の通り具合、高さ
   - 口元の形状、表情
   - 輪郭のシャープさ、バランス
   - 肌の質感、トーン
   - 全体的なバランス

2. 髪型の評価
   - 髪質、ボリューム
   - 顔型とのバランス
   - スタイルのトレンド性

### エラーハンドリング

```typescript
interface APIError {
  message: string;
  code: string;
  details?: any;
}
```

主なエラーコード:
- `INVALID_IMAGE`: 画像フォーマットが不正
- `API_ERROR`: API通信エラー
- `PARSE_ERROR`: レスポンスのパースエラー