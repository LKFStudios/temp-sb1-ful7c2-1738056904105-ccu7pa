export const NAVIGATION_SCREENS = {
  SCAN: 'scan',
  DAILY: 'daily',
  COACH: 'coach',
  SETTINGS: 'settings'
} as const;

export const NAVIGATION_LABELS = {
  FEMALE: {
    [NAVIGATION_SCREENS.SCAN]: '診断',
    [NAVIGATION_SCREENS.DAILY]: 'デイリー',
    [NAVIGATION_SCREENS.COACH]: 'カウンセラー',
    [NAVIGATION_SCREENS.SETTINGS]: '設定'
  },
  MALE: {
    [NAVIGATION_SCREENS.SCAN]: 'スキャン',
    [NAVIGATION_SCREENS.DAILY]: 'デイリー',
    [NAVIGATION_SCREENS.COACH]: 'コーチ',
    [NAVIGATION_SCREENS.SETTINGS]: '設定'
  }
} as const;