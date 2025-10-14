from typing import Dict, List, Optional
from qiskit import QuantumCircuit
from uuid import uuid4
import json

class CircuitManager:
    """
    Manages quantum circuits, their storage, and retrieval
    """
    def __init__(self):
        self.circuits: Dict[str, Dict] = {}

    def create_circuit(self, name: str, num_qubits: int, num_classical_bits: int) -> Dict:
        """
        Create a new circuit and store it
        """
        circuit_id = str(uuid4())
        self.circuits[circuit_id] = {
            "id": circuit_id,
            "name": name,
            "num_qubits": num_qubits,
            "num_classical_bits": num_classical_bits,
            "circuit": QuantumCircuit(num_qubits, num_classical_bits),
            "gates": []
        }
        return self._get_circuit_data(circuit_id)

    def get_circuit(self, circuit_id: str) -> Optional[Dict]:
        """
        Retrieve circuit data by ID
        """
        if circuit_id in self.circuits:
            return self._get_circuit_data(circuit_id)
        return None

    def list_circuits(self) -> List[Dict]:
        """
        List all available circuits
        """
        return [self._get_circuit_data(cid) for cid in self.circuits]

    def add_gate(self, circuit_id: str, gate_data: Dict) -> Optional[Dict]:
        """
        Add a gate to an existing circuit
        """
        if circuit_id not in self.circuits:
            return None

        circuit_data = self.circuits[circuit_id]
        circuit_data["gates"].append(gate_data)
        
        # Add the gate to the quantum circuit
        qc = circuit_data["circuit"]
        gate_type = gate_data["gate_type"]
        target = gate_data["target_qubit"]
        control = gate_data.get("control_qubit")
        params = gate_data.get("params")

        if gate_type == "h":
            qc.h(target)
        elif gate_type == "x":
            qc.x(target)
        elif gate_type == "cx" and control is not None:
            qc.cx(control, target)
        # Add more gate types as needed

        return self._get_circuit_data(circuit_id)

    def delete_circuit(self, circuit_id: str) -> bool:
        """
        Delete a circuit by ID
        """
        if circuit_id in self.circuits:
            del self.circuits[circuit_id]
            return True
        return False

    def _get_circuit_data(self, circuit_id: str) -> Dict:
        """
        Get serializable circuit data
        """
        circuit_data = self.circuits[circuit_id]
        return {
            "id": circuit_data["id"],
            "name": circuit_data["name"],
            "num_qubits": circuit_data["num_qubits"],
            "num_classical_bits": circuit_data["num_classical_bits"],
            "gates": circuit_data["gates"]
        }

    def save_circuit(self, circuit_id: str, filename: str) -> bool:
        """
        Save circuit to a file
        """
        try:
            circuit_data = self._get_circuit_data(circuit_id)
            with open(filename, 'w') as f:
                json.dump(circuit_data, f)
            return True
        except Exception:
            return False

    def load_circuit(self, filename: str) -> Optional[Dict]:
        """
        Load circuit from a file
        """
        try:
            with open(filename, 'r') as f:
                circuit_data = json.load(f)
            
            circuit_id = str(uuid4())
            qc = QuantumCircuit(circuit_data["num_qubits"], circuit_data["num_classical_bits"])
            
            self.circuits[circuit_id] = {
                "id": circuit_id,
                "name": circuit_data["name"],
                "num_qubits": circuit_data["num_qubits"],
                "num_classical_bits": circuit_data["num_classical_bits"],
                "circuit": qc,
                "gates": circuit_data["gates"]
            }
            
            # Reconstruct the circuit by adding all gates
            for gate in circuit_data["gates"]:
                self.add_gate(circuit_id, gate)
            
            return self._get_circuit_data(circuit_id)
        except Exception:
            return None