import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius, typography, shadows } from '../theme';

interface BottomNavigationProps {
    activeScreen: 'simulator' | 'learn' | 'settings';
    onNavigate: (screen: 'simulator' | 'learn' | 'settings') => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeScreen, onNavigate }) => {
    const { theme } = useTheme();
    const { colors } = theme;

    const handlePress = (screen: 'simulator' | 'learn' | 'settings') => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onNavigate(screen);
    };

    const NavButton: React.FC<{ screen: 'simulator' | 'learn' | 'settings'; icon: string; label: string }> = ({ screen, icon, label }) => {
        const isActive = activeScreen === screen;

        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{ scale: withSpring(isActive ? 1.1 : 1) }],
            };
        });

        return (
            <AnimatedPressable
                style={[styles.navButton, animatedStyle]}
                onPress={() => handlePress(screen)}
            >
                <View style={[
                    styles.iconContainer,
                    { backgroundColor: isActive ? colors.primary.main : 'transparent' }
                ]}>
                    <Text style={styles.icon}>{icon}</Text>
                </View>
                <Text style={[
                    styles.label,
                    { color: isActive ? colors.primary.main : colors.text.tertiary }
                ]}>
                    {label}
                </Text>
                {isActive && (
                    <View style={[styles.indicator, { backgroundColor: colors.primary.main }]} />
                )}
            </AnimatedPressable>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background.card }, shadows.xl]}>
            <NavButton screen="simulator" icon="🔬" label="Simulator" />
            <NavButton screen="learn" icon="📚" label="Learn" />
            <NavButton screen="settings" icon="⚙️" label="Settings" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderTopWidth: 1,
        borderTopColor: 'rgba(100, 116, 139, 0.1)',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: spacing.xs,
        position: 'relative',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: borderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    icon: {
        fontSize: 24,
    },
    label: {
        fontSize: typography.sizes.xs,
        fontWeight: typography.weights.medium,
    },
    indicator: {
        position: 'absolute',
        top: 0,
        width: 32,
        height: 3,
        borderRadius: borderRadius.full,
    },
});
