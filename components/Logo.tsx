import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors, spacing } from '../theme';

export const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.primary.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.logoBox}
      >
        <Svg width="60" height="60" viewBox="0 0 60 60">
          {/* Quantum circuit representation */}
          <Circle cx="15" cy="30" r="8" fill="rgba(255,255,255,0.9)" />
          <Circle cx="45" cy="30" r="8" fill="rgba(255,255,255,0.9)" />
          <Path
            d="M 23 30 L 37 30"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="3"
          />
          <Path
            d="M 15 22 L 15 38"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <Path
            d="M 45 22 L 45 38"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
        </Svg>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});