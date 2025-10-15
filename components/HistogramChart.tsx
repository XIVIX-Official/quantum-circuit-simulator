
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SIMULATION_SHOTS } from '../constants';

interface HistogramChartProps {
    data: Record<string, number>;
}

export const HistogramChart: React.FC<HistogramChartProps> = ({ data }) => {
    const chartData = Object.entries(data)
        .map(([name, value]) => ({
            name,
            // FIX: Explicitly cast value to a number to resolve the TypeScript error.
            probability: Number(value) / SIMULATION_SHOTS,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const colors = ['#22d3ee', '#67e8f9', '#a5f3fc', '#cffafe'];

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(tick) => tick.toFixed(2)} tickLine={false} axisLine={false} />
                <Tooltip
                    cursor={{ fill: 'rgba(107, 114, 128, 0.2)' }}
                    contentStyle={{
                        backgroundColor: '#1f2937',
                        borderColor: '#374151',
                        borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#e5e7eb' }}
                />
                <Bar dataKey="probability" name="Probability" fill="#22d3ee" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
