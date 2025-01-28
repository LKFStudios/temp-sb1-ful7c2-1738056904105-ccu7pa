import { Gender } from '../types';
import { MALE_ANALYSIS_PROMPT } from './malePrompts';
import { FEMALE_ANALYSIS_PROMPT } from './femalePrompts';
import { MALE_COACHING_PROMPT } from './maleCoachingPrompts';
import { FEMALE_COACHING_PROMPT } from './femaleCoachingPrompts';

const DEFAULT_COACHING_PROMPT = MALE_COACHING_PROMPT;
const DEFAULT_ANALYSIS_PROMPT = MALE_ANALYSIS_PROMPT;

export function usePrompts() {
  const getAnalysisPrompt = (gender: Gender): string => {
    switch (gender) {
      case 'female':
        return FEMALE_ANALYSIS_PROMPT;
      case 'male':
        return MALE_ANALYSIS_PROMPT;
      default:
        return DEFAULT_ANALYSIS_PROMPT;
    }
  };

  const getCoachingPrompt = (gender: Gender): string => {
    switch (gender) {
      case 'female':
        return FEMALE_COACHING_PROMPT;
      case 'male':
        return MALE_COACHING_PROMPT;
      default:
        return DEFAULT_COACHING_PROMPT;
    }
  };

  return {
    getAnalysisPrompt,
    getCoachingPrompt
  };
}