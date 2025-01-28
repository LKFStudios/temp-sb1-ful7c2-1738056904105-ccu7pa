export interface ScanPromptConfig {
  referenceScores: {
    perfect: string[];
    excellent: string[];
    good: string[];
    average: string[];
    needsImprovement: string[];
  };
  features: {
    [key: string]: {
      name: string;
      description: string;
      metrics: {
        [key: string]: {
          name: string;
          description: string;
          evaluationPoints: string[];
          improvementSuggestions: string[];
        };
      };
    };
  };
}

export interface ScanFeatureMetric {
  name: string;
  description: string;
  evaluationPoints: string[];
  improvementSuggestions: string[];
}

export interface ScanFeature {
  name: string;
  description: string;
  metrics: Record<string, ScanFeatureMetric>;
}