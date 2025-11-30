import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { GateType } from '../types';
import { GATE_PROPERTIES } from '../constants';
import { layout, borderRadius, typography } from '../theme';

interface GateProps {
  type: GateType;
  size?: number;
}

export const Gate: React.FC<GateProps> = ({ type, size = layout.gateSize }) => {
  const gateProps = GATE_PROPERTIES[type];

  return (
    <View style={[
      styles.container,
      {
        width: size,
        height: size,
        backgroundColor: gateProps.color,
        borderRadius: borderRadius.md,
      }
    ]}>
      <Text style={[
        styles.label,
        { fontSize: size * 0.5 }
      ]}>
        {gateProps.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    color: '#ffffff',
    fontWeight: typography.weights.bold,
    textAlign: 'center',
  },
});