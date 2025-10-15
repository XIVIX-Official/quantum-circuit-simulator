import type { GateType, Complex } from './types';

interface GateProperties {
    label: string;
    name: string;
    description: string;
    color: string;
    matrix?: Complex[][];
}

const I: Complex[][] = [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: 1, im: 0 }]];
const H: Complex[][] = [[{ re: 1/Math.sqrt(2), im: 0 }, { re: 1/Math.sqrt(2), im: 0 }], [{ re: 1/Math.sqrt(2), im: 0 }, { re: -1/Math.sqrt(2), im: 0 }]];
const X: Complex[][] = [[{ re: 0, im: 0 }, { re: 1, im: 0 }], [{ re: 1, im: 0 }, { re: 0, im: 0 }]];
const Y: Complex[][] = [[{ re: 0, im: 0 }, { re: 0, im: -1 }], [{ re: 0, im: 1 }, { re: 0, im: 0 }]];
const Z: Complex[][] = [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: -1, im: 0 }]];
const S: Complex[][] = [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: 0, im: 1 }]];
const T: Complex[][] = [[{ re: 1, im: 0 }, { re: 0, im: 0 }], [{ re: 0, im: 0 }, { re: Math.cos(Math.PI/4), im: Math.sin(Math.PI/4) }]];


export const GATE_PROPERTIES: Record<GateType, GateProperties> = {
    'H': { label: 'H', name: 'Hadamard Gate', description: 'Creates a superposition of |0⟩ and |1⟩ states. Essential for quantum parallelism.', color: 'bg-green-500', matrix: H },
    'X': { label: 'X', name: 'Pauli-X Gate', description: 'A quantum NOT gate. It flips the state of a qubit from |0⟩ to |1⟩ and vice-versa.', color: 'bg-red-500', matrix: X },
    'Y': { label: 'Y', name: 'Pauli-Y Gate', description: 'Rotates the qubit state around the Y-axis of the Bloch sphere by π radians.', color: 'bg-red-600', matrix: Y },
    'Z': { label: 'Z', name: 'Pauli-Z Gate', description: 'Flips the phase of the |1⟩ state. It introduces a phase shift of -1.', color: 'bg-red-400', matrix: Z },
    'S': { label: 'S', name: 'Phase Gate (S)', description: 'A phase gate that rotates the |1⟩ state by π/2 radians around the Z-axis.', color: 'bg-yellow-500', matrix: S },
    'T': { label: 'T', name: 'T Gate', description: 'A phase gate that rotates the |1⟩ state by π/4 radians. Important for universal quantum computation.', color: 'bg-yellow-600', matrix: T },
    'CNOT': { label: '●', name: 'Controlled-NOT', description: 'A two-qubit gate. Flips the target qubit if and only if the control qubit is in the |1⟩ state.', color: 'bg-blue-500' },
    'TARGET': { label: '⊕', name: 'CNOT Target', description: 'The target part of the CNOT gate.', color: 'bg-blue-500' },
    'SWAP': { label: '×', name: 'SWAP Gate', description: 'A two-qubit gate that swaps the states of the two qubits involved.', color: 'bg-purple-500' },
    'SWAP_TARGET': { label: '×', name: 'SWAP Target', description: 'The second part of the SWAP gate.', color: 'bg-purple-500' },
    'M': { label: 'M', name: 'Measurement', description: 'Measures the qubit, collapsing its superposition into a classical bit (0 or 1).', color: 'bg-gray-400' },
};

export const IDENTITY_MATRIX: Complex[][] = I;
export const SIMULATION_SHOTS = 1024;