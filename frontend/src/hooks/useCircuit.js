import { useState, useCallback } from 'react';
import * as api from '../services/api';

export const useCircuit = () => {
  const [circuit, setCircuit] = useState(null);
  const [error, setError] = useState(null);

  const createCircuit = useCallback(async (data) => {
    try {
      const result = await api.createCircuit(data);
      setCircuit(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const addGate = useCallback(async (gate) => {
    if (!circuit) return;

    try {
      const result = await api.addGate(circuit.id, gate);
      setCircuit(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [circuit]);

  const removeGate = useCallback(async (gateId) => {
    if (!circuit) return;

    try {
      const updatedGates = circuit.gates.filter(g => g.id !== gateId);
      const result = await api.updateCircuit(circuit.id, {
        ...circuit,
        gates: updatedGates
      });
      setCircuit(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [circuit]);

  const loadCircuit = useCallback(async (circuitId) => {
    try {
      const result = await api.getCircuit(circuitId);
      setCircuit(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const saveCircuit = useCallback(async (filename) => {
    if (!circuit) return;

    try {
      await api.saveCircuit(circuit.id, filename);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [circuit]);

  const clearCircuit = useCallback(() => {
    setCircuit(null);
    setError(null);
  }, []);

  return {
    circuit,
    error,
    createCircuit,
    addGate,
    removeGate,
    loadCircuit,
    saveCircuit,
    clearCircuit
  };
};