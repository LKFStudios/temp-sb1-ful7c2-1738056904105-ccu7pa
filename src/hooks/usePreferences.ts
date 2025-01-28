import { useState, useEffect } from 'react';
import { UserPreferences, UpdatePreferencesData } from '../utils/types';
import { getUserPreferences, updateUserPreferences } from '../services/preferences';

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setLoading(true);
      const prefs = await getUserPreferences();
      setPreferences(prefs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '設定の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (data: UpdatePreferencesData) => {
    try {
      setLoading(true);
      const updatedPrefs = await updateUserPreferences(data);
      setPreferences(updatedPrefs);
      setError(null);
      return updatedPrefs;
    } catch (err) {
      setError(err instanceof Error ? err.message : '設定の更新に失敗しました');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    preferences,
    loading,
    error,
    updatePreferences,
    reloadPreferences: loadPreferences
  };
}