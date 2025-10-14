import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import CircuitBuilder from './components/CircuitBuilder/CircuitBuilder';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  padding: 20px;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Header />
        <MainContent>
          <Sidebar />
          <Routes>
            <Route path="/" element={<CircuitBuilder />} />
            {/* Add more routes as needed */}
          </Routes>
        </MainContent>
        <Footer />
      </AppContainer>
    </Router>
  );
};

export default App;