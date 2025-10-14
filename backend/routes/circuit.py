from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from src.circuit_manager import CircuitManager
from src.qiskit_engine import QiskitEngine

router = APIRouter()
circuit_manager = CircuitManager()
qiskit_engine = QiskitEngine()

class CircuitCreate(BaseModel):
    name: str
    num_qubits: int
    num_classical_bits: int

class GateAdd(BaseModel):
    gate_type: str
    target_qubit: int
    control_qubit: Optional[int] = None
    params: Optional[List[float]] = None

@router.post("/", status_code=201)
async def create_circuit(circuit: CircuitCreate):
    """
    Create a new quantum circuit
    """
    result = circuit_manager.create_circuit(
        circuit.name,
        circuit.num_qubits,
        circuit.num_classical_bits
    )
    if result:
        return result
    raise HTTPException(status_code=400, detail="Could not create circuit")

@router.get("/{circuit_id}")
async def get_circuit(circuit_id: str):
    """
    Get circuit by ID
    """
    result = circuit_manager.get_circuit(circuit_id)
    if result:
        return result
    raise HTTPException(status_code=404, detail="Circuit not found")

@router.get("/")
async def list_circuits():
    """
    List all circuits
    """
    return circuit_manager.list_circuits()

@router.post("/{circuit_id}/gates")
async def add_gate(circuit_id: str, gate: GateAdd):
    """
    Add a gate to the circuit
    """
    result = circuit_manager.add_gate(circuit_id, gate.dict())
    if result:
        return result
    raise HTTPException(status_code=404, detail="Circuit not found")

@router.delete("/{circuit_id}")
async def delete_circuit(circuit_id: str):
    """
    Delete a circuit
    """
    if circuit_manager.delete_circuit(circuit_id):
        return {"message": "Circuit deleted"}
    raise HTTPException(status_code=404, detail="Circuit not found")

@router.post("/{circuit_id}/save")
async def save_circuit(circuit_id: str, filename: str):
    """
    Save circuit to file
    """
    if circuit_manager.save_circuit(circuit_id, filename):
        return {"message": "Circuit saved successfully"}
    raise HTTPException(status_code=400, detail="Could not save circuit")