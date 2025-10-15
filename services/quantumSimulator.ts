
import type { Circuit, Complex, PlacedGate, SimulationResult } from '../types';
import { GATE_PROPERTIES, IDENTITY_MATRIX, SIMULATION_SHOTS } from '../constants';
import { C } from '../lib/complex';

function tensorProduct(A: Complex[][], B: Complex[][]): Complex[][] {
    const m = A.length;
    const n = A[0].length;
    const p = B.length;
    const q = B[0].length;
    
    const result: Complex[][] = Array(m * p).fill(0).map(() => Array(n * q).fill({ re: 0, im: 0 }));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < p; k++) {
                for (let l = 0; l < q; l++) {
                    result[i * p + k][j * q + l] = C.multiply(A[i][j], B[k][l]);
                }
            }
        }
    }
    return result;
}

function applyGateMatrix(statevector: Complex[], U: Complex[][]): Complex[] {
    const newStatevector: Complex[] = Array(statevector.length).fill({ re: 0, im: 0 });
    for (let i = 0; i < statevector.length; i++) {
        for (let j = 0; j < statevector.length; j++) {
            newStatevector[i] = C.add(newStatevector[i], C.multiply(U[i][j], statevector[j]));
        }
    }
    return newStatevector;
}

function applySingleQubitGate(statevector: Complex[], gate: Complex[][], targetQubit: number, numQubits: number): Complex[] {
    let U = gate;
    if (targetQubit === 0) {
        U = gate;
        for (let i = 1; i < numQubits; i++) {
            U = tensorProduct(IDENTITY_MATRIX, U);
        }
    } else {
        U = IDENTITY_MATRIX;
        for (let i = 1; i < numQubits; i++) {
            U = tensorProduct(U, i === targetQubit ? gate : IDENTITY_MATRIX);
        }
    }
    // This tensor product approach is correct but extremely inefficient for larger qubit counts.
    // A more direct manipulation of statevector amplitudes would be better for performance.
    // For this app's scale (<=5 qubits), it's acceptable.
    const fullMatrix = getFullSystemMatrix(gate, targetQubit, numQubits);
    return applyGateMatrix(statevector, fullMatrix);
}

function getFullSystemMatrix(gateMatrix: Complex[][], targetQubit: number, numQubits: number): Complex[][] {
    let systemMatrix = targetQubit === 0 ? gateMatrix : IDENTITY_MATRIX;
    for(let i = 1; i < numQubits; i++) {
        systemMatrix = tensorProduct(i === targetQubit ? gateMatrix : IDENTITY_MATRIX, systemMatrix);
    }
    return systemMatrix;
}


function applyCnotGate(statevector: Complex[], controlQubit: number, targetQubit: number, numQubits: number): Complex[] {
    const newStatevector = [...statevector];
    const controlMask = 1 << (numQubits - 1 - controlQubit);
    const targetMask = 1 << (numQubits - 1 - targetQubit);

    for (let i = 0; i < statevector.length; i++) {
        if ((i & controlMask) !== 0) {
            const targetState = i ^ targetMask;
            // Swap amplitudes
            const temp = newStatevector[i];
            newStatevector[i] = newStatevector[targetState];
            newStatevector[targetState] = temp;
        }
    }
    return newStatevector;
}

function applySwapGate(statevector: Complex[], qubitA: number, qubitB: number, numQubits: number): Complex[] {
    const newStatevector = [...statevector];
    const maskA = 1 << (numQubits - 1 - qubitA);
    const maskB = 1 << (numQubits - 1 - qubitB);

    for (let i = 0; i < statevector.length; i++) {
        const bitA = (i & maskA) !== 0;
        const bitB = (i & maskB) !== 0;

        if (bitA !== bitB) {
            const j = i ^ maskA ^ maskB;
            if (i < j) { // Process each pair only once
                const temp = newStatevector[i];
                newStatevector[i] = newStatevector[j];
                newStatevector[j] = temp;
            }
        }
    }
    return newStatevector;
}


function measure(statevector: Complex[], probabilities: number[]): number {
    const rand = Math.random();
    let sum = 0;
    for (let i = 0; i < probabilities.length; i++) {
        sum += probabilities[i];
        if (rand < sum) {
            return i;
        }
    }
    return probabilities.length - 1;
}

export function runSimulation(circuit: Circuit, numQubits: number): SimulationResult {
    const stateSize = Math.pow(2, numQubits);
    let statevector: Complex[] = Array(stateSize).fill({ re: 0, im: 0 });
    statevector[0] = { re: 1, im: 0 }; // Initialize to |00...0>

    const numSteps = circuit[0].length;

    for (let step = 0; step < numSteps; step++) {
        const gatesInStep = circuit.map(row => row[step]).filter(g => g !== null) as PlacedGate[];

        // A better simulator would handle simultaneous gates, but for simplicity, we apply sequentially.
        // This is an approximation but works for simple circuits.
        
        // Single qubit gates and controls
        for (const gate of gatesInStep) {
            if (gate.type === 'TARGET' || gate.type === 'SWAP_TARGET') continue;

            const gateProps = GATE_PROPERTIES[gate.type];
            if (gateProps.matrix) {
                statevector = applySingleQubitGate(statevector, gateProps.matrix, gate.qubit, numQubits);
            } else if (gate.type === 'CNOT' && gate.target !== undefined) {
                 statevector = applyCnotGate(statevector, gate.qubit, gate.target, numQubits);
            } else if (gate.type === 'SWAP' && gate.target !== undefined) {
                 statevector = applySwapGate(statevector, gate.qubit, gate.target, numQubits);
            }
        }
    }

    const probabilities = statevector.map(c => C.magnitudeSq(c));
    const probSum = probabilities.reduce((a, b) => a + b, 0);
    if (Math.abs(probSum - 1.0) > 1e-9) {
      console.warn("Probabilities do not sum to 1:", probSum);
    }

    // Measurement
    const measuredCounts: Record<string, number> = {};
    for (let i = 0; i < SIMULATION_SHOTS; i++) {
        const outcome = measure(statevector, probabilities);
        const outcomeStr = outcome.toString(2).padStart(numQubits, '0');
        measuredCounts[outcomeStr] = (measuredCounts[outcomeStr] || 0) + 1;
    }

    return { statevector, probabilities, measuredCounts };
}
