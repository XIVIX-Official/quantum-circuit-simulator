import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { GatePalette } from './components/GatePalette';
import { CircuitBoard } from './components/CircuitBoard';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LearnScreen } from './components/LearnScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { AnimatedLogo } from './components/AnimatedLogo';
import { NativeAdComponent } from './components/NativeAd';
import { useTheme } from './contexts/ThemeContext';
import { runSimulation } from './services/quantumSimulator';
import type { Circuit, GateType, PlacedGate, SimulationResult } from './types';
import { GATE_PROPERTIES } from './constants';
import { spacing, borderRadius, typography, shadows } from './theme';

const initialNumQubits = 3;
const initialNumSteps = 14;

export const MainApp: React.FC = () => {
    const { theme, themeMode } = useTheme();
    const { colors } = theme;

    const [view, setView] = useState<'simulator' | 'learn' | 'settings'>('simulator');
    const [numQubits, setNumQubits] = useState<number>(initialNumQubits);
    const [numSteps] = useState<number>(initialNumSteps);
    const [hoveredGate, setHoveredGate] = useState<GateType | null>(null);
    const [selectedGate, setSelectedGate] = useState<GateType | null>(null);
    const [pendingMultiQubitGate, setPendingMultiQubitGate] = useState<PlacedGate | null>(null);

    const createEmptyCircuit = (qubits: number, steps: number): Circuit => {
        return Array(qubits).fill(0).map(() => Array(steps).fill(null));
    };

    const [circuit, setCircuit] = useState<Circuit>(createEmptyCircuit(numQubits, numSteps));
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState<boolean>(false);

    const handleGateSelect = useCallback((gateType: GateType) => {
        setPendingMultiQubitGate(null);
        setSelectedGate(prev => (prev === gateType ? null : gateType));
    }, []);

    const handleGateDrop = useCallback((gate: PlacedGate, targetQubit: number, targetStep: number) => {
        setCircuit(prevCircuit => {
            const newCircuit = prevCircuit.map(row => [...row]);

            if (newCircuit[targetQubit][targetStep]) return newCircuit;

            newCircuit[targetQubit][targetStep] = { ...gate, qubit: targetQubit };

            if ((gate.type === 'CNOT' || gate.type === 'SWAP') && gate.target !== undefined) {
                if (newCircuit[gate.target][targetStep]) {
                    console.error("Target location for multi-qubit gate is not empty.");
                    newCircuit[targetQubit][targetStep] = null;
                    return newCircuit;
                }
                const targetGateType = gate.type === 'CNOT' ? 'TARGET' : 'SWAP_TARGET';
                newCircuit[gate.target][targetStep] = {
                    type: targetGateType as GateType,
                    qubit: gate.target,
                    control: targetQubit
                };
            }

            return newCircuit;
        });
    }, []);

    const handleCellClick = useCallback((qubit: number, step: number) => {
        if (pendingMultiQubitGate && pendingMultiQubitGate.qubit !== qubit) {
            if (!circuit[qubit][step]) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                handleGateDrop({ ...pendingMultiQubitGate, target: qubit }, pendingMultiQubitGate.qubit, step);
                setPendingMultiQubitGate(null);
            }
            return;
        }

        if (selectedGate && !circuit[qubit][step]) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            if (selectedGate === 'CNOT' || selectedGate === 'SWAP') {
                setPendingMultiQubitGate({ type: selectedGate, qubit: qubit });
                setSelectedGate(null);
            } else {
                handleGateDrop({ type: selectedGate, qubit: qubit }, qubit, step);
            }
        }
    }, [selectedGate, pendingMultiQubitGate, circuit, handleGateDrop]);

    const handleClearGate = useCallback((qubit: number, step: number) => {
        setCircuit(prevCircuit => {
            const newCircuit = prevCircuit.map(row => [...row]);
            const gateToRemove = newCircuit[qubit][step];

            if (gateToRemove) {
                if ((gateToRemove.type === 'CNOT' || gateToRemove.type === 'SWAP') &&
                    gateToRemove.target !== undefined) {
                    newCircuit[gateToRemove.target][step] = null;
                } else if ((gateToRemove.type === 'TARGET' || gateToRemove.type === 'SWAP_TARGET') &&
                    gateToRemove.control !== undefined) {
                    newCircuit[gateToRemove.control][step] = null;
                }
            }
            newCircuit[qubit][step] = null;
            return newCircuit;
        });
    }, []);

    const handleSimulate = useCallback(async () => {
        setIsSimulating(true);
        setError(null);
        setSimulationResult(null);
        setShowResults(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        try {
            await new Promise(res => setTimeout(res, 100));
            const result = runSimulation(circuit, numQubits);
            setSimulationResult(result);
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred during simulation.");
            }
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } finally {
            setIsSimulating(false);
        }
    }, [circuit, numQubits]);

    const handleClearCircuit = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setCircuit(createEmptyCircuit(numQubits, numSteps));
        setSimulationResult(null);
        setError(null);
        setSelectedGate(null);
        setPendingMultiQubitGate(null);
    }, [numQubits, numSteps]);

    const handleQubitCountChange = (newCount: number) => {
        if (newCount > 0 && newCount <= 5) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setNumQubits(newCount);
            setCircuit(createEmptyCircuit(newCount, numSteps));
            setSimulationResult(null);
            setError(null);
        }
    };

    const gatesList = useMemo(() => Object.keys(GATE_PROPERTIES)
        .filter(key => !['TARGET', 'SWAP_TARGET'].includes(key))
        .map(key => ({ type: key as GateType })), []);

    if (view === 'learn') {
        return (
            <>
                <LearnScreen onBack={() => setView('simulator')} />
                <BottomNavigation activeScreen={view} onNavigate={setView} />
            </>
        );
    }

    if (view === 'settings') {
        return (
            <>
                <SettingsScreen />
                <BottomNavigation activeScreen={view} onNavigate={setView} />
            </>
        );
    }

    return (
        <>
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.primary }]}>
                <StatusBar barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colors.background.primary} />
                <LinearGradient
                    colors={[colors.background.primary, colors.background.secondary]}
                    style={styles.container}
                >
                    {/* Header */}
                    <Animated.View entering={FadeIn} style={styles.header}>
                        <AnimatedLogo />
                    </Animated.View>

                    {/* Pending Multi-Qubit Gate Modal */}
                    <Modal
                        visible={!!pendingMultiQubitGate}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setPendingMultiQubitGate(null)}
                    >
                        <Pressable
                            style={[styles.modalOverlay, { backgroundColor: colors.overlay }]}
                            onPress={() => setPendingMultiQubitGate(null)}
                        >
                            <Animated.View entering={SlideInDown.springify()} style={[styles.modalContent, { backgroundColor: colors.background.card }, shadows.xl]}>
                                <Text style={[styles.modalTitle, { color: colors.text.primary }]}>
                                    Select target qubit for {pendingMultiQubitGate?.type} gate
                                </Text>
                                <Text style={[styles.modalSubtitle, { color: colors.text.tertiary }]}>
                                    Tap on a different wire to place the target
                                </Text>
                            </Animated.View>
                        </Pressable>
                    </Modal>

                    {/* Main Content */}
                    <ScrollView
                        style={styles.mainScrollView}
                        contentContainerStyle={styles.mainScrollContent}
                        showsVerticalScrollIndicator={true}
                        bounces={true}
                    >
                        {/* Circuit Board */}
                        <Animated.View entering={FadeIn.delay(100)} style={styles.circuitSection}>
                            <CircuitBoard
                                numQubits={numQubits}
                                numSteps={numSteps}
                                circuit={circuit}
                                selectedGate={selectedGate}
                                pendingMultiQubitGate={pendingMultiQubitGate}
                                onCellClick={handleCellClick}
                                onClearGate={handleClearGate}
                            />
                        </Animated.View>

                        {/* Control Panel */}
                        <Animated.View entering={FadeIn.delay(200)} style={[styles.controlPanel, { backgroundColor: colors.background.card }, shadows.md]}>
                            <View style={styles.controlRow}>
                                <View style={styles.qubitControl}>
                                    <Text style={[styles.qubitLabel, { color: colors.text.secondary }]}>Qubits:</Text>
                                    <Pressable
                                        onPress={() => handleQubitCountChange(numQubits - 1)}
                                        disabled={numQubits <= 1}
                                        style={[styles.qubitButton, { backgroundColor: colors.background.elevated }, numQubits <= 1 && styles.qubitButtonDisabled]}
                                    >
                                        <Text style={[styles.qubitButtonText, { color: colors.text.primary }]}>−</Text>
                                    </Pressable>
                                    <Text style={[styles.qubitCount, { color: colors.text.primary }]}>{numQubits}</Text>
                                    <Pressable
                                        onPress={() => handleQubitCountChange(numQubits + 1)}
                                        disabled={numQubits >= 5}
                                        style={[styles.qubitButton, { backgroundColor: colors.background.elevated }, numQubits >= 5 && styles.qubitButtonDisabled]}
                                    >
                                        <Text style={[styles.qubitButtonText, { color: colors.text.primary }]}>+</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Animated.View>

                        {/* Gate Palette */}
                        <Animated.View entering={FadeIn.delay(300)}>
                            <GatePalette
                                gates={gatesList}
                                selectedGate={selectedGate}
                                onGateSelect={handleGateSelect}
                                onGateHover={setHoveredGate}
                            />
                        </Animated.View>

                        {/* Native Ad - Strategically placed for revenue */}
                        <Animated.View entering={FadeIn.delay(400)}>
                            <NativeAdComponent />
                        </Animated.View>

                        {/* Bottom Padding to ensure content is not hidden by FABs */}
                        <View style={styles.bottomSpacer} />
                    </ScrollView>

                    {/* Results Modal */}
                    <ResultsDisplay
                        result={simulationResult}
                        error={error}
                        isSimulating={isSimulating}
                        numQubits={numQubits}
                        visible={showResults}
                        onClose={() => setShowResults(false)}
                    />

                    {/* Floating Action Buttons */}
                    <View style={styles.fabContainer}>
                        <Pressable
                            onPress={handleSimulate}
                            disabled={isSimulating}
                            style={[styles.fab, styles.simulateFab, isSimulating && styles.fabDisabled]}
                        >
                            <LinearGradient
                                colors={colors.primary.gradient as any}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.fabGradient}
                            >
                                <Text style={styles.fabText}>
                                    {isSimulating ? '⏳' : '▶️'} {isSimulating ? 'Running' : 'Simulate'}
                                </Text>
                            </LinearGradient>
                        </Pressable>

                        {simulationResult && !isSimulating && (
                            <Pressable
                                onPress={() => setShowResults(true)}
                                style={[styles.fab, styles.resultsFab, { backgroundColor: colors.secondary.main }]}
                            >
                                <Text style={styles.fabText}>📊 Results</Text>
                            </Pressable>
                        )}

                        <Pressable onPress={handleClearCircuit} style={[styles.fab, styles.clearFab, { backgroundColor: colors.error }]}>
                            <Text style={styles.fabText}>🗑️ Clear</Text>
                        </Pressable>
                    </View>
                </LinearGradient>
            </SafeAreaView>
            <BottomNavigation activeScreen={view} onNavigate={setView} />
        </>
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
        alignItems: 'center',
        paddingTop: spacing['3xl'],
        paddingBottom: spacing.md,
    },
    main: {
        flex: 1,
    },
    mainScrollView: {
        flex: 1,
    },
    mainScrollContent: {
        padding: spacing.md,
        gap: spacing.sm,
        paddingBottom: spacing['5xl'], // Extra padding for FABs
    },
    bottomSpacer: {
        height: 180, // Space for FABs
    },
    circuitSection: {
        minHeight: 300,
    },
    controlPanel: {
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    controlRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
    },
    qubitControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    qubitLabel: {
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.medium,
    },
    qubitButton: {
        width: 36,
        height: 36,
        borderRadius: borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qubitButtonDisabled: {
        opacity: 0.4,
    },
    qubitButtonText: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.semibold,
    },
    qubitCount: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        minWidth: 32,
        textAlign: 'center',
        fontFamily: 'monospace',
    },

    fabContainer: {
        position: 'absolute',
        bottom: spacing['3xl'],
        right: spacing.lg,
        gap: spacing.md,
    },
    fab: {
        borderRadius: borderRadius.full,
        ...shadows.xl,
    },
    fabGradient: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.full,
    },
    simulateFab: {
        overflow: 'hidden',
    },
    resultsFab: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
    },
    clearFab: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xl,
    },
    fabDisabled: {
        opacity: 0.5,
    },
    fabText: {
        color: '#ffffff',
        fontSize: typography.sizes.base,
        fontWeight: typography.weights.bold,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        margin: spacing.lg,
    },
    modalTitle: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    modalSubtitle: {
        fontSize: typography.sizes.sm,
        textAlign: 'center',
    },
});
