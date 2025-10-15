import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f5f5f5;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
  border-top: 1px solid #ddd;
`;

const Text = styled.p`
  margin: 0;
  color: #666;
`;

const Link = styled.a`
  color: #2196F3;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <Text>
        © {year} XIVIX Quantum Circuit Simulator. Powered by{' '}
        <Link href="https://qiskit.org" target="_blank" rel="noopener noreferrer">
          Qiskit
        </Link>
        . View on{' '}
        <Link
          href="https://github.com/CodexusTechnologies/quantum-circuit-simulator"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </Link>
      </Text>
    </FooterContainer>
  );
};

export default Footer;