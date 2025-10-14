from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List
import json
from pathlib import Path

router = APIRouter()

class SimulationResult(BaseModel):
    circuit_id: str
    counts: Dict[str, int]
    shots: int
    timestamp: str

# Store results in memory (in production, use a proper database)
results_store: Dict[str, List[SimulationResult]] = {}

@router.post("/")
async def save_result(result: SimulationResult):
    """
    Save a simulation result
    """
    if result.circuit_id not in results_store:
        results_store[result.circuit_id] = []
    results_store[result.circuit_id].append(result)
    return {"message": "Result saved successfully"}

@router.get("/circuits/{circuit_id}")
async def get_circuit_results(circuit_id: str):
    """
    Get all results for a specific circuit
    """
    if circuit_id not in results_store:
        return []
    return results_store[circuit_id]

@router.post("/export/{circuit_id}")
async def export_results(circuit_id: str, filename: str):
    """
    Export results to a file
    """
    if circuit_id not in results_store:
        raise HTTPException(status_code=404, detail="No results found for circuit")
    
    try:
        results = [result.dict() for result in results_store[circuit_id]]
        with open(filename, 'w') as f:
            json.dump(results, f)
        return {"message": "Results exported successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/circuits/{circuit_id}")
async def delete_circuit_results(circuit_id: str):
    """
    Delete all results for a circuit
    """
    if circuit_id in results_store:
        del results_store[circuit_id]
        return {"message": "Results deleted successfully"}
    raise HTTPException(status_code=404, detail="No results found for circuit")