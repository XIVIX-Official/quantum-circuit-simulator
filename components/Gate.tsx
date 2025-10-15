import React from 'react';
import type { GateType } from '../types';
import { GATE_PROPERTIES } from '../constants';
import { MeasureIcon } from './icons/MeasureIcon';

interface GateProps {
  type: GateType;
}

export const Gate: React.FC<GateProps> = ({ type }) => {
  const { label, color } = GATE_PROPERTIES[type];

  const isIcon = type === 'M';

  return (
    <div
      className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-white text-lg shadow-md ${color} transition-transform transform group-hover:scale-110`}
    >
      {isIcon ? <MeasureIcon className="w-6 h-6" /> : label}
    </div>
  );
};