export type Gender = 'male' | 'female' | 'unspecified';

export type AuthProvider = 'email' | 'apple' | 'google';

export interface UserProfile {
  id: string;
  userId: string;
  gender: Gender;
  birthDate?: string;
  authProvider: AuthProvider;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  metadata: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProfileData {
  gender: Gender;
  birthDate?: string;
  authProvider: AuthProvider;
  email?: string;
  displayName?: string;
  avatarUrl?: string;
  metadata?: Record<string, any>;
}

export interface UpdateProfileData {
  gender?: Gender;
  birthDate?: string;
  displayName?: string;
  avatarUrl?: string;
  metadata?: Record<string, any>;
}

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

export interface AnalysisResult {
  scores: {
    total: number;
    eyes: number;
    nose: number;
    skin: number;
    jawline: number;
    hair: number;
  };
  detailedScores: AnalysisMetrics;
  imageUrl?: string | null;
  advice: {
    eyes: string[];
    nose: string[];
    skin: string[];
    jawline: string[];
    hair: string[];
    improvements: string[];
  };
}

export interface DetailedScores extends AnalysisMetrics {}

export interface Scores {
  total: number;
  eyes: number;
  nose: number;
  skin: number;
  jawline: number;
  hair: number;
}