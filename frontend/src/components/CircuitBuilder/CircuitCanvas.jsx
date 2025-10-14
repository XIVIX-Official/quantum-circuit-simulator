import React from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';

const CanvasContainer = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  min-height: 400px;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 80px repeat(auto-fill, 60px);
  gap: 10px;
`;

const QubitLine = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #ddd;
  
  &:last-child {
    border-bottom: none;
  }
`;

const QubitLabel = styled.div`
  width: 80px;
  text-align: right;
  padding-right: 20px;
  font-weight: bold;
`;

const GateCell = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #eee;
  }
`;

const Gate = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color || '#4CAF50'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: bold;
  cursor: move;
`;

const CircuitCanvas = ({ circuit, onAddGate, onRemoveGate }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'GATE',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const element = document.elementFromPoint(offset.x, offset.y);
      const qubit = parseInt(element.dataset.qubit);
      const position = parseInt(element.dataset.position);
      
      onAddGate({
        type: item.type,
        qubit,
        position,
        control: item.control
      });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  if (!circuit) {
    return (
      <CanvasContainer>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Create a new circuit to begin
        </div>
      </CanvasContainer>
    );
  }

  const numColumns = Math.max(
    ...circuit.gates.map(gate => gate.position + 1),
    10
  );

  return (
    <CanvasContainer ref={drop}>
      <Grid>
        {Array.from({ length: circuit.num_qubits }).map((_, qubit) => (
          <QubitLine key={qubit}>
            <QubitLabel>Q{qubit}</QubitLabel>
            {Array.from({ length: numColumns }).map((_, position) => {
              const gate = circuit.gates.find(
                g => g.qubit === qubit && g.position === position
              );

              return (
                <GateCell
                  key={position}
                  data-qubit={qubit}
                  data-position={position}
                  onClick={() => gate && onRemoveGate(gate.id)}
                >
                  {gate && (
                    <Gate color={gate.color}>{gate.type}</Gate>
                  )}
                </GateCell>
              );
            })}
          </QubitLine>
        ))}
      </Grid>
    </CanvasContainer>
  );
};

export default CircuitCanvas;