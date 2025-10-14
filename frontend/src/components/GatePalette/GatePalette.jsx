import React from 'react';
import styled from 'styled-components';
import GateButton from './GateButton';

const PaletteContainer = styled.div`
  width: 200px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
`;

const GateSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
`;

const GateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const gates = {
  single: [
    { type: 'H', name: 'Hadamard', color: '#2196F3' },
    { type: 'X', name: 'Pauli-X', color: '#F44336' },
    { type: 'Y', name: 'Pauli-Y', color: '#4CAF50' },
    { type: 'Z', name: 'Pauli-Z', color: '#9C27B0' },
    { type: 'S', name: 'S Gate', color: '#FF9800' },
    { type: 'T', name: 'T Gate', color: '#795548' }
  ],
  multi: [
    { type: 'CX', name: 'CNOT', color: '#607D8B', control: true },
    { type: 'CZ', name: 'CZ', color: '#009688', control: true },
    { type: 'SWAP', name: 'SWAP', color: '#E91E63' }
  ],
  measurement: [
    { type: 'M', name: 'Measure', color: '#000000' }
  ]
};

const GatePalette = () => {
  return (
    <PaletteContainer>
      <GateSection>
        <SectionTitle>Single-Qubit Gates</SectionTitle>
        <GateGrid>
          {gates.single.map(gate => (
            <GateButton
              key={gate.type}
              gate={gate}
            />
          ))}
        </GateGrid>
      </GateSection>

      <GateSection>
        <SectionTitle>Multi-Qubit Gates</SectionTitle>
        <GateGrid>
          {gates.multi.map(gate => (
            <GateButton
              key={gate.type}
              gate={gate}
            />
          ))}
        </GateGrid>
      </GateSection>

      <GateSection>
        <SectionTitle>Measurement</SectionTitle>
        <GateGrid>
          {gates.measurement.map(gate => (
            <GateButton
              key={gate.type}
              gate={gate}
            />
          ))}
        </GateGrid>
      </GateSection>
    </PaletteContainer>
  );
};

export default GatePalette;