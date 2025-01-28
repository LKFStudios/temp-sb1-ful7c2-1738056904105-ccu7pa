import { UserProfile, CreateProfileData, UpdateProfileData } from '../utils/types';
import { analytics } from './analytics';

export async function createUserProfile(data: CreateProfileData): Promise<UserProfile> {
  try {
    const profile = {
      id: Date.now().toString(),
      userId: Date.now().toString(),
      gender: data.gender,
      birthDate: data.birthDate,
      authProvider: data.authProvider,
      email: data.email,
      displayName: data.displayName,
      avatarUrl: data.avatarUrl,
      metadata: data.metadata || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));

    analytics.track('Profile Created', {
      gender: data.gender,
      authProvider: data.authProvider
    });

    return profile;
  } catch (error) {
    console.error('Failed to create profile:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Profile creation failed'));
    throw new Error('プロフィールの作成に失敗しました');
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const profileStr = localStorage.getItem('userProfile');
    return profileStr ? JSON.parse(profileStr) : null;
  } catch (error) {
    console.error('Failed to get profile:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Profile fetch failed'));
    throw new Error('プロフィールの取得に失敗しました');
  }
}

export async function updateUserProfile(data: UpdateProfileData): Promise<UserProfile> {
  try {
    const currentProfile = await getUserProfile();
    if (!currentProfile) {
      throw new Error('Profile not found');
    }

    const updatedProfile = {
      ...currentProfile,
      ...data,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));

    analytics.track('Profile Updated', {
      gender: data.gender
    });

    return updatedProfile;
  } catch (error) {
    console.error('Failed to update profile:', error);
    analytics.trackError(error instanceof Error ? error : new Error('Profile update failed'));
    throw new Error('プロフィールの更新に失敗しました');
  }
}