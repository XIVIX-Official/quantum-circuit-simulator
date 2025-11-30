import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { GateType } from '../types';
import { GATE_PROPERTIES } from '../constants';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface InfoPanelProps {
    gateType: GateType | null;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ gateType }) => {
    if (!gateType) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Gate Info</Text>
                <Text style={styles.placeholder}>
                    Select or hover over a gate to see its details
                </Text>
            </View>
        );
    }

    const gateProps = GATE_PROPERTIES[gateType];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{gateProps.name}</Text>
            <View style={[styles.badge, { backgroundColor: gateProps.color }]}>
                <Text style={styles.badgeText}>{gateProps.label}</Text>
            </View>
            <Text style={styles.description}>{gateProps.description}</Text>

            {gateProps.matrix && (
                <View style={styles.matrixSection}>
                    <Text style={styles.matrixTitle}>Matrix Representation:</Text>
                    <View style={styles.matrixContainer}>
                        {gateProps.matrix.map((row, i) => (
                            <View key={i} style={styles.matrixRow}>
                                {row.map((val, j) => (
                                    <View key={j} style={styles.matrixCell}>
                                        <Text style={styles.matrixText}>
                                            {formatComplex(val)}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const formatComplex = (c: { re: number; im: number }) => {
    const re = c.re.toFixed(2);
    const im = c.im.toFixed(2);

    if (Math.abs(c.im) < 0.01) return re;
    if (Math.abs(c.re) < 0.01) return `${im}i`;

    const sign = c.im > 0 ? '+' : '-';
    return `${re}${sign}${Math.abs(Number(im))}i`;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        ...shadows.md,
    },
    title: {
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
        color: colors.primary.main,
        marginBottom: spacing.md,
    },
    placeholder: {
        fontSize: typography.sizes.sm,
        color: colors.text.tertiary,
        fontStyle: 'italic',
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        marginBottom: spacing.md,
    },
    badgeText: {
        color: '#ffffff',
        fontSize: typography.sizes.xl,
        fontWeight: typography.weights.bold,
    },
    description: {
        fontSize: typography.sizes.base,
        color: colors.text.secondary,
        lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
        marginBottom: spacing.lg,
    },
    matrixSection: {
        marginTop: spacing.md,
    },
    matrixTitle: {
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.semibold,
        color: colors.text.secondary,
        marginBottom: spacing.sm,
    },
    matrixContainer: {
        backgroundColor: colors.background.elevated,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        alignSelf: 'flex-start',
    },
    matrixRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    matrixCell: {
        minWidth: 60,
        padding: spacing.xs,
    },
    matrixText: {
        fontFamily: 'monospace',
        fontSize: typography.sizes.sm,
        color: colors.text.primary,
    },
});
