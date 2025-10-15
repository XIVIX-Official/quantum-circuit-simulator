import React from 'react';
import type { Circuit, GateType, PlacedGate } from '../types';
import { Gate } from './Gate';
import { GATE_PROPERTIES } from '../constants';

interface CircuitBoardProps {
    numQubits: number;
    numSteps: number;
    circuit: Circuit;
    selectedGate: GateType | null;
    pendingMultiQubitGate: PlacedGate | null;
    onCellClick: (qubit: number, step: number) => void;
    onClearGate: (qubit: number, step: number) => void;
}

const Wire: React.FC = () => <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-600 -translate-y-1/2" />;

export const CircuitBoard: React.FC<CircuitBoardProps> = ({ numQubits, numSteps, circuit, selectedGate, pendingMultiQubitGate, onCellClick, onClearGate }) => {

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement>, qubit: number, step: number) => {
        e.preventDefault();
        onClearGate(qubit, step);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-x-auto relative h-full">
            <div className="inline-block" style={{ minWidth: '100%' }}>
                {Array.from({ length: numQubits }).map((_, qubitIndex) => (
                    <div key={qubitIndex} className="flex items-center relative h-20">
                        <Wire />
                        <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 text-cyan-400 font-mono text-lg p-2 rounded-md bg-gray-700/50">
                            |q<sub className="text-base">{qubitIndex}</sub>⟩
                        </div>
                        {Array.from({ length: numSteps }).map((_, stepIndex) => {
                            const placedGate = circuit[qubitIndex][stepIndex];
                            
                            const isPendingTarget = pendingMultiQubitGate && pendingMultiQubitGate.qubit !== qubitIndex && !placedGate;
                            const isSelectedGateTarget = selectedGate && !placedGate && !pendingMultiQubitGate;

                            let controlQubit = -1;
                            if (placedGate && (placedGate.type === 'TARGET' || placedGate.type === 'SWAP_TARGET') && placedGate.control !== undefined) {
                                controlQubit = placedGate.control;
                            }
                            const isControl = placedGate && (placedGate.type === 'CNOT' || placedGate.type === 'SWAP') && placedGate.target !== undefined;
                            const gateProps = isControl ? GATE_PROPERTIES[placedGate.type] : (placedGate ? GATE_PROPERTIES[placedGate.type] : null);
                            const connectorColor = gateProps ? gateProps.color.replace('bg-', 'bg-') : 'bg-blue-500';

                            return (
                                <div key={stepIndex} className="relative w-16 h-full flex-shrink-0">
                                    {isControl && placedGate.target !== undefined ? (
                                        <div 
                                            className={`absolute left-1/2 w-1 ${connectorColor}`} 
                                            style={{ 
                                                height: `${Math.abs(placedGate.qubit - placedGate.target) * 100}%`,
                                                top: `${50 * (1 + Math.min(placedGate.qubit, placedGate.target) - placedGate.qubit)}%`,
                                                transform: 'translateX(-50%)'
                                            }} 
                                        />
                                    ) : null}
                                    {controlQubit !== -1 && (
                                        <div 
                                            className={`absolute left-1/2 w-1 ${connectorColor}`}
                                            style={{
                                                height: `${Math.abs(qubitIndex - controlQubit) * 100}%`,
                                                top: `${50 * (1 - Math.max(qubitIndex, controlQubit) + Math.min(qubitIndex, controlQubit))}%`,
                                                transform: 'translateX(-50%)'
                                            }}
                                        />
                                    )}

                                    <div
                                        onClick={() => onCellClick(qubitIndex, stepIndex)}
                                        onContextMenu={(e) => handleRightClick(e, qubitIndex, stepIndex)}
                                        className={`w-full h-full flex items-center justify-center rounded-lg transition-colors z-10
                                            ${placedGate ? '' : (isPendingTarget || isSelectedGateTarget ? 'cursor-pointer' : 'cursor-default')}
                                            ${isPendingTarget ? 'bg-blue-500/10 hover:bg-blue-500/30' : ''}
                                            ${isSelectedGateTarget ? 'hover:bg-cyan-500/20' : ''}
                                        `}
                                        role="button"
                                        aria-label={`Circuit position Qubit ${qubitIndex}, Step ${stepIndex}. ${placedGate ? `Contains ${GATE_PROPERTIES[placedGate.type].name} gate.` : 'Empty.'} ${isSelectedGateTarget ? 'Click to place selected gate.' : ''} ${isPendingTarget ? 'Click to place target gate.' : ''}`}
                                    >
                                        {placedGate && <Gate type={placedGate.type} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};
