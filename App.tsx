import React, { useState, useCallback, useMemo } from 'react';
import { GatePalette } from './components/GatePalette';
import { CircuitBoard } from './components/CircuitBoard';
import { ResultsDisplay } from './components/ResultsDisplay';
import { InfoPanel } from './components/InfoPanel';
import { LearnScreen } from './components/LearnScreen';
import { Logo } from './components/Logo';
import { runSimulation } from './services/quantumSimulator';
import type { Circuit, GateType, PlacedGate, SimulationResult } from './types';
import { GATE_PROPERTIES } from './constants';

const initialNumQubits = 3;
const initialNumSteps = 14;

const App: React.FC = () => {
    const [view, setView] = useState<'simulator' | 'learn'>('simulator');
    const [numQubits, setNumQubits] = useState<number>(initialNumQubits);
    const [numSteps] = useState<number>(initialNumSteps);
    const [hoveredGate, setHoveredGate] = useState<GateType | null>(null);
    const [selectedGate, setSelectedGate] = useState<GateType | null>(null);
    const [pendingMultiQubitGate, setPendingMultiQubitGate] = useState<PlacedGate | null>(null);
    
    const createEmptyCircuit = (qubits: number, steps: number): Circuit => {
        return Array(qubits).fill(0).map(() => Array(steps).fill(null));
    };

    const [circuit, setCircuit] = useState<Circuit>(createEmptyCircuit(numQubits, numSteps));
    const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
    const [isSimulating, setIsSimulating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGateSelect = useCallback((gateType: GateType) => {
        setPendingMultiQubitGate(null); // Cancel any pending multi-qubit op when selecting a new gate
        setSelectedGate(prev => (prev === gateType ? null : gateType));
    }, []);

    const handleGateDrop = useCallback((gate: PlacedGate, targetQubit: number, targetStep: number) => {
        setCircuit(prevCircuit => {
            const newCircuit = prevCircuit.map(row => [...row]);
            
            if (newCircuit[targetQubit][targetStep]) return newCircuit;

            newCircuit[targetQubit][targetStep] = { ...gate, qubit: targetQubit };
            
            if ((gate.type === 'CNOT' || gate.type === 'SWAP') && gate.target !== undefined) {
                if (newCircuit[gate.target][targetStep]) { // Target location must be empty
                     console.error("Target location for multi-qubit gate is not empty.");
                     // Revert the placement of the control part
                     newCircuit[targetQubit][targetStep] = null;
                     return newCircuit;
                }
                const targetGateType = gate.type === 'CNOT' ? 'TARGET' : 'SWAP_TARGET';
                newCircuit[gate.target][targetStep] = { type: targetGateType as GateType, qubit: gate.target, control: targetQubit };
            }
            
            return newCircuit;
        });
    }, []);

    const handleCellClick = useCallback((qubit: number, step: number) => {
        if (pendingMultiQubitGate && pendingMultiQubitGate.qubit !== qubit) {
            if (!circuit[qubit][step]) {
                 handleGateDrop({ ...pendingMultiQubitGate, target: qubit }, pendingMultiQubitGate.qubit, step);
                 setPendingMultiQubitGate(null);
            }
            return;
        }

        if (selectedGate && !circuit[qubit][step]) {
            if (selectedGate === 'CNOT' || selectedGate === 'SWAP') {
                setPendingMultiQubitGate({ type: selectedGate, qubit: qubit });
                setSelectedGate(null);
            } else {
                handleGateDrop({ type: selectedGate, qubit: qubit }, qubit, step);
            }
        }
    }, [selectedGate, pendingMultiQubitGate, circuit, handleGateDrop]);

    const handleClearGate = useCallback((qubit: number, step: number) => {
        setCircuit(prevCircuit => {
            const newCircuit = prevCircuit.map(row => [...row]);
            const gateToRemove = newCircuit[qubit][step];
            
            if (gateToRemove) {
                 if ((gateToRemove.type === 'CNOT' || gateToRemove.type === 'SWAP') && gateToRemove.target !== undefined) {
                     newCircuit[gateToRemove.target][step] = null;
                 } else if ((gateToRemove.type === 'TARGET' || gateToRemove.type === 'SWAP_TARGET') && gateToRemove.control !== undefined) {
                     newCircuit[gateToRemove.control][step] = null;
                 }
            }
            newCircuit[qubit][step] = null;
            return newCircuit;
        });
    }, []);

    const handleSimulate = useCallback(async () => {
        setIsSimulating(true);
        setError(null);
        setSimulationResult(null);
        try {
            await new Promise(res => setTimeout(res, 50)); 
            const result = runSimulation(circuit, numQubits);
            setSimulationResult(result);
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred during simulation.");
            }
        } finally {
            setIsSimulating(false);
        }
    }, [circuit, numQubits]);

    const handleClearCircuit = useCallback(() => {
        setCircuit(createEmptyCircuit(numQubits, numSteps));
        setSimulationResult(null);
        setError(null);
        setSelectedGate(null);
        setPendingMultiQubitGate(null);
    }, [numQubits, numSteps]);

    const handleQubitCountChange = (newCount: number) => {
        if (newCount > 0 && newCount <= 5) {
            setNumQubits(newCount);
            setCircuit(createEmptyCircuit(newCount, numSteps));
            setSimulationResult(null);
            setError(null);
        }
    };
    
    const gatesList = useMemo(() => Object.keys(GATE_PROPERTIES)
        .filter(key => !['TARGET', 'SWAP_TARGET'].includes(key))
        .map(key => ({ type: key as GateType })), []);

    if (view === 'learn') {
        return <LearnScreen onBack={() => setView('simulator')} />;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 lg:p-6 flex flex-col">
            <header className="text-center mb-6">
                <Logo />
                <h2 className="text-xl text-gray-400 mt-1 tracking-wider">Quantum Circuit Simulator</h2>
            </header>

            {pendingMultiQubitGate && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30"
                    onClick={() => setPendingMultiQubitGate(null)}
                >
                    <div className="text-white text-xl font-bold p-6 bg-gray-900 rounded-lg shadow-2xl text-center mx-4">
                        Select target qubit for {pendingMultiQubitGate.type} gate
                        <span className="block text-sm font-normal text-gray-400 mt-2">Tap on a different wire to place the target.</span>
                    </div>
                </div>
            )}
            <main className="flex flex-col lg:flex-row gap-6 flex-grow">
                {/* 
                  This wrapper uses "display: contents" on mobile to make its children direct flex items of <main>,
                  allowing them to be reordered. On desktop, it becomes a flex container to form the sidebar.
                */}
                <div className="contents lg:flex lg:w-1/4 xl:w-1/5 lg:flex-col lg:gap-6 lg:order-1">
                    {/* Control Panel - Mobile Order: 1 */}
                    <div className="bg-gray-800 rounded-lg p-4 shadow-lg order-1">
                        <p className="text-sm text-gray-400 mb-4">Tap a gate, then tap the circuit to place it. Right-click or long-press to remove a gate.</p>
                        <button
                            onClick={() => setView('learn')}
                            className="w-full mb-4 text-center text-cyan-400 border border-cyan-500 rounded-md py-2 px-4 hover:bg-cyan-500/20 transition-colors duration-300"
                        >
                            Learn with Examples
                        </button>
                        <div className="flex items-center space-x-2 mb-4">
                            <label htmlFor="qubit-count" className="font-medium text-gray-300">Qubits:</label>
                            <button onClick={() => handleQubitCountChange(numQubits - 1)} disabled={numQubits <= 1} className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 transition-colors">-</button>
                            <span className="font-mono text-lg w-8 text-center text-white">{numQubits}</span>
                            <button onClick={() => handleQubitCountChange(numQubits + 1)} disabled={numQubits >= 5} className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded disabled:opacity-50 transition-colors">+</button>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                             <button 
                                onClick={handleSimulate} 
                                disabled={isSimulating}
                                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded transition duration-300 disabled:bg-cyan-800 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isSimulating ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : "Simulate"}
                            </button>
                            <button onClick={handleClearCircuit} className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Clear
                            </button>
                        </div>
                    </div>
                    
                    {/* Gate Palette - Mobile Order: 3 */}
                    <div className="order-3">
                        <GatePalette gates={gatesList} selectedGate={selectedGate} onGateSelect={handleGateSelect} onGateHover={setHoveredGate} />
                    </div>

                    {/* Info Panel - Mobile Order: 4 */}
                    <div className="order-4">
                        <InfoPanel gateType={selectedGate || hoveredGate} />
                    </div>

                    {/* Results Display - Mobile Order: 5 */}
                    <div className="order-5">
                        <ResultsDisplay result={simulationResult} error={error} isSimulating={isSimulating} numQubits={numQubits} />
                    </div>

                    {/* Footer - Mobile Order: 6 */}
                    <footer className="text-center text-gray-500 text-sm mt-auto order-6">
                        Powered by XIVIX
                    </footer>
                </div>

                {/* Circuit Board - Mobile Order: 2 */}
                <div className="flex-grow lg:w-3/4 xl:w-4/5 order-2">
                    <CircuitBoard 
                        numQubits={numQubits} 
                        numSteps={numSteps} 
                        circuit={circuit}
                        selectedGate={selectedGate}
                        pendingMultiQubitGate={pendingMultiQubitGate}
                        onCellClick={handleCellClick}
                        onClearGate={handleClearGate}
                    />
                </div>
            </main>
        </div>
    );
};

export default App;