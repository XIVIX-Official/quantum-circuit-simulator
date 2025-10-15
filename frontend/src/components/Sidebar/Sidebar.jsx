import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.aside`
  width: 200px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

const Link = styled.a`
  color: #2196F3;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Section>
        <Title>Examples</Title>
        <List>
          <ListItem>
            <Link href="#" onClick={() => {}}>Bell State</Link>
          </ListItem>
          <ListItem>
            <Link href="#" onClick={() => {}}>Quantum Teleportation</Link>
          </ListItem>
          <ListItem>
            <Link href="#" onClick={() => {}}>Grover's Algorithm</Link>
          </ListItem>
        </List>
      </Section>

      <Section>
        <Title>Resources</Title>
        <List>
          <ListItem>
            <Link href="/docs/USER_GUIDE.md" target="_blank">User Guide</Link>
          </ListItem>
          <ListItem>
            <Link href="/docs/QUANTUM_BASICS.md" target="_blank">Quantum Basics</Link>
          </ListItem>
          <ListItem>
            <Link href="https://qiskit.org/documentation/" target="_blank">Qiskit Docs</Link>
          </ListItem>
        </List>
      </Section>

      <Section>
        <Title>Tools</Title>
        <List>
          <ListItem>
            <Link href="#" onClick={() => {}}>Circuit Library</Link>
          </ListItem>
          <ListItem>
            <Link href="#" onClick={() => {}}>Export Circuit</Link>
          </ListItem>
          <ListItem>
            <Link href="#" onClick={() => {}}>Import Circuit</Link>
          </ListItem>
        </List>
      </Section>
    </SidebarContainer>
  );
};

export default Sidebar;