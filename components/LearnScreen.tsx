import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, borderRadius, typography, shadows } from '../theme';

interface LearnScreenProps {
    onBack: () => void;
}

interface TutorialCardProps {
    title: string;
    emoji: string;
    children: React.ReactNode;
    delay?: number;
}

const TutorialCard: React.FC<TutorialCardProps> = ({ title, emoji, children, delay = 0 }) => {
    const { theme } = useTheme();
    const { colors } = theme;

    return (
        <Animated.View
            entering={FadeInDown.delay(delay).springify()}
            style={styles.card}
        >
            <LinearGradient
                colors={[colors.background.card, colors.background.elevated]}
                style={[styles.cardGradient, shadows.lg]}
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.emoji}>{emoji}</Text>
                    <Text style={[styles.cardTitle, { color: colors.primary.main }]}>{title}</Text>
                </View>
                <View style={styles.cardContent}>{children}</View>
            </LinearGradient>
        </Animated.View>
    );
};

const CodeText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();
    const { colors } = theme;

    return (
        <Text style={[styles.code, { backgroundColor: colors.background.elevated, color: colors.primary.light }]}>
            {children}
        </Text>
    );
};

export const LearnScreen: React.FC<LearnScreenProps> = ({ onBack }) => {
    const { theme, themeMode } = useTheme();
    const { colors } = theme;

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background.primary }]}>
            <StatusBar barStyle={themeMode === 'light' ? 'dark-content' : 'light-content'} backgroundColor={colors.background.primary} />
            <LinearGradient
                colors={[colors.background.primary, colors.background.secondary]}
                style={styles.container}
            >
                {/* Header */}
                <Animated.View entering={FadeIn} style={[styles.header, shadows.lg]}>
                    <Text style={[styles.headerTitle, { color: colors.text.primary }]}>🎓 Quantum Crash Course</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.text.tertiary }]}>
                        Learn quantum computing step-by-step
                    </Text>
                </Animated.View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={true}
                    indicatorStyle={themeMode === 'light' ? 'black' : 'white'}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Introduction Card */}
                    <TutorialCard title="Welcome to Quantum Computing!" emoji="👋" delay={100}>
                        <Text style={[styles.paragraph, { color: colors.text.secondary }]}>
                            Quantum computing might sound complex, but we'll learn it together! Think of qubits as special coins that can be spinning in the air (superposition) until you catch them (measurement).
                        </Text>
                        <View style={[styles.tipBox, { backgroundColor: colors.background.tertiary }]}>
                            <Text style={[styles.tipText, { color: colors.text.primary }]}>
                                💡 <Text style={[styles.bold, { color: colors.text.primary }]}>Tip:</Text> Try each example in the simulator as you read!
                            </Text>
                        </View>
                    </TutorialCard>

                    {/* Superposition */}
                    <TutorialCard title="Lesson 1: Creating a Quantum Coin Flip" emoji="🪙" delay={200}>
                        <Text style={[styles.paragraph, { color: colors.text.secondary }]}>
                            Let's create your first quantum circuit! We'll use the <CodeText>Hadamard (H)</CodeText> gate to make a qubit that's like a spinning coin—it's both 0 AND 1 at the same time!
                        </Text>

                        <View style={[styles.stepBox, { backgroundColor: colors.background.elevated }]}>
                            <Text style={[styles.stepTitle, { color: colors.primary.main }]}>📝 Step-by-Step:</Text>
                            <View style={styles.list}>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    1️⃣ Set your circuit to <CodeText>1 qubit</CodeText> (tap the − button until you have 1)
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    2️⃣ Find the green <CodeText>H</CodeText> gate in "Quantum Gates"
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    3️⃣ Tap the <CodeText>H</CodeText> gate, then tap anywhere on the wire
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    4️⃣ Hit <Text style={[styles.bold, { color: colors.text.primary }]}>▶️ Simulate</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.resultBox, { backgroundColor: colors.success + '20', borderColor: colors.success }]}>
                            <Text style={[styles.resultTitle, { color: colors.success }]}>✅ What You'll See:</Text>
                            <Text style={[styles.paragraph, { color: colors.text.secondary }]}>
                                The histogram shows two bars of equal height at |0⟩ and |1⟩—both at 50%! You just created a perfect quantum coin flip. This is called <Text style={[styles.bold, { color: colors.text.primary }]}>superposition</Text>.
                            </Text>
                        </View>
                    </TutorialCard>

                    {/* NOT Gate */}
                    <TutorialCard title="Lesson 2: Flipping a Qubit" emoji="🔄" delay={300}>
                        <Text style={[styles.paragraph, { color: colors.text.secondary }]}>
                            The <CodeText>X gate</CodeText> (also called Pauli-X) is like a light switch—it flips 0 to 1, and 1 to 0. Let's try it!
                        </Text>

                        <View style={[styles.stepBox, { backgroundColor: colors.background.elevated }]}>
                            <Text style={[styles.stepTitle, { color: colors.primary.main }]}>📝 Step-by-Step:</Text>
                            <View style={styles.list}>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    1️⃣ Keep your circuit at <CodeText>1 qubit</CodeText> (or reduce to 1)
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    2️⃣ Clear any gates (tap 🗑️ Clear if needed)
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    3️⃣ Place a red <CodeText>X</CodeText> gate on the wire
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    4️⃣ Hit <Text style={[styles.bold, { color: colors.text.primary }]}>▶️ Simulate</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.resultBox, { backgroundColor: colors.success + '20', borderColor: colors.success }]}>
                            <Text style={[styles.resultTitle, { color: colors.success }]}>✅ What You'll See:</Text>
                            <Text style={[styles.paragraph, { color: colors.text.secondary }]}>
                                The histogram shows 100% at |1⟩! The qubit started at |0⟩ (the default), and the X gate flipped it to |1⟩.
                            </Text>
                        </View>

                        <View style={[styles.tipBox, { backgroundColor: colors.background.tertiary }]}>
                            <Text style={[styles.tipText, { color: colors.text.primary }]}>
                                💡 <Text style={[styles.bold, { color: colors.text.primary }]}>Try This:</Text> Place two X gates in a row. What happens? (Spoiler: it flips back to |0⟩!)
                            </Text>
                        </View>
                    </TutorialCard>

                    {/* Entanglement */}
                    <TutorialCard title="Lesson 3: Quantum Entanglement—The Magic Link" emoji="🔗" delay={400}>
                        <Text style={[styles.paragraph, { color: colors.text.secondary }]}>
                            <Text style={[styles.bold, { color: colors.text.primary }]}>Entanglement</Text> is quantum computing's superpower! When two qubits are entangled, they're magically connected—measuring one instantly affects the other, no matter how far apart they are!
                        </Text>

                        <View style={[styles.stepBox, { backgroundColor: colors.background.elevated }]}>
                            <Text style={[styles.stepTitle, { color: colors.primary.main }]}>📝 Step-by-Step (Create a Bell State):</Text>
                            <View style={styles.list}>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    1️⃣ Set your circuit to <CodeText>2 qubits</CodeText>
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    2️⃣ Place an <CodeText>H</CodeText> gate on the <Text style={[styles.bold, { color: colors.text.primary }]}>first wire</Text> (top qubit)
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    3️⃣ Tap the blue <CodeText>CNOT</CodeText> gate
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    4️⃣ Tap the first wire (this places the control ●)
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    5️⃣ Tap the second wire (this places the target ⊕)
                                </Text>
                                <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                    6️⃣ Hit <Text style={[styles.bold, { color: colors.text.primary }]}>▶️ Simulate</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.resultBox, { backgroundColor: colors.success + '20', borderColor: colors.success }]}>
                            <Text style={[styles.resultTitle, { color: colors.success }]}>✅ What You'll See:</Text>
                            <Text style={[styles.paragraph, { color: colors.text.secondary }]}>
                                Only <CodeText>|00⟩</CodeText> and <CodeText>|11⟩</CodeText> appear, each at 50%! The states <CodeText>|01⟩</CodeText> and <CodeText>|10⟩</CodeText> have 0% probability. The qubits are now entangled—they'll always match when measured!
                            </Text>
                        </View>

                        <View style={[styles.tipBox, { backgroundColor: colors.background.tertiary }]}>
                            <Text style={[styles.tipText, { color: colors.text.primary }]}>
                                🎉 <Text style={[styles.bold, { color: colors.text.primary }]}>Congrats!</Text> You just created a Bell State—one of the most famous quantum states!
                            </Text>
                        </View>
                    </TutorialCard>

                    {/* Next Steps */}
                    <TutorialCard title="Keep Exploring!" emoji="🚀" delay={500}>
                        <Text style={[styles.paragraph, { color: colors.text.secondary }]}>
                            Now that you know the basics, try experimenting with:
                        </Text>
                        <View style={styles.list}>
                            <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                • <CodeText>Y</CodeText> and <CodeText>Z</CodeText> gates (different types of rotations)
                            </Text>
                            <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                • <CodeText>Phase (P)</CodeText> and <CodeText>T</CodeText> gates (add phase to qubits)
                            </Text>
                            <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                • <CodeText>SWAP</CodeText> gate (switch two qubits)
                            </Text>
                            <Text style={[styles.listItem, { color: colors.text.secondary }]}>
                                • Combining multiple gates in sequence
                            </Text>
                        </View>
                    </TutorialCard>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.text.disabled }]}>by Codexus Technologies</Text>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
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
        paddingTop: spacing['2xl'],
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    headerTitle: {
        fontSize: typography.sizes['3xl'],
        fontWeight: typography.weights.bold,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: typography.sizes.sm,
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
        paddingBottom: spacing['5xl'],
    },
    card: {
        marginBottom: spacing.xl,
    },
    cardGradient: {
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        gap: spacing.md,
    },
    emoji: {
        fontSize: 32,
    },
    cardTitle: {
        fontSize: typography.sizes['2xl'],
        fontWeight: typography.weights.bold,
        flex: 1,
    },
    cardContent: {
        gap: spacing.lg,
    },
    paragraph: {
        fontSize: typography.sizes.base,
        lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
    },
    bold: {
        fontWeight: typography.weights.bold,
    },
    code: {
        fontFamily: 'monospace',
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
        fontWeight: typography.weights.semibold,
    },
    stepBox: {
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
    },
    stepTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        marginBottom: spacing.md,
    },
    resultBox: {
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        borderWidth: 2,
    },
    resultTitle: {
        fontSize: typography.sizes.lg,
        fontWeight: typography.weights.bold,
        marginBottom: spacing.sm,
    },
    tipBox: {
        borderRadius: borderRadius.lg,
        padding: spacing.md,
    },
    tipText: {
        fontSize: typography.sizes.sm,
        lineHeight: typography.lineHeights.relaxed * typography.sizes.sm,
    },
    list: {
        gap: spacing.sm,
    },
    listItem: {
        fontSize: typography.sizes.base,
        lineHeight: typography.lineHeights.relaxed * typography.sizes.base,
    },
    footer: {
        alignItems: 'center',
        marginTop: spacing['2xl'],
        paddingBottom: spacing.xl,
    },
    footerText: {
        fontSize: typography.sizes.sm,
    },
});
