// Design System - Colors, Typography, Spacing, and Animations
export const lightTheme = {
    colors: {
        // Premium gradient colors
        primary: {
            gradient: ['#06b6d4', '#3b82f6', '#8b5cf6'],
            main: '#0891b2',
            light: '#06b6d4',
            dark: '#0e7490',
        },
        secondary: {
            gradient: ['#8b5cf6', '#ec4899'],
            main: '#7c3aed',
            light: '#a78bfa',
            dark: '#6d28d9',
        },
        background: {
            primary: '#f8fafc',
            secondary: '#f1f5f9',
            tertiary: '#e2e8f0',
            card: '#ffffff',
            elevated: '#f8fafc',
        },
        text: {
            primary: '#0f172a',
            secondary: '#334155',
            tertiary: '#64748b',
            disabled: '#94a3b8',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#06b6d4',

        // Gate colors
        gates: {
            hadamard: '#10b981',
            pauliX: '#ef4444',
            pauliY: '#dc2626',
            pauliZ: '#f87171',
            phase: '#f59e0b',
            tGate: '#d97706',
            cnot: '#3b82f6',
            swap: '#8b5cf6',
            measure: '#64748b',
        },

        overlay: 'rgba(0, 0, 0, 0.5)',
        transparent: 'transparent',
    },
};

export const darkTheme = {
    colors: {
        // Premium gradient colors
        primary: {
            gradient: ['#06b6d4', '#3b82f6', '#8b5cf6'],
            main: '#06b6d4',
            light: '#22d3ee',
            dark: '#0891b2',
        },
        secondary: {
            gradient: ['#8b5cf6', '#ec4899'],
            main: '#8b5cf6',
            light: '#a78bfa',
            dark: '#7c3aed',
        },
        background: {
            primary: '#0f172a',
            secondary: '#1e293b',
            tertiary: '#334155',
            card: '#1e293b',
            elevated: '#2d3748',
        },
        text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
            tertiary: '#94a3b8',
            disabled: '#64748b',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#06b6d4',

        // Gate colors
        gates: {
            hadamard: '#10b981',
            pauliX: '#ef4444',
            pauliY: '#dc2626',
            pauliZ: '#f87171',
            phase: '#f59e0b',
            tGate: '#d97706',
            cnot: '#3b82f6',
            swap: '#8b5cf6',
            measure: '#9ca3af',
        },

        overlay: 'rgba(0, 0, 0, 0.7)',
        transparent: 'transparent',
    },
};

export const typography = {
    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
    },
    weights: {
        normal: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },
    lineHeights: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    full: 9999,
};

export const shadows = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
};

export const animation = {
    duration: {
        fast: 150,
        normal: 250,
        slow: 350,
    },
    easing: {
        inOut: 'ease-in-out',
        in: 'ease-in',
        out: 'ease-out',
    },
};

export const layout = {
    minTouchTarget: 44,
    circuitCellSize: 64,
    gateSize: 48,
    borderWidth: {
        thin: 1,
        medium: 2,
        thick: 3,
    },
};

// Default export for backward compatibility
export const colors = darkTheme.colors;
