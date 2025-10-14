import { useState, useCallback } from 'react';
import * as api from '../services/api';

export const useSimulation = () => {
  const [results, setResults] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState(null);

  const simulateCircuit = useCallback(async (circuitId, shots = 1024) => {
    setIsSimulating(true);
    setError(null);

    try {
      const result = await api.simulateCircuit(circuitId, shots);
      setResults(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSimulating(false);
    }
  }, []);

  const getStatevector = useCallback(async (circuitId) => {
    try {
      const result = await api.getStatevector(circuitId);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const getUnitary = useCallback(async (circuitId) => {
    try {
      const result = await api.getUnitary(circuitId);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults(null);
    setError(null);
  }, []);

  return {
    results,
    isSimulating,
    error,
    simulateCircuit,
    getStatevector,
    getUnitary,
    clearResults
  };
};