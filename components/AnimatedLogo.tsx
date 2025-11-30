import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    interpolateColor,
    Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing, typography, borderRadius } from '../theme';

export const AnimatedLogo: React.FC = () => {
    const colorProgress = useSharedValue(0);

    useEffect(() => {
        colorProgress.value = withRepeat(
            withTiming(1, {
                duration: 4000,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        const color1 = interpolateColor(
            colorProgress.value,
            [0, 0.25, 0.5, 0.75, 1],
            ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#3b82f6']
        );

        const color2 = interpolateColor(
            colorProgress.value,
            [0, 0.25, 0.5, 0.75, 1],
            ['#8b5cf6', '#ec4899', '#f59e0b', '#3b82f6', '#8b5cf6']
        );

        return {
            color: color1,
        };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        const color2 = interpolateColor(
            colorProgress.value,
            [0, 0.25, 0.5, 0.75, 1],
            ['#8b5cf6', '#ec4899', '#f59e0b', '#3b82f6', '#8b5cf6']
        );

        return {
            color: color2,
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.logoTextContainer}>
                <Animated.Text style={[styles.logoText, animatedStyle]}>
                    Codexus
                </Animated.Text>
                <Animated.Text style={[styles.logoText, animatedStyle2]}>
                    {' '}Technologies
                </Animated.Text>
            </View>
            <Text style={styles.subtitle}>Quantum Circuit Simulator</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    logoTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    logoText: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#94a3b8',
        letterSpacing: 1.2,
        fontWeight: '500',
        textTransform: 'uppercase',
    },
});
