import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import Svg, { Line } from 'react-native-svg';
import type { Circuit, GateType, PlacedGate } from '../types';
import { Gate } from './Gate';
import { GATE_PROPERTIES } from '../constants';
import { colors, spacing, borderRadius, layout, typography } from '../theme';

interface CircuitBoardProps {
    numQubits: number;
    numSteps: number;
    circuit: Circuit;
    selectedGate: GateType | null;
    pendingMultiQubitGate: PlacedGate | null;
    onCellClick: (qubit: number, step: number) => void;
    onClearGate: (qubit: number, step: number) => void;
}

const Wire: React.FC<{ width: number }> = ({ width }) => (
    <View style={[styles.wire, { width }]} />
);

export const CircuitBoard: React.FC<CircuitBoardProps> = ({
    numQubits,
    numSteps,
    circuit,
    selectedGate,
    pendingMultiQubitGate,
    onCellClick,
    onClearGate
}) => {
    const handleLongPress = (qubit: number, step: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onClearGate(qubit, step);
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.scrollHints}>
                <Text style={styles.scrollHint}>← Scroll Horizontally →</Text>
                <Text style={styles.scrollHint}>↑ Scroll Vertically ↓</Text>
            </View>
            <ScrollView
                style={styles.container}
                horizontal
                showsHorizontalScrollIndicator={true}
                persistentScrollbar={true}
                indicatorStyle="white"
            >
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    persistentScrollbar={true}
                    indicatorStyle="white"
                    style={styles.innerScroll}
                >
                    <View style={styles.board}>
                        {Array.from({ length: numQubits }).map((_, qubitIndex) => (
                            <View key={qubitIndex} style={styles.qubitRow}>
                                {/* Qubit label */}
                                <View style={styles.qubitLabel}>
                                    <Text style={styles.qubitLabelText}>
                                        |q<Text style={styles.subscript}>{qubitIndex}</Text>⟩
                                    </Text>
                                </View>

                                {/* Wire */}
                                <Wire width={numSteps * layout.circuitCellSize} />

                                {/* Circuit cells */}
                                <View style={styles.cellsContainer}>
                                    {Array.from({ length: numSteps }).map((_, stepIndex) => {
                                        const placedGate = circuit[qubitIndex][stepIndex];
                                        const isPendingTarget = pendingMultiQubitGate &&
                                            pendingMultiQubitGate.qubit !== qubitIndex &&
                                            !placedGate;
                                        const isSelectedGateTarget = selectedGate &&
                                            !placedGate &&
                                            !pendingMultiQubitGate;

                                        return (
                                            <View key={stepIndex} style={styles.cellWrapper}>
                                                {/* Connector lines for multi-qubit gates */}
                                                {placedGate &&
                                                    (placedGate.type === 'CNOT' || placedGate.type === 'SWAP') &&
                                                    placedGate.target !== undefined && (
                                                        <Svg
                                                            style={StyleSheet.absoluteFill}
                                                            height="100%"
                                                            width={layout.circuitCellSize}
                                                        >
                                                            <Line
                                                                x1={layout.circuitCellSize / 2}
                                                                y1={layout.circuitCellSize / 2}
                                                                x2={layout.circuitCellSize / 2}
                                                                y2={
                                                                    placedGate.target > qubitIndex
                                                                        ? layout.circuitCellSize
                                                                        : 0
                                                                }
                                                                stroke={GATE_PROPERTIES[placedGate.type].color}
                                                                strokeWidth={3}
                                                            />
                                                        </Svg>
                                                    )}

                                                <Pressable
                                                    style={[
                                                        styles.cell,
                                                        isPendingTarget && styles.pendingCell,
                                                        isSelectedGateTarget && styles.selectableCell,
                                                    ]}
                                                    onPress={() => onCellClick(qubitIndex, stepIndex)}
                                                    onLongPress={() => placedGate && handleLongPress(qubitIndex, stepIndex)}
                                                >
                                                    {placedGate && (
                                                        <Animated.View entering={FadeIn.duration(200)}>
                                                            <Gate type={placedGate.type} size={48} />
                                                        </Animated.View>
                                                    )}
                                                </Pressable>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    scrollHints: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: spacing.xs,
        gap: spacing.sm,
    },
    scrollHint: {
        fontSize: typography.sizes.xs,
        color: colors.text.tertiary,
        fontStyle: 'italic',
        textAlign: 'center',
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    innerScroll: {
        flex: 1,
    },
    board: {
        paddingVertical: spacing.md,
    },
    qubitRow: {
        height: layout.circuitCellSize + spacing.lg,
        marginBottom: spacing.md,
        position: 'relative',
    },
    qubitLabel: {
        position: 'absolute',
        left: 0,
        top: layout.circuitCellSize / 2 - 20,
        width: 60,
        height: 40,
        backgroundColor: colors.background.elevated,
        borderRadius: borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    qubitLabelText: {
        color: colors.primary.main,
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.semibold,
    },
    subscript: {
        fontSize: typography.sizes.base,
    },
    wire: {
        position: 'absolute',
        left: 70,
        top: layout.circuitCellSize / 2,
        height: 2,
        backgroundColor: colors.text.tertiary,
    },
    cellsContainer: {
        flexDirection: 'row',
        marginLeft: 70,
    },
    cellWrapper: {
        width: layout.circuitCellSize,
        height: layout.circuitCellSize,
        position: 'relative',
    },
    cell: {
        width: layout.circuitCellSize,
        height: layout.circuitCellSize,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: borderRadius.md,
    },
    pendingCell: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        borderColor: colors.gates.cnot,
        borderStyle: 'dashed',
    },
    selectableCell: {
        backgroundColor: 'rgba(6, 182, 212, 0.05)',
    },
});
