import React from 'react';
import type { GateType, Complex } from '../types';
import { GATE_PROPERTIES } from '../constants';
import { C } from '../lib/complex';

interface InfoPanelProps {
    gateType: GateType | null;
}

const MatrixDisplay: React.FC<{ matrix: Complex[][] }> = ({ matrix }) => (
    <div className="bg-gray-900/50 p-2 rounded-md mt-2">
        <p className="text-xs text-gray-400 mb-1">Matrix:</p>
        <div className="font-mono text-sm text-cyan-300">
            {matrix.map((row, i) => (
                <div key={i} className="flex items-center justify-center space-x-2">
                    <span>[</span>
                    {row.map((val, j) => (
                         <span key={j} className="w-16 text-center">{C.toString(val, 2)}</span>
                    ))}
                    <span>]</span>
                </div>
            ))}
        </div>
    </div>
);

export const InfoPanel: React.FC<InfoPanelProps> = ({ gateType }) => {
    if (!gateType) {
        return (
            <div className="bg-gray-800 rounded-lg p-4 shadow-lg min-h-[150px] flex items-center justify-center">
                <p className="text-gray-500 text-center">Hover over a gate to see its details.</p>
            </div>
        );
    }

    const { name, description, matrix } = GATE_PROPERTIES[gateType];

    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
            <h3 className="text-lg font-bold text-cyan-400">{name}</h3>
            <p className="text-sm text-gray-300 mt-2">{description}</p>
            {matrix && <MatrixDisplay matrix={matrix} />}
        </div>
    );
};
