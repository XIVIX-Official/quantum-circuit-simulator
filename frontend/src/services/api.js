import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createCircuit = async (data) => {
  const response = await api.post('/circuits', data);
  return response.data;
};

export const getCircuit = async (circuitId) => {
  const response = await api.get(`/circuits/${circuitId}`);
  return response.data;
};

export const listCircuits = async () => {
  const response = await api.get('/circuits');
  return response.data;
};

export const addGate = async (circuitId, gate) => {
  const response = await api.post(`/circuits/${circuitId}/gates`, gate);
  return response.data;
};

export const simulateCircuit = async (circuitId, shots = 1024) => {
  const response = await api.post(`/simulation/circuits/${circuitId}/simulate`, {
    shots
  });
  return response.data;
};

export const getStatevector = async (circuitId) => {
  const response = await api.get(`/simulation/circuits/${circuitId}/statevector`);
  return response.data;
};

export const getUnitary = async (circuitId) => {
  const response = await api.get(`/simulation/circuits/${circuitId}/unitary`);
  return response.data;
};

export const saveCircuit = async (circuitId, filename) => {
  const response = await api.post(`/circuits/${circuitId}/save`, { filename });
  return response.data;
};

export const loadCircuit = async (filename) => {
  const response = await api.post('/circuits/load', { filename });
  return response.data;
};

export const deleteCircuit = async (circuitId) => {
  const response = await api.delete(`/circuits/${circuitId}`);
  return response.data;
};