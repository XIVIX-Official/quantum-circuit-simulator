import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Modal } from 'react-native';
import Animated, { FadeIn, SlideInUp, SlideInDown, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import type { SimulationResult } from '../types';
import { C } from '../lib/complex';
import { HistogramChart } from './HistogramChart';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface ResultsDisplayProps {
    result: SimulationResult | null;
    error: string | null;
    isSimulating: boolean;
    numQubits: number;
    visible: boolean;
    onClose: () => void;
}

type ViewMode = 'histogram' | 'statevector';

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
    result,
    error,
    isSimulating,
    numQubits,
    visible,
    onClose
}) => {
    const [viewMode, setViewMode] = useState<ViewMode>('histogram');

    const renderContent = () => {
        if (isSimulating) {
            return (
                <View style={styles.centerContent}>
                    <ActivityIndicator size="large" color={colors.primary.main} />
                    <Text style={styles.loadingText}>Simulating...</Text>
                </View>
            );
        }

        if (error) {
            return (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            );
        }

        if (!result) {
            return (
                <View style={styles.centerContent}>
                    <Text style={styles.placeholderText}>
                        Run a simulation to see the results
                    </Text>
                </View>
            );
        }

        if (viewMode === 'histogram') {
            return (
                <Animated.View entering={FadeIn}>
                    <Text style={styles.subtitle}>
                        Probability of measuring each state after 1024 runs
                    </Text>
                    <HistogramChart data={result.measuredCounts} />
                </Animated.View>
            );
        }

        if (viewMode === 'statevector') {
            return (
                <Animated.View entering={FadeIn}>
                    <Text style={styles.subtitle}>
                        The final quantum state of the system. Each line shows a basis state and its complex amplitude.
                    </Text>
                    <ScrollView style={styles.stateVectorScroll}>
                        {result.statevector.map((amplitude, i) => {
                            const basisState = i.toString(2).padStart(numQubits, '0');
                            if (C.magnitudeSq(amplitude) > 1e-6) {
                                return (
                                    <View key={i} style={styles.stateRow}>
                                        <Text style={styles.basisState}>|{basisState}⟩</Text>
                                        <Text style={styles.amplitude}>{C.toString(amplitude, 3)}</Text>
                                    </View>
                                );
                            }
                            return null;
                        })}
                    </ScrollView>
                </Animated.View>
            );
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <Animated.View
                style={[StyleSheet.absoluteFill, styles.modalOverlay]}
                entering={FadeIn.duration(300)}
            >
                <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
                <Animated.View
                    entering={SlideInDown.springify().damping(15).stiffness(150).mass(0.8)}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Simulation Results</Text>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </Pressable>
                    </View>

                    {result && (
                        <View style={styles.tabContainer}>
                            <Pressable
                                style={[styles.tab, viewMode === 'histogram' && styles.activeTab]}
                                onPress={() => setViewMode('histogram')}
                            >
                                <Text style={[styles.tabText, viewMode === 'histogram' && styles.activeTabText]}>
                                    Histogram
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.tab, viewMode === 'statevector' && styles.activeTab]}
                                onPress={() => setViewMode('statevector')}
                            >
                                <Text style={[styles.tabText, viewMode === 'statevector' && styles.activeTabText]}>
                                    State Vector
                                </Text>
                            </Pressable>
                        </View>
                    )}

                    <ScrollView style={styles.content} bounces={false} indicatorStyle="white">
                        {renderContent()}
                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.background.card,
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.xl,
        paddingBottom: spacing.md,
        height: '85%',
        ...shadows.xl,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    modalTitle: {
        fontSize: typography.sizes['2xl'],
        fontWeight: typography.weights.bold,
        color: colors.primary.main,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.full,
        backgroundColor: colors.background.elevated,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 20,
        color: colors.text.secondary,
        fontWeight: typography.weights.bold,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.background.elevated,
        borderRadius: borderRadius.md,
        padding: 4,
        marginBottom: spacing.lg,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: colors.primary.main,
    },
    tabText: {
        fontSize: typography.sizes.sm,
        color: colors.text.secondary,
    },
    activeTabText: {
        color: '#ffffff',
        fontWeight: typography.weights.semibold,
    },
    content: {
        flexGrow: 1,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    loadingText: {
        color: colors.text.tertiary,
        fontSize: typography.sizes.base,
        marginTop: spacing.md,
    },
    placeholderText: {
        color: colors.text.tertiary,
        fontSize: typography.sizes.base,
        textAlign: 'center',
    },
    errorContainer: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.error,
    },
    errorText: {
        color: colors.error,
        fontSize: typography.sizes.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: typography.sizes.xs,
        color: colors.text.tertiary,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    stateVectorScroll: {
        maxHeight: 400,
        backgroundColor: colors.background.elevated,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        borderLeftWidth: 2,
        borderLeftColor: colors.primary.dark,
    },
    stateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.xs,
        backgroundColor: colors.background.secondary,
        borderRadius: borderRadius.sm,
    },
    basisState: {
        fontFamily: 'monospace',
        fontSize: typography.sizes.sm,
        color: colors.primary.light,
    },
    amplitude: {
        fontFamily: 'monospace',
        fontSize: typography.sizes.sm,
        color: colors.text.primary,
    },
});