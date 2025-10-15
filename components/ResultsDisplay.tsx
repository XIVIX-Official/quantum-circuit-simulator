import React, { useState } from 'react';
import type { SimulationResult } from '../types';
import { C } from '../lib/complex';
import { HistogramChart } from './HistogramChart';

interface ResultsDisplayProps {
  result: SimulationResult | null;
  error: string | null;
  isSimulating: boolean;
  numQubits: number;
}

type ViewMode = 'histogram' | 'statevector';

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, error, isSimulating, numQubits }) => {
    const [viewMode, setViewMode] = useState<ViewMode>('histogram');
    
    const renderContent = () => {
        if (isSimulating) {
            return <div className="text-center text-gray-400 animate-pulse">Simulating...</div>;
        }
        if (error) {
            return <div className="text-center text-red-400 bg-red-900/50 p-3 rounded-md">{error}</div>;
        }
        if (!result) {
            return <div className="text-center text-gray-500">Run a simulation to see the results.</div>;
        }

        if (viewMode === 'histogram') {
            return (
                <div>
                    <p className="text-xs text-gray-400 mb-2 text-center">Probability of measuring each state after 1024 runs.</p>
                    <HistogramChart data={result.measuredCounts} />
                </div>
            );
        }

        if (viewMode === 'statevector') {
            return (
                <div>
                    <p className="text-xs text-gray-400 mb-2">The final quantum state of the system. Each line shows a basis state and its complex amplitude.</p>
                    <div className="space-y-1 text-sm font-mono text-gray-300 max-h-60 overflow-y-auto pr-2 border-l-2 border-gray-700 pl-2">
                        {result.statevector.map((amplitude, i) => {
                            const basisState = i.toString(2).padStart(numQubits, '0');
                            if (C.magnitudeSq(amplitude) > 1e-6) { // Only show states with significant amplitude
                                return (
                                    <div key={i} className="flex justify-between items-center hover:bg-gray-700/50 rounded p-1">
                                        <span className="text-cyan-400">|{basisState}⟩</span>
                                        <span>{C.toString(amplitude, 3)}</span>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg min-h-[200px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-cyan-400">Results</h2>
                {result && (
                    <div className="flex bg-gray-700 rounded-md p-1">
                        <button 
                            onClick={() => setViewMode('histogram')}
                            className={`px-2 py-1 text-xs rounded-md transition-colors ${viewMode === 'histogram' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                        >
                            Histogram
                        </button>
                        <button 
                            onClick={() => setViewMode('statevector')}
                             className={`px-2 py-1 text-xs rounded-md transition-colors ${viewMode === 'statevector' ? 'bg-cyan-500 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
                        >
                           State Vector
                        </button>
                    </div>
                )}
            </div>
            <div className="flex-grow flex flex-col justify-center">
              {renderContent()}
            </div>
        </div>
    );
};