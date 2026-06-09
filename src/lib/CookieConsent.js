/**
 * Cookie consent management for UK PECR compliance
 * Handles storing and retrieving user consent for non-essential cookies
 */

const CONSENT_KEY = 'escapetoasia_cookie_consent';
const CONSENT_BANNER_DISMISSED = 'escapetoasia_cookie_banner_dismissed';

// Consent preferences
export const COOKIE_TYPES = {
  ANALYTICS: 'analytics',
  CHAT: 'chat',
};

/**
 * Get current consent preferences
 * @returns {Object} { analytics: boolean, chat: boolean }
 */
export const getConsentPreferences = () => {
  if (typeof window === 'undefined') {
    return { analytics: false, chat: false };
  }

  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to parse cookie consent preferences:', e);
  }

  return { analytics: false, chat: false };
};

/**
 * Check if a specific cookie type has consent
 * @param {string} cookieType - COOKIE_TYPES.ANALYTICS or COOKIE_TYPES.CHAT
 * @returns {boolean}
 */
export const hasConsent = (cookieType) => {
  const preferences = getConsentPreferences();
  return preferences[cookieType] === true;
};

/**
 * Save consent preferences
 * @param {Object} preferences - { analytics: boolean, chat: boolean }
 */
export const saveConsentPreferences = (preferences) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(preferences));
    localStorage.setItem(CONSENT_BANNER_DISMISSED, 'true');
  } catch (e) {
    console.warn('Failed to save cookie consent preferences:', e);
  }
};

/**
 * Check if banner has been dismissed (user has made a choice)
 * @returns {boolean}
 */
export const isBannerDismissed = () => {
  if (typeof window === 'undefined') return true;
  return localStorage.getItem(CONSENT_BANNER_DISMISSED) === 'true';
};

/**
 * Reset consent (e.g., add button to settings to clear preferences)
 */
export const resetConsent = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONSENT_KEY);
  localStorage.removeItem(CONSENT_BANNER_DISMISSED);
};

/**
 * Accept all cookies
 */
export const acceptAllCookies = () => {
  saveConsentPreferences({
    analytics: true,
    chat: true,
  });
};

/**
 * Decline non-essential cookies
 */
export const declineNonEssentialCookies = () => {
  saveConsentPreferences({
    analytics: false,
    chat: false,
  });
};

