import { v4 as uuidv4 } from 'uuid';

const REFERRAL_CODE_LENGTH = 8;

export function generateReferralId(): string {
  // Generate a unique ID and take first 8 characters
  return uuidv4().slice(0, REFERRAL_CODE_LENGTH).toUpperCase();
}

export function generateReferralUrl(referralId: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}?ref=${referralId}`;
}

export function isValidReferralId(referralId: string): boolean {
  return /^[A-Z0-9]{8}$/.test(referralId);
}

export function extractReferralId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const referralId = urlObj.searchParams.get('ref');
    return referralId && isValidReferralId(referralId) ? referralId : null;
  } catch {
    return null;
  }
}