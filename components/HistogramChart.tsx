import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { colors, spacing, typography, borderRadius } from '../theme';

interface HistogramChartProps {
    data: Record<string, number>;
}

export const HistogramChart: React.FC<HistogramChartProps> = ({ data }) => {
    const screenWidth = Dimensions.get('window').width - 80; // Account for padding

    // Prepare data for chart
    const labels = Object.keys(data).sort();
    const values = labels.map(label => data[label]);

    const chartData = {
        labels: labels,
        datasets: [{
            data: values,
        }],
    };

    // Calculate dynamic width based on number of bars
    // Each bar needs ~60px of space for proper visibility
    const minWidth = screenWidth;
    const dynamicWidth = Math.max(minWidth, labels.length * 60);

    const chartConfig = {
        backgroundColor: colors.background.card,
        backgroundGradientFrom: colors.background.card,
        backgroundGradientTo: colors.background.elevated,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(203, 213, 225, ${opacity})`,
        style: {
            borderRadius: borderRadius.md,
        },
        barPercentage: 0.7,
        propsForBackgroundLines: {
            strokeDasharray: '',
            stroke: colors.text.disabled,
            strokeWidth: 0.5,
        },
    };

    if (labels.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No data to display</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={true}
                bounces={false}
                contentContainerStyle={styles.scrollContent}
            >
                <BarChart
                    data={chartData}
                    width={dynamicWidth}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=""
                    chartConfig={chartConfig}
                    style={styles.chart}
                    fromZero
                    showValuesOnTopOfBars
                    withInnerLines
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: spacing.md,
    },
    scrollContent: {
        paddingRight: spacing.md, // Extra padding at the end
    },
    chart: {
        borderRadius: borderRadius.md,
    },
    emptyContainer: {
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: colors.text.tertiary,
        fontSize: typography.sizes.base,
    },
});
