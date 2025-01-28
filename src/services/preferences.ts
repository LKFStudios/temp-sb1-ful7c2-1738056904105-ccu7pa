import { UserPreferences, UpdatePreferencesData } from '../utils/types';

export async function getUserPreferences(): Promise<UserPreferences | null> {
  try {
    const prefsStr = localStorage.getItem('userPreferences');
    return prefsStr ? JSON.parse(prefsStr) : null;
  } catch (error) {
    console.error('Failed to fetch user preferences:', error);
    throw new Error('設定の取得に失敗しました');
  }
}

export async function updateUserPreferences(data: UpdatePreferencesData): Promise<UserPreferences> {
  try {
    const existingPrefs = await getUserPreferences();
    const updatedPrefs = {
      id: existingPrefs?.id || Date.now().toString(),
      userId: existingPrefs?.userId || Date.now().toString(),
      ...data,
      customSettings: {
        ...(existingPrefs?.customSettings || {}),
        ...(data.customSettings || {})
      }
    };

    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    return updatedPrefs;
  } catch (error) {
    console.error('Failed to update user preferences:', error);
    throw new Error('設定の更新に失敗しました');
  }
}

export async function initializeUserPreferences(): Promise<void> {
  try {
    const existingPrefs = await getUserPreferences();
    if (!existingPrefs) {
      await updateUserPreferences({
        theme: 'light',
        notificationEnabled: true,
        dailyReminderTime: '09:00',
        language: 'ja',
        customSettings: {
          skincare: {
            routine: [],
            products: [],
            concerns: []
          },
          exercise: {
            routine: [],
            frequency: 7,
            duration: 30
          },
          diet: {
            restrictions: [],
            goals: []
          }
        }
      });
    }
  } catch (error) {
    console.error('Failed to initialize user preferences:', error);
  }
}