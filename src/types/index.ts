export type Gender = 'male' | 'female' | 'unspecified';

export interface AnalysisMetrics {
  eyes: {
    size: number;
    shape: number;
    balance: number;
    analysis: string[];
    improvement: string[];
  };
  nose: {
    height: number;
    bridge: number;
    shape: number;
    analysis: string[];
    improvement: string[];
  };
  skin: {
    texture: number;
    tone: number;
    clarity: number;
    analysis: string[];
    improvement: string[];
  };
  jawline: {
    definition: number;
    balance: number;
    angle: number;
    analysis: string[];
    improvement: string[];
  };
  hair: {
    quality: number;
    volume: number;
    style: number;
    analysis: string[];
    improvement: string[];
  };
}

// ... rest of the types remain the same