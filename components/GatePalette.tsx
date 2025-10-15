import React from 'react';
import { Gate } from './Gate';
import type { GateType } from '../types';
import { GATE_PROPERTIES } from '../constants';

interface GatePaletteProps {
  gates: { type: GateType }[];
  selectedGate: GateType | null;
  onGateSelect: (gateType: GateType) => void;
  onGateHover: (gateType: GateType | null) => void;
}

export const GatePalette: React.FC<GatePaletteProps> = ({ gates, selectedGate, onGateSelect, onGateHover }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-cyan-400">Gates</h2>
      <div className="grid grid-cols-5 sm:grid-cols-4 gap-2">
        {gates.map(({ type }) => {
          const isSelected = selectedGate === type;
          return (
            <div
              key={type}
              onClick={() => onGateSelect(type)}
              onMouseEnter={() => onGateHover(type)}
              onMouseLeave={() => onGateHover(null)}
              className={`cursor-pointer flex flex-col items-center group p-1 rounded-md transition-all duration-200 ${isSelected ? 'bg-cyan-500/30 scale-105' : 'hover:bg-gray-700/50'}`}
              aria-label={`Select ${GATE_PROPERTIES[type].name} gate`}
              role="button"
              aria-pressed={isSelected}
            >
              <Gate type={type} />
              <span className={`text-xs mt-1 text-center transition-colors ${isSelected ? 'text-cyan-300' : 'text-gray-400 group-hover:text-cyan-400'}`}>
                {GATE_PROPERTIES[type].label === 'M' ? 'Measure' : GATE_PROPERTIES[type].name.split(' ')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
