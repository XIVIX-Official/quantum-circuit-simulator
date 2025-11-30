import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius, typography, shadows } from '../theme';

// Conditionally import AdMob - will be undefined in Expo Go
let BannerAd: any;
let BannerAdSize: any;
let TestIds: any;

try {
    const GoogleMobileAds = require('react-native-google-mobile-ads');
    BannerAd = GoogleMobileAds.BannerAd;
    BannerAdSize = GoogleMobileAds.BannerAdSize;
    TestIds = GoogleMobileAds.TestIds;
} catch (e) {
    // AdMob not available (Expo Go) - component will render nothing
    console.log('AdMob not available - running in Expo Go');
}

interface NativeAdComponentProps {
    style?: any;
}

/**
 * Native Ad Component (Optional)
 * 
 * Displays Google AdMob ads when running in custom dev client.
 * Automatically hides in Expo Go (where native modules aren't available).
 * 
 * Features:
 * - Works in both Expo Go (no ads) and custom dev client (with ads)
 * - Graceful fallback - renders nothing if AdMob unavailable
 * - Automatic theme matching
 * - Loading states and error handling
 */
export const NativeAdComponent: React.FC<NativeAdComponentProps> = ({ style }) => {
    const { theme } = useTheme();
    const { colors } = theme;
    const [isLoading, setIsLoading] = useState(true);
    const [adFailedToLoad, setAdFailedToLoad] = useState(false);

    // If AdMob not available (Expo Go), render nothing
    if (!BannerAd) {
        return null;
    }

    // Get ad unit ID from environment or use test ID
    let adUnitId: string;
    try {
        const { getNativeAdUnitId, isUsingTestAds } = require('../services/adMobConfig');
        adUnitId = isUsingTestAds() ? TestIds.BANNER : getNativeAdUnitId();
    } catch (e) {
        // Fallback to test ID if config fails
        adUnitId = TestIds?.BANNER || '';
    }

    const handleAdLoaded = () => {
        setIsLoading(false);
        setAdFailedToLoad(false);
    };

    const handleAdFailedToLoad = (error: any) => {
        console.log('Ad failed to load:', error);
        setIsLoading(false);
        setAdFailedToLoad(true);
    };

    // Don't render if ad failed to load (graceful failure)
    if (adFailedToLoad) {
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background.card }, shadows.md, style]}>
            {/* Ad Badge - Required by Google policies */}
            <View style={[styles.adBadge, { backgroundColor: colors.primary.main }]}>
                <Text style={styles.adBadgeText}>Ad</Text>
            </View>

            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={colors.primary.main} />
                    <Text style={[styles.loadingText, { color: colors.text.tertiary }]}>Loading ad...</Text>
                </View>
            )}

            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                onAdLoaded={handleAdLoaded}
                onAdFailedToLoad={handleAdFailedToLoad}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.lg,
        padding: spacing.md,
        marginVertical: spacing.md,
        overflow: 'hidden',
        alignItems: 'center',
        minHeight: 280, // Medium rectangle is 300x250
    },
    adBadge: {
        position: 'absolute',
        top: spacing.xs,
        right: spacing.xs,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
        zIndex: 10,
    },
    adBadgeText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: typography.weights.bold,
        textTransform: 'uppercase',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        gap: spacing.sm,
    },
    loadingText: {
        fontSize: typography.sizes.sm,
    },
});
