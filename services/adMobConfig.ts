import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * AdMob Configuration
 * 
 * Ad Unit IDs are loaded from environment variables (.env.local)
 * This keeps sensitive IDs out of the codebase (important for open source)
 * 
 * For development: Use test IDs from .env.example
 * For production: Replace with real IDs from your AdMob account
 */

// Get Ad Unit IDs from environment variables
const ANDROID_NATIVE_AD_ID = Constants.expoConfig?.extra?.EXPO_PUBLIC_ADMOB_ANDROID_NATIVE_AD_ID ||
    'ca-app-pub-3940256099942544/2247696110'; // Test ID fallback

const IOS_NATIVE_AD_ID = Constants.expoConfig?.extra?.EXPO_PUBLIC_ADMOB_IOS_NATIVE_AD_ID ||
    'ca-app-pub-3940256099942544/3986624511'; // Test ID fallback

/**
 * Get the native ad unit ID for the current platform
 */
export const getNativeAdUnitId = (): string => {
    return Platform.select({
        ios: IOS_NATIVE_AD_ID,
        android: ANDROID_NATIVE_AD_ID,
    }) || ANDROID_NATIVE_AD_ID;
};

/**
 * AdMob configuration options
 */
export const adMobConfig = {
    // Request non-personalized ads for better privacy compliance
    requestNonPersonalizedAdsOnly: false,

    // Maximum ad content rating (for child-directed apps)
    maxAdContentRating: 'G', // G, PG, T, MA

    // Tag for child-directed treatment (COPPA compliance)
    tagForChildDirectedTreatment: false,

    // Tag for under age of consent (GDPR compliance)
    tagForUnderAgeOfConsent: false,
};

/**
 * Test if we're using test ad unit IDs
 */
export const isUsingTestAds = (): boolean => {
    return getNativeAdUnitId().includes('3940256099942544');
};
