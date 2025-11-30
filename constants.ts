import type { GateType, Complex } from './types';

interface GateProperties {
    label: string;
    name: string;
    description: string;
    beginnerExplanation: string;
    color: string;
    matrix?: Complex[][];
}

const I: Complex[][] = [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: 1, im: 0 }]];
const H: Complex[][] = [[{ re: 1 / Math.sqrt(2), im: 0 }, { re: 1 / Math.sqrt(2), im: 0 }], [{ re: 1 / Math.sqrt(2), im: 0 }, { re: -1 / Math.sqrt(2), im: 0 }]];
const X: Complex[][] = [[{ re: 0, im: 0 }, { re: 1, im: 0 }], [{ re: 1, im: 0 }, { re: 0, im: 0 }]];
const Y: Complex[][] = [[{ re: 0, im: 0 }, { re: 0, im: -1 }], [{ re: 0, im: 1 }, { re: 0, im: 0 }]];
const Z: Complex[][] = [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: -1, im: 0 }]];
const S: Complex[][] = [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: 0, im: 1 }]];
const T: Complex[][] = [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: Math.cos(Math.PI / 4), im: Math.sin(Math.PI / 4) }]];


export const GATE_PROPERTIES: Record<GateType, GateProperties> = {
    'H': {
        label: 'H',
        name: 'Hadamard Gate',
        description: 'Creates a superposition of |0⟩ and |1⟩ states. Essential for quantum parallelism.',
        beginnerExplanation: 'Think of this as creating a "quantum coin flip." It puts your qubit into a perfect 50-50 mix of being both 0 and 1 at the same time. This is called superposition and it\'s the magic that makes quantum computers special!',
        color: '#10b981',
        matrix: H
    },
    'X': {
        label: 'X',
        name: 'Pauli-X Gate',
        description: 'A quantum NOT gate. It flips the state of a qubit from |0⟩ to |1⟩ and vice-versa.',
        beginnerExplanation: 'This is like a light switch for your qubit! If it\'s 0, this gate flips it to 1. If it\'s 1, it flips back to 0. Simple as that!',
        color: '#ef4444',
        matrix: X
    },
    'Y': {
        label: 'Y',
        name: 'Pauli-Y Gate',
        description: 'Rotates the qubit state around the Y-axis of the Bloch sphere by π radians.',
        beginnerExplanation: 'This gate flips your qubit (like the X gate) but also adds a special twist called "phase." It\'s like flipping a switch while also spinning it. Used in advanced quantum algorithms.',
        color: '#dc2626',
        matrix: Y
    },
    'Z': {
        label: 'Z',
        name: 'Pauli-Z Gate',
        description: 'Flips the phase of the |1⟩ state. It introduces a phase shift of -1.',
        beginnerExplanation: 'This gate is sneaky! It doesn\'t change if your qubit is 0 or 1, but it adds a hidden "phase flip" to the 1 state. You won\'t see the difference until you combine it with other gates. It\'s like adding a secret marker!',
        color: '#f87171',
        matrix: Z
    },
    'S': {
        label: 'S',
        name: 'Phase Gate (S)',
        description: 'A phase gate that rotates the |1⟩ state by π/2 radians around the Z-axis.',
        beginnerExplanation: 'This adds a smaller phase shift (90 degrees) to the 1 state. Think of it as a "quarter turn" that changes how the qubit interferes with others. It\'s like adjusting the timing of a wave.',
        color: '#f59e0b',
        matrix: S
    },
    'T': {
        label: 'T',
        name: 'T Gate',
        description: 'A phase gate that rotates the |1⟩ state by π/4 radians. Important for universal quantum computation.',
        beginnerExplanation: 'This adds an even smaller phase shift (45 degrees) to the 1 state. It\'s called the "eighth turn" gate. Combined with other gates, it can create any quantum operation you can imagine!',
        color: '#d97706',
        matrix: T
    },
    'CNOT': {
        label: '●',
        name: 'Controlled-NOT',
        description: 'A two-qubit gate. Flips the target qubit if and only if the control qubit is in the |1⟩ state.',
        beginnerExplanation: 'This is a team gate that needs two qubits! The control qubit (●) acts like a boss—if it\'s 1, it tells the target qubit (⊕) to flip. If it\'s 0, nothing happens. This creates "entanglement," where qubits become mysteriously linked!',
        color: '#3b82f6'
    },
    'TARGET': {
        label: '⊕',
        name: 'CNOT Target',
        description: 'The target part of the CNOT gate.',
        beginnerExplanation: 'This is the target part of a CNOT gate. It gets flipped when the control qubit is 1.',
        color: '#3b82f6'
    },
    'SWAP': {
        label: '×',
        name: 'SWAP Gate',
        description: 'A two-qubit gate that swaps the states of the two qubits involved.',
        beginnerExplanation: 'This gate swaps two qubits! Whatever was in qubit 1 moves to qubit 2, and vice versa. It\'s like trading places—useful for moving quantum information around your circuit.',
        color: '#8b5cf6'
    },
    'SWAP_TARGET': {
        label: '×',
        name: 'SWAP Target',
        description: 'The second part of the SWAP gate.',
        beginnerExplanation: 'This is the second part of a SWAP gate. It trades places with the other qubit.',
        color: '#8b5cf6'
    },
    'M': {
        label: 'M',
        name: 'Measurement',
        description: 'Measures the qubit, collapsing its superposition into a classical bit (0 or 1).',
        beginnerExplanation: 'This is the moment of truth! When you measure a qubit, it "collapses" from being in superposition to being definitely 0 or 1. It\'s like catching that spinning coin—once you grab it, you see either heads or tails, not both!',
        color: '#9ca3af'
    },
};

export const IDENTITY_MATRIX: Complex[][] = I;
export const SIMULATION_SHOTS = 1024;