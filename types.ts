
export type GateType = 'H' | 'X' | 'Y' | 'Z' | 'S' | 'T' | 'CNOT' | 'SWAP' | 'M' | 'TARGET' | 'SWAP_TARGET';

export interface PlacedGate {
    type: GateType;
    qubit: number;
    control?: number;
    target?: number;
}

export type Circuit = (PlacedGate | null)[][];

export interface Complex {
    re: number;
    im: number;
}

export interface SimulationResult {
    statevector: Complex[];
    probabilities: number[];
    measuredCounts: Record<string, number>;
}
