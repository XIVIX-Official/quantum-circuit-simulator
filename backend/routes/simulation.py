from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.circuit_manager import CircuitManager
from src.qiskit_engine import QiskitEngine

router = APIRouter()
circuit_manager = CircuitManager()
qiskit_engine = QiskitEngine()

class SimulationRequest(BaseModel):
    shots: int = 1024

@router.post("/circuits/{circuit_id}/simulate")
async def simulate_circuit(circuit_id: str, request: SimulationRequest):
    """
    Simulate a quantum circuit
    """
    circuit_data = circuit_manager.get_circuit(circuit_id)
    if not circuit_data:
        raise HTTPException(status_code=404, detail="Circuit not found")

    circuit = circuit_data["circuit"]
    if not qiskit_engine.validate_circuit(circuit):
        raise HTTPException(status_code=400, detail="Invalid circuit")

    try:
        result = qiskit_engine.simulate_circuit(circuit, shots=request.shots)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/circuits/{circuit_id}/statevector")
async def get_statevector(circuit_id: str):
    """
    Get the statevector representation of the circuit
    """
    circuit_data = circuit_manager.get_circuit(circuit_id)
    if not circuit_data:
        raise HTTPException(status_code=404, detail="Circuit not found")

    try:
        result = qiskit_engine.get_statevector(circuit_data["circuit"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/circuits/{circuit_id}/unitary")
async def get_unitary(circuit_id: str):
    """
    Get the unitary matrix representation of the circuit
    """
    circuit_data = circuit_manager.get_circuit(circuit_id)
    if not circuit_data:
        raise HTTPException(status_code=404, detail="Circuit not found")

    try:
        result = qiskit_engine.get_unitary(circuit_data["circuit"])
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))