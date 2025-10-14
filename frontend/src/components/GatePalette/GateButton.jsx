import React from 'react';
import styled from 'styled-components';
import { useDrag } from 'react-dnd';

const Button = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: move;
  font-weight: bold;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1000;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  transform: translateY(-100%);
  margin-top: -8px;
`;

const Container = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
`;

const GateButton = ({ gate }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'GATE',
    item: {
      type: gate.type,
      control: gate.control
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <Container
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Button
        ref={drag}
        color={gate.color}
        isDragging={isDragging}
      >
        {gate.type}
      </Button>
      <Tooltip visible={showTooltip && !isDragging}>
        {gate.name}
      </Tooltip>
    </Container>
  );
};

export default GateButton;