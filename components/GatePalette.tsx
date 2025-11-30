import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import type { GateType } from '../types';
import { Gate } from './Gate';
import { GATE_PROPERTIES } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius, typography, shadows } from '../theme';

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
  const { theme } = useTheme();
  const { colors } = theme;
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedGateForExplanation, setSelectedGateForExplanation] = useState<GateType | null>(null);

  const handlePress = (gateType: GateType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onGateSelect(gateType);
    // Toggle explanation - if same gate is tapped, hide explanation, otherwise show new one
    setSelectedGateForExplanation(prev => prev === gateType ? null : gateType);
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
    <View>
      <View style={[styles.container, { backgroundColor: colors.background.card }, shadows.md]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text.secondary }]}>Quantum Gates</Text>
          <View style={styles.scrollIndicator}>
            <Pressable onPress={scrollLeft} style={[styles.arrowButton, { backgroundColor: colors.background.elevated }]}>
              <Text style={[styles.arrow, { color: colors.primary.light }]}>◀</Text>
            </Pressable>
            <Text style={[styles.scrollText, { color: colors.text.tertiary }]}>Scroll</Text>
            <Pressable onPress={scrollRight} style={[styles.arrowButton, { backgroundColor: colors.background.elevated }]}>
              <Text style={[styles.arrow, { color: colors.primary.light }]}>▶</Text>
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
                  { backgroundColor: colors.background.elevated },
                  selectedGate === gate.type && [styles.gateButtonSelected, { borderColor: colors.primary.main, backgroundColor: 'rgba(6, 182, 212, 0.1)' }, shadows.md],
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

      {/* Gate Explanation Panel */}
      {selectedGateForExplanation && (
        <Animated.View
          entering={FadeInDown.springify()}
          exiting={FadeOutDown.springify()}
          style={[styles.explanationPanel, { backgroundColor: colors.background.card }, shadows.lg]}
        >
          <View style={styles.explanationHeader}>
            <View style={styles.explanationTitleRow}>
              <Gate type={selectedGateForExplanation} size={32} />
              <View style={styles.explanationTitleText}>
                <Text style={[styles.explanationGateName, { color: colors.primary.main }]}>
                  {GATE_PROPERTIES[selectedGateForExplanation].name}
                </Text>
                <Text style={[styles.explanationLabel, { color: colors.text.tertiary }]}>
                  Gate: {GATE_PROPERTIES[selectedGateForExplanation].label}
                </Text>
              </View>
            </View>
            <Pressable
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedGateForExplanation(null);
              }}
              style={[styles.closeButton, { backgroundColor: colors.background.elevated }]}
            >
              <Text style={[styles.closeButtonText, { color: colors.text.secondary }]}>✕</Text>
            </Pressable>
          </View>
          <Text style={[styles.explanationText, { color: colors.text.secondary }]}>
            {GATE_PROPERTIES[selectedGateForExplanation].beginnerExplanation}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
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
  },
  scrollIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  scrollText: {
    fontSize: typography.sizes.xs,
    fontStyle: 'italic',
  },
  arrowButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  arrow: {
    fontSize: 14,
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
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  gateButtonSelected: {
  },
  explanationPanel: {
    marginTop: spacing.md,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  explanationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  explanationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  explanationTitleText: {
    flex: 1,
  },
  explanationGateName: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  explanationLabel: {
    fontSize: typography.sizes.sm,
    marginTop: 2,
  },
  explanationText: {
    fontSize: typography.sizes.base,
    lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  closeButtonText: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
});
