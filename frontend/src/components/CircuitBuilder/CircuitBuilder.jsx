import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import CircuitCanvas from './CircuitCanvas';
import GatePalette from '../GatePalette/GatePalette';
import ControlPanel from '../ControlPanel/ControlPanel';
import ResultsDisplay from '../ResultsDisplay/ResultsDisplay';
import { useCircuit } from '../../hooks/useCircuit';
import { useSimulation } from '../../hooks/useSimulation';

const BuilderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const TopSection = styled.div`
  display: flex;
  gap: 20px;
`;

const MainSection = styled.div`
  display: flex;
  flex: 1;
  gap: 20px;
`;

const CircuitBuilder = () => {
  const {
    circuit,
    createCircuit,
    addGate,
    removeGate,
    clearCircuit
  } = useCircuit();

  const {
    results,
    isSimulating,
    simulateCircuit,
    error
  } = useSimulation();

  const [numQubits, setNumQubits] = useState(3);
  const [numClassicalBits, setNumClassicalBits] = useState(3);

  const handleCreateCircuit = useCallback(() => {
    createCircuit({
      name: 'New Circuit',
      num_qubits: numQubits,
      num_classical_bits: numClassicalBits
    });
  }, [numQubits, numClassicalBits, createCircuit]);

  const handleSimulate = useCallback(() => {
    if (circuit) {
      simulateCircuit(circuit.id);
    }
  }, [circuit, simulateCircuit]);

  return (
    <DndProvider backend={HTML5Backend}>
      <BuilderContainer>
        <TopSection>
          <ControlPanel
            numQubits={numQubits}
            setNumQubits={setNumQubits}
            numClassicalBits={numClassicalBits}
            setNumClassicalBits={setNumClassicalBits}
            onCreateCircuit={handleCreateCircuit}
            onSimulate={handleSimulate}
            onClear={clearCircuit}
            isSimulating={isSimulating}
          />
        </TopSection>
        <MainSection>
          <GatePalette />
          <CircuitCanvas
            circuit={circuit}
            onAddGate={addGate}
            onRemoveGate={removeGate}
          />
        </MainSection>
        {results && (
          <ResultsDisplay results={results} />
        )}
        {error && (
          <div style={{ color: 'red' }}>{error}</div>
        )}
      </BuilderContainer>
    </DndProvider>
  );
};

export default CircuitBuilder;