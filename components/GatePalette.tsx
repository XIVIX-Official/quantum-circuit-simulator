import React, { useRef } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import type { GateType } from '../types';
import { Gate } from './Gate';
import { colors, spacing, borderRadius, typography, shadows } from '../theme';

interface GatePaletteProps {
  gates: { type: GateType }[];
  selectedGate: GateType | null;
  onGateSelect: (gateType: GateType) => void;
  onGateHover?: (gateType: GateType | null) => void;
}

export const GatePalette: React.FC<GatePaletteProps> = ({
  gates,
  selectedGate,
  onGateSelect,
  onGateHover,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePress = (gateType: GateType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onGateSelect(gateType);
  };

  const scrollLeft = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scrollViewRef.current?.scrollTo({ x: -200, y: 0, animated: true });
  };

  const scrollRight = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scrollViewRef.current?.scrollTo({ x: 200, y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quantum Gates</Text>
        <View style={styles.scrollIndicator}>
          <Pressable onPress={scrollLeft} style={styles.arrowButton}>
            <Text style={styles.arrow}>◀</Text>
          </Pressable>
          <Text style={styles.scrollText}>Scroll</Text>
          <Pressable onPress={scrollRight} style={styles.arrowButton}>
            <Text style={styles.arrow}>▶</Text>
          </Pressable>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={true}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        persistentScrollbar={true}
        indicatorStyle="white"
      >
        {gates.map((gate, index) => (
          <Animated.View
            key={gate.type}
            entering={FadeIn.delay(index * 30)}
          >
            <Pressable
              style={[
                styles.gateButton,
                selectedGate === gate.type && styles.gateButtonSelected,
              ]}
              onPress={() => handlePress(gate.type)}
              onPressIn={() => onGateHover?.(gate.type)}
              onPressOut={() => onGateHover?.(null)}
            >
              <Gate type={gate.type} size={40} />
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    color: colors.text.secondary,
  },
  scrollIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  scrollText: {
    fontSize: typography.sizes.xs,
    color: colors.text.tertiary,
    fontStyle: 'italic',
  },
  arrowButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background.elevated,
  },
  arrow: {
    fontSize: 14,
    color: colors.primary.light,
    fontWeight: 'bold',
  },
  scrollView: {
    marginHorizontal: -spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: spacing.xs,
    gap: spacing.sm,
  },
  gateButton: {
    width: 56,
    height: 56,
    backgroundColor: colors.background.elevated,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  gateButtonSelected: {
    borderColor: colors.primary.main,
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
    ...shadows.md,
  },
});
