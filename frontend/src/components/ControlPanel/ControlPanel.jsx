import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #666;
`;

const Input = styled.input`
  width: 60px;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.color || '#2196F3'};
  color: white;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ControlPanel = ({
  numQubits,
  setNumQubits,
  numClassicalBits,
  setNumClassicalBits,
  onCreateCircuit,
  onSimulate,
  onClear,
  isSimulating
}) => {
  return (
    <PanelContainer>
      <InputGroup>
        <Label htmlFor="numQubits">Qubits</Label>
        <Input
          id="numQubits"
          type="number"
          min="1"
          max="10"
          value={numQubits}
          onChange={(e) => setNumQubits(parseInt(e.target.value))}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="numClassicalBits">Classical Bits</Label>
        <Input
          id="numClassicalBits"
          type="number"
          min="1"
          max="10"
          value={numClassicalBits}
          onChange={(e) => setNumClassicalBits(parseInt(e.target.value))}
        />
      </InputGroup>

      <Button onClick={onCreateCircuit}>
        Create Circuit
      </Button>

      <Button 
        onClick={onSimulate}
        disabled={isSimulating}
        color="#4CAF50"
      >
        {isSimulating ? 'Simulating...' : 'Simulate'}
      </Button>

      <Button 
        onClick={onClear}
        color="#f44336"
      >
        Clear
      </Button>
    </PanelContainer>
  );
};

export default ControlPanel;