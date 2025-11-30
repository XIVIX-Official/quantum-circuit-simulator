import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { MainApp } from './MainApp';

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <MainApp />
        </ThemeProvider>
    );
};

export default App;