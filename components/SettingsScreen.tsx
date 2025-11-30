import React from 'react';
import { View, Text, StyleSheet, Pressable, Switch, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';
import { NativeAdComponent } from './NativeAd';
import { spacing, borderRadius, typography, shadows } from '../theme';

export const SettingsScreen: React.FC = () => {
    const { theme, themeMode, toggleTheme } = useTheme();
    const { colors } = theme;

    const handleThemeToggle = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        toggleTheme();
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.primary }]}>
            <StatusBar barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colors.background.primary} />
            <LinearGradient
                colors={[colors.background.primary, colors.background.secondary]}
                style={styles.container}
            >
                {/* Header */}
                <Animated.View entering={FadeIn} style={styles.header}>
                    <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Settings</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.text.tertiary }]}>Customize your experience</Text>
                </Animated.View>

                {/* Settings Content */}
                <View style={styles.content}>
                    {/* Theme Section */}
                    <Animated.View entering={FadeInDown.delay(100)} style={[styles.section, { backgroundColor: colors.background.card }, shadows.md]}>
                        <Text style={[styles.sectionTitle, { color: colors.primary.main }]}>Appearance</Text>

                        <View style={[styles.settingItem, { borderBottomColor: colors.background.elevated }]}>
                            <View style={styles.settingLeft}>
                                <Text style={[styles.settingIcon]}>🌓</Text>
                                <View>
                                    <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Dark Mode</Text>
                                    <Text style={[styles.settingDescription, { color: colors.text.tertiary }]}>
                                        {themeMode === 'dark' ? 'Dark theme enabled' : 'Light theme enabled'}
                                    </Text>
                                </View>
                            </View>
                            <Switch
                                value={themeMode === 'dark'}
                                onValueChange={handleThemeToggle}
                                trackColor={{ false: colors.background.elevated, true: colors.primary.main }}
                                thumbColor={colors.background.card}
                                ios_backgroundColor={colors.background.elevated}
                            />
                        </View>
                    </Animated.View>

                    {/* About Section */}
                    <Animated.View entering={FadeInDown.delay(200)} style={[styles.section, { backgroundColor: colors.background.card }, shadows.md]}>
                        <Text style={[styles.sectionTitle, { color: colors.primary.main }]}>About</Text>

                        <View style={styles.settingItem}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>ℹ️</Text>
                                <View>
                                    <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Version</Text>
                                    <Text style={[styles.settingDescription, { color: colors.text.tertiary }]}>1.0.3</Text>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.settingItem, { borderBottomWidth: 0 }]}>
                            <View style={styles.settingLeft}>
                                <Text style={styles.settingIcon}>🏢</Text>
                                <View>
                                    <Text style={[styles.settingLabel, { color: colors.text.primary }]}>Developed by</Text>
                                    <Text style={[styles.settingDescription, { color: colors.text.tertiary }]}>Codexus Technologies</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Native Ad - Placed at bottom of settings */}
                    <Animated.View entering={FadeInDown.delay(300)}>
                        <NativeAdComponent />
                    </Animated.View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        paddingTop: spacing['4xl'],
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: typography.sizes['3xl'],
        fontWeight: typography.weights.bold,
        marginBottom: spacing.xs,
    },
    headerSubtitle: {
        fontSize: typography.sizes.sm,
        letterSpacing: 0.5,
    },
    content: {
        flex: 1,
        padding: spacing.lg,
        gap: spacing.lg,
    },
    section: {
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
    },
    sectionTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        marginBottom: spacing.md,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        flex: 1,
    },
    settingIcon: {
        fontSize: 24,
    },
    settingLabel: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.semibold,
    },
    settingDescription: {
        fontSize: typography.sizes.sm,
        marginTop: 2,
    },
});
