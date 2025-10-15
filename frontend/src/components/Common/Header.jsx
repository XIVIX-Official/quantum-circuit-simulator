import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #2196F3;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>XIVIX Quantum Circuit Simulator</Title>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="https://github.com/CodexusTechnologies/quantum-circuit-simulator" target="_blank">GitHub</NavLink>
        <NavLink href="/docs/USER_GUIDE.md" target="_blank">Documentation</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;